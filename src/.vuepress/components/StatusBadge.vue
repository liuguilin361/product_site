<script setup>
import { computed } from 'vue'
import { statusMeta } from '../../data/products.js'

const props = defineProps({
  status: { type: String, required: true },
  size: { type: String, default: 'md' },
})

const meta = computed(
  () => statusMeta[props.status] || { label: props.status, color: '#94a3b8', desc: '' },
)
</script>

<template>
  <span class="pm-badge" :class="`pm-badge--${size}`" :style="{ '--pm-badge-color': meta.color }">
    <i class="pm-badge__dot" />
    {{ meta.label }}
  </span>
</template>

<style scoped>
.pm-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.6;
  color: var(--pm-badge-color);
  background: color-mix(in srgb, var(--pm-badge-color) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--pm-badge-color) 28%, transparent);
  white-space: nowrap;
}

.pm-badge__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--pm-badge-color);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--pm-badge-color) 16%, transparent);
}

.pm-badge--sm {
  padding: 1px 8px;
  font-size: 11px;
}

.pm-badge--lg {
  padding: 5px 14px;
  font-size: 13px;
}
</style>
