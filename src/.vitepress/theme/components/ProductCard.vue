<script setup>
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { categoryMeta } from '../../../data/products.js'
import StatusBadge from './StatusBadge.vue'

const props = defineProps({
  product: { type: Object, required: true },
  compact: { type: Boolean, default: false },
})

const category = computed(
  () => categoryMeta[props.product.category] || { label: props.product.category, icon: '📦' },
)
const detailLink = computed(() => `/products/${props.product.id}.html`)
</script>

<template>
  <a :href="withBase(detailLink)" class="pm-card" :class="{ 'pm-card--compact': compact }">
    <div class="pm-card__top">
      <span class="pm-card__icon">{{ category.icon }}</span>
      <span class="pm-card__model">{{ product.model }}</span>
      <StatusBadge :status="product.status" size="sm" />
    </div>

    <h3 class="pm-card__name">{{ product.name }}</h3>
    <p v-if="product.summary && !compact" class="pm-card__summary">{{ product.summary }}</p>

    <ul v-if="product.tags?.length && !compact" class="pm-card__tags">
      <li v-for="tag in product.tags.slice(0, 4)" :key="tag">{{ tag }}</li>
    </ul>

    <div class="pm-card__meta">
      <span class="pm-card__cat">{{ category.label }}</span>
      <span v-if="product.owner && !compact" class="pm-card__owner">· {{ product.owner }}</span>
      <span v-if="product.updated" class="pm-card__date">{{ product.updated }}</span>
    </div>
  </a>
</template>

<style scoped>
.pm-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 18px 18px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg);
  color: inherit !important;
  text-decoration: none !important;
  transition: border-color 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
  will-change: transform;
}

.pm-card:hover {
  border-color: var(--pm-brand);
  transform: translateY(-2px);
  box-shadow: 0 10px 24px -12px color-mix(in srgb, var(--pm-brand) 45%, transparent);
}

.pm-card--compact {
  padding: 12px 14px;
  gap: 6px;
}

.pm-card__top {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pm-card__icon {
  font-size: 16px;
  line-height: 1;
}

.pm-card__model {
  font-family: var(--vp-font-family-mono, ui-monospace, monospace);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--pm-brand);
  margin-inline-end: auto;
}

.pm-card__name {
  margin: 0 !important;
  padding: 0 !important;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.45;
  color: var(--vp-c-text);
  border: none !important;
}

.pm-card__summary {
  margin: 0;
  font-size: 13px;
  line-height: 1.65;
  color: var(--vp-c-text-mute);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.pm-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.pm-card__tags li {
  font-size: 11px;
  line-height: 1.6;
  padding: 1px 8px;
  border-radius: 6px;
  color: var(--vp-c-text-subtle);
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
}

.pm-card__meta {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: auto;
  font-size: 12px;
  color: var(--vp-c-text-subtle);
  white-space: nowrap;
  overflow: hidden;
}

.pm-card__cat,
.pm-card__owner {
  overflow: hidden;
  text-overflow: ellipsis;
}

.pm-card__date {
  margin-inline-start: auto;
  padding-inline-start: 6px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  flex: none;
}

.pm-card--compact .pm-card__meta {
  gap: 4px;
  font-size: 11px;
}

.pm-card--compact .pm-card__name {
  font-size: 14px;
}
</style>
