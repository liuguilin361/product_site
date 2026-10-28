<script setup>
import { computed, ref } from 'vue'
import { RouteLink } from 'vuepress/client'
import {
  products,
  statusMeta,
  statusOrder,
  categoryMeta,
  categoryOrder,
} from '../../data/products.js'
import ProductCard from './ProductCard.vue'
import StatusBadge from './StatusBadge.vue'

const keyword = ref('')
const category = ref('all')
const status = ref('all')
const view = ref('grid')

const usedCategories = computed(() => {
  const set = new Set(products.map((p) => p.category))
  return categoryOrder.filter((key) => set.has(key))
})

const filtered = computed(() => {
  const kw = keyword.value.trim().toLowerCase()
  return products
    .filter((p) => (category.value === 'all' ? true : p.category === category.value))
    .filter((p) => (status.value === 'all' ? true : p.status === status.value))
    .filter((p) => {
      if (!kw) return true
      const haystack = [p.model, p.name, p.summary, ...(p.tags || []), p.owner]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      return haystack.includes(kw)
    })
    .sort((a, b) => (b.updated || '').localeCompare(a.updated || ''))
})

const statusCount = (key) =>
  key === 'all' ? products.length : products.filter((p) => p.status === key).length

const reset = () => {
  keyword.value = ''
  category.value = 'all'
  status.value = 'all'
}
</script>

<template>
  <div class="pm-catalog">
    <div class="pm-toolbar">
      <input
        v-model="keyword"
        class="pm-search"
        type="search"
        placeholder="搜索型号、名称、标签或负责人…"
        aria-label="搜索产品"
      />
      <div class="pm-view-toggle" role="group" aria-label="视图切换">
        <button :class="{ active: view === 'grid' }" title="卡片视图" @click="view = 'grid'">
          ▦ 卡片
        </button>
        <button :class="{ active: view === 'table' }" title="表格视图" @click="view = 'table'">
          ☰ 表格
        </button>
      </div>
    </div>

    <div class="pm-filter">
      <span class="pm-filter__label">分类</span>
      <button
        class="pm-chip"
        :class="{ active: category === 'all' }"
        @click="category = 'all'"
      >
        全部
      </button>
      <button
        v-for="key in usedCategories"
        :key="key"
        class="pm-chip"
        :class="{ active: category === key }"
        @click="category = key"
      >
        {{ categoryMeta[key].icon }} {{ categoryMeta[key].label }}
      </button>
    </div>

    <div class="pm-filter">
      <span class="pm-filter__label">状态</span>
      <button class="pm-chip" :class="{ active: status === 'all' }" @click="status = 'all'">
        全部
      </button>
      <button
        v-for="key in statusOrder"
        :key="key"
        class="pm-chip"
        :class="{ active: status === key }"
        :style="{ '--pm-chip-color': statusMeta[key].color }"
        @click="status = key"
      >
        {{ statusMeta[key].label }}
        <em>{{ statusCount(key) }}</em>
      </button>
    </div>

    <div class="pm-result-bar">
      共 <strong>{{ filtered.length }}</strong> 个产品
      <button v-if="keyword || category !== 'all' || status !== 'all'" class="pm-reset" @click="reset">
        清除筛选
      </button>
    </div>

    <div v-if="filtered.length === 0" class="pm-empty">
      <p>没有匹配的产品</p>
      <button class="pm-reset" @click="reset">清除筛选条件</button>
    </div>

    <div v-else-if="view === 'grid'" class="pm-grid">
      <ProductCard v-for="p in filtered" :key="p.id" :product="p" />
    </div>

    <div v-else class="pm-table-wrap">
      <table class="pm-table">
        <thead>
          <tr>
            <th>型号</th>
            <th>产品名称</th>
            <th>分类</th>
            <th>状态</th>
            <th>负责人</th>
            <th>更新时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in filtered" :key="p.id">
            <td class="pm-table__model">
              <RouteLink :to="`/products/${p.id}.html`">{{ p.model }}</RouteLink>
            </td>
            <td>
              <RouteLink :to="`/products/${p.id}.html`">{{ p.name }}</RouteLink>
            </td>
            <td>{{ (categoryMeta[p.category] || {}).label || p.category }}</td>
            <td><StatusBadge :status="p.status" size="sm" /></td>
            <td>{{ p.owner || '—' }}</td>
            <td class="pm-table__date">{{ p.updated || '—' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.pm-catalog {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 8px;
}

.pm-toolbar {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}

.pm-search {
  flex: 1 1 260px;
  min-width: 200px;
  padding: 9px 14px;
  font-size: 14px;
  color: var(--vp-c-text);
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.pm-search:focus {
  border-color: var(--pm-brand);
  background: var(--vp-c-bg);
}

.pm-view-toggle {
  display: inline-flex;
  padding: 3px;
  border-radius: 8px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
}

.pm-view-toggle button {
  padding: 4px 10px;
  font-size: 12px;
  color: var(--vp-c-text-subtle);
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.pm-view-toggle button.active {
  color: var(--vp-c-text);
  background: var(--vp-c-bg);
  box-shadow: 0 1px 3px var(--vp-c-shadow);
}

.pm-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
}

.pm-filter__label {
  font-size: 12px;
  color: var(--vp-c-text-subtle);
  margin-inline-end: 2px;
}

.pm-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  font-size: 12px;
  line-height: 1.6;
  color: var(--vp-c-text-mute);
  background: transparent;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.pm-chip:hover {
  border-color: var(--pm-brand);
  color: var(--pm-brand);
}

.pm-chip.active {
  color: var(--pm-chip-color, var(--pm-brand));
  border-color: var(--pm-chip-color, var(--pm-brand));
  background: color-mix(in srgb, var(--pm-chip-color, var(--pm-brand)) 10%, transparent);
  font-weight: 600;
}

.pm-chip em {
  font-style: normal;
  opacity: 0.65;
  font-size: 11px;
}

.pm-result-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--vp-c-text-subtle);
}

.pm-reset {
  font-size: 12px;
  padding: 2px 8px;
  color: var(--pm-brand);
  background: transparent;
  border: 1px solid color-mix(in srgb, var(--pm-brand) 40%, transparent);
  border-radius: 6px;
  cursor: pointer;
}

.pm-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 14px;
}

.pm-empty {
  padding: 40px 0;
  text-align: center;
  color: var(--vp-c-text-subtle);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 12px;
}

.pm-table-wrap {
  overflow-x: auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
}

.pm-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  display: table;
  margin: 0;
}

.pm-table th,
.pm-table td {
  padding: 10px 14px;
  text-align: start;
  border: none;
  border-bottom: 1px solid var(--vp-c-divider);
  white-space: nowrap;
}

.pm-table th {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-subtle);
  background: var(--vp-c-bg-alt);
}

.pm-table tbody tr:last-child td {
  border-bottom: none;
}

.pm-table tbody tr:hover {
  background: var(--vp-c-bg-alt);
}

.pm-table a {
  color: inherit;
  text-decoration: none;
  font-weight: 500;
}

.pm-table a:hover {
  color: var(--pm-brand);
}

.pm-table__model {
  font-family: var(--vp-font-family-mono, ui-monospace, monospace);
  font-weight: 600 !important;
}

.pm-table__model a {
  color: var(--pm-brand) !important;
}

.pm-table__date {
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-subtle);
}
</style>
