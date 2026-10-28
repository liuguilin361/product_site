<script setup>
import { computed } from 'vue'
import { products, statusMeta, statusOrder } from '../../../data/products.js'
import ProductCard from './ProductCard.vue'

const columns = computed(() =>
  statusOrder.map((key) => ({
    key,
    meta: statusMeta[key],
    items: products
      .filter((p) => p.status === key)
      .sort((a, b) => (b.updated || '').localeCompare(a.updated || '')),
  })),
)
</script>

<template>
  <div class="pm-board">
    <section
      v-for="col in columns"
      :key="col.key"
      class="pm-board__col"
      :style="{ '--pm-col-color': col.meta.color }"
    >
      <header class="pm-board__head">
        <span class="pm-board__title">
          <i class="pm-board__dot" />{{ col.meta.label }}
        </span>
        <span class="pm-board__count">{{ col.items.length }}</span>
      </header>
      <p class="pm-board__desc">{{ col.meta.desc }}</p>

      <div class="pm-board__body">
        <ProductCard v-for="p in col.items" :key="p.id" :product="p" compact />
        <div v-if="col.items.length === 0" class="pm-board__blank">暂无产品</div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.pm-board {
  display: grid;
  grid-template-columns: repeat(5, minmax(200px, 1fr));
  gap: 12px;
  margin-top: 12px;
  overflow-x: auto;
  padding-bottom: 6px;
  scroll-snap-type: x proximity;
}

.pm-board__col {
  display: flex;
  flex-direction: column;
  min-width: 200px;
  padding: 12px;
  border-radius: 12px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-top: 3px solid var(--pm-col-color);
  scroll-snap-align: start;
}

.pm-board__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.pm-board__title {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  color: var(--vp-c-text);
}

.pm-board__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--pm-col-color);
}

.pm-board__count {
  min-width: 22px;
  padding: 0 6px;
  font-size: 11px;
  line-height: 1.8;
  text-align: center;
  border-radius: 999px;
  color: var(--pm-col-color);
  background: color-mix(in srgb, var(--pm-col-color) 14%, transparent);
  font-variant-numeric: tabular-nums;
}

.pm-board__desc {
  margin: 4px 0 10px;
  font-size: 11px;
  color: var(--vp-c-text-subtle);
}

.pm-board__body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pm-board__blank {
  padding: 18px 0;
  text-align: center;
  font-size: 12px;
  color: var(--vp-c-text-subtle);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 8px;
}

@media (max-width: 719px) {
  .pm-board {
    grid-template-columns: repeat(5, minmax(76%, 76%));
  }
}
</style>
