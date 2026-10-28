<script setup>
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { getProduct, statusMeta, categoryMeta } from '../../../data/products.js'
import StatusBadge from './StatusBadge.vue'

const props = defineProps({
  id: { type: String, required: true },
})

const product = computed(() => getProduct(props.id))
const category = computed(() =>
  product.value
    ? categoryMeta[product.value.category] || { label: product.value.category, icon: '📦' }
    : null,
)
const specEntries = computed(() => Object.entries(product.value?.specs || {}))
</script>

<template>
  <div v-if="!product" class="pm-missing">
    ⚠️ 未找到产品 ID：<code>{{ id }}</code>。请检查
    <code>src/data/products.js</code>。
  </div>

  <article v-else class="pm-detail">
    <header class="pm-detail__hero">
      <div class="pm-detail__eyebrow">
        <span class="pm-detail__icon">{{ category.icon }}</span>
        <span>{{ category.label }}</span>
        <span class="pm-detail__sep">/</span>
        <span class="pm-detail__id">{{ product.id }}</span>
      </div>
      <div class="pm-detail__title-row">
        <h1 class="pm-detail__title">{{ product.name }}</h1>
        <StatusBadge :status="product.status" size="lg" />
      </div>
      <p class="pm-detail__model">{{ product.model }}</p>
      <p v-if="product.summary" class="pm-detail__summary">{{ product.summary }}</p>

      <div class="pm-detail__facts">
        <div class="pm-detail__fact">
          <span class="pm-detail__fact-label">负责人</span>
          <span>{{ product.owner || '待补充' }}</span>
        </div>
        <div class="pm-detail__fact">
          <span class="pm-detail__fact-label">最近更新</span>
          <span>{{ product.updated || '—' }}</span>
        </div>
        <div class="pm-detail__fact">
          <span class="pm-detail__fact-label">阶段说明</span>
          <span>{{ (statusMeta[product.status] || {}).desc || '—' }}</span>
        </div>
      </div>

      <ul v-if="product.tags?.length" class="pm-detail__tags">
        <li v-for="tag in product.tags" :key="tag">{{ tag }}</li>
      </ul>
    </header>

    <section v-if="product.highlights?.length" class="pm-detail__section">
      <h2>产品亮点</h2>
      <ul class="pm-detail__highlights">
        <li v-for="(item, i) in product.highlights" :key="i">{{ item }}</li>
      </ul>
    </section>

    <section v-if="specEntries.length" class="pm-detail__section">
      <h2>关键规格</h2>
      <table class="pm-spec">
        <tbody>
          <tr v-for="[key, value] in specEntries" :key="key">
            <th>{{ key }}</th>
            <td>{{ value }}</td>
          </tr>
        </tbody>
      </table>
      <p class="pm-detail__note">完整规格以最新 Datasheet 为准。</p>
    </section>

    <section v-if="product.milestones?.length" class="pm-detail__section">
      <h2>里程碑</h2>
      <ol class="pm-timeline">
        <li
          v-for="(m, i) in product.milestones"
          :key="i"
          class="pm-timeline__item"
          :class="{ 'is-done': m.done }"
        >
          <span class="pm-timeline__dot" />
          <span class="pm-timeline__date">{{ m.date }}</span>
          <span class="pm-timeline__title">{{ m.title }}</span>
        </li>
      </ol>
    </section>

    <section v-if="product.docs?.length" class="pm-detail__section">
      <h2>相关文档</h2>
      <ul class="pm-docs">
        <li v-for="(doc, i) in product.docs" :key="i" class="pm-docs__item">
          <span class="pm-docs__type">{{ doc.type }}</span>
          <span class="pm-docs__name">{{ doc.name }}</span>
          <a v-if="doc.href" class="pm-docs__link" :href="doc.href" target="_blank" rel="noreferrer">
            打开 ↗
          </a>
          <span v-else class="pm-docs__note">{{ doc.note || '链接待补充' }}</span>
        </li>
      </ul>
    </section>

    <footer class="pm-detail__footer">
      <a :href="withBase('/products/')" class="pm-detail__back">← 返回产品目录</a>
      <a :href="withBase('/board.html')" class="pm-detail__back">查看状态看板 →</a>
    </footer>
  </article>
</template>

<style scoped>
.pm-detail {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.pm-detail__hero {
  padding: 22px 24px;
  border-radius: 14px;
  border: 1px solid var(--vp-c-divider);
  background:
    radial-gradient(120% 140% at 0% 0%, color-mix(in srgb, var(--pm-brand) 10%, transparent), transparent 60%),
    var(--vp-c-bg-alt);
}

.pm-detail__eyebrow {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--vp-c-text-subtle);
}

.pm-detail__icon {
  font-size: 16px;
}

.pm-detail__sep {
  opacity: 0.5;
}

.pm-detail__id {
  font-family: var(--vp-font-family-mono, ui-monospace, monospace);
}

.pm-detail__title-row {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  margin-top: 6px;
}

.pm-detail__title {
  margin: 0 !important;
  padding: 0 !important;
  font-size: 26px;
  line-height: 1.3;
  border: none !important;
}

.pm-detail__model {
  margin: 6px 0 0;
  font-family: var(--vp-font-family-mono, ui-monospace, monospace);
  font-size: 13px;
  font-weight: 600;
  color: var(--pm-brand);
  letter-spacing: 0.03em;
}

.pm-detail__summary {
  margin: 12px 0 0;
  font-size: 14px;
  line-height: 1.75;
  color: var(--vp-c-text-mute);
  max-width: 68ch;
}

.pm-detail__facts {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 28px;
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px dashed var(--vp-c-divider);
}

.pm-detail__fact {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 13px;
  color: var(--vp-c-text);
}

.pm-detail__fact-label {
  font-size: 11px;
  color: var(--vp-c-text-subtle);
}

.pm-detail__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 14px 0 0;
  padding: 0;
  list-style: none;
}

.pm-detail__tags li {
  font-size: 11px;
  padding: 2px 9px;
  border-radius: 6px;
  color: var(--pm-brand);
  background: color-mix(in srgb, var(--pm-brand) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--pm-brand) 25%, transparent);
}

.pm-detail__section h2 {
  font-size: 17px;
  margin: 0 0 12px !important;
  padding: 0 !important;
  border: none !important;
}

.pm-detail__highlights {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 8px;
}

.pm-detail__highlights li {
  position: relative;
  padding: 10px 12px 10px 30px;
  font-size: 13px;
  line-height: 1.6;
  border-radius: 8px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
}

.pm-detail__highlights li::before {
  content: '✓';
  position: absolute;
  left: 11px;
  top: 10px;
  font-size: 12px;
  font-weight: 700;
  color: var(--pm-brand);
}

.pm-spec {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  display: table;
  margin: 0;
}

.pm-spec th,
.pm-spec td {
  padding: 9px 14px;
  border: none;
  border-bottom: 1px solid var(--vp-c-divider);
  text-align: start;
  vertical-align: top;
}

.pm-spec th {
  width: 26%;
  min-width: 120px;
  font-weight: 600;
  color: var(--vp-c-text-mute);
  background: var(--vp-c-bg-alt);
}

.pm-spec tr:last-child th,
.pm-spec tr:last-child td {
  border-bottom: none;
}

.pm-detail__note {
  margin: 8px 0 0;
  font-size: 11px;
  color: var(--vp-c-text-subtle);
}

.pm-timeline {
  margin: 0;
  padding: 0 0 0 4px;
  list-style: none;
}

.pm-timeline__item {
  position: relative;
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding: 0 0 16px 22px;
  font-size: 13px;
}

.pm-timeline__item::before {
  content: '';
  position: absolute;
  left: 4px;
  top: 12px;
  bottom: -4px;
  width: 1px;
  background: var(--vp-c-divider);
}

.pm-timeline__item:last-child::before {
  display: none;
}

.pm-timeline__dot {
  position: absolute;
  left: 0;
  top: 5px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  border: 2px solid var(--vp-c-border);
  background: var(--vp-c-bg);
}

.pm-timeline__item.is-done .pm-timeline__dot {
  border-color: var(--pm-brand);
  background: var(--pm-brand);
}

.pm-timeline__date {
  min-width: 74px;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-subtle);
  font-size: 12px;
}

.pm-timeline__title {
  color: var(--vp-c-text);
}

.pm-timeline__item.is-done .pm-timeline__title {
  font-weight: 500;
}

.pm-docs {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.pm-docs__item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  font-size: 13px;
  border-radius: 8px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
}

.pm-docs__type {
  flex: none;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.04em;
  padding: 2px 6px;
  border-radius: 4px;
  color: var(--vp-c-text-subtle);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}

.pm-docs__name {
  flex: 1 1 auto;
}

.pm-docs__note,
.pm-docs__link {
  flex: none;
  font-size: 11px;
  color: var(--vp-c-text-subtle);
}

.pm-docs__link {
  color: var(--pm-brand);
}

.pm-detail__footer {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 13px;
}

.pm-detail__back {
  color: var(--pm-brand) !important;
  text-decoration: none !important;
}

.pm-missing {
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #f59e0b;
  background: color-mix(in srgb, #f59e0b 10%, transparent);
}
</style>
