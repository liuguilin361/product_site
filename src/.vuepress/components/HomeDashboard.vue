<script setup>
import { computed } from 'vue'
import { RouteLink } from 'vuepress/client'
import {
  products,
  statusMeta,
  statusOrder,
  statusCounts,
  recentProducts,
  categoryMeta,
} from '../../data/products.js'
import StatusBadge from './StatusBadge.vue'

const counts = computed(() => statusCounts())
const recent = computed(() => recentProducts(5))

const kpis = computed(() => [
  { key: 'total', label: '产品总数', value: products.length, color: 'var(--pm-brand)' },
  ...statusOrder
    .filter((key) => key !== 'eol')
    .map((key) => ({
      key,
      label: statusMeta[key].label,
      value: counts.value[key] || 0,
      color: statusMeta[key].color,
    })),
])
</script>

<template>
  <div class="pm-home">
    <section class="pm-hero">
      <div class="pm-hero__text">
        <p class="pm-hero__eyebrow">Product Hub · 产品管理平台</p>
        <h1 class="pm-hero__title">把产品线放在一页里看清</h1>
        <p class="pm-hero__sub">
          产品目录、阶段状态、关键规格与文档入口集中管理。数据来自
          <code>src/data/products.js</code>，改数据即改站点。
        </p>
        <div class="pm-hero__actions">
          <RouteLink to="/products/" class="pm-btn pm-btn--primary">浏览产品目录</RouteLink>
          <RouteLink to="/board.html" class="pm-btn">查看状态看板</RouteLink>
        </div>
      </div>
      <div class="pm-hero__orb" aria-hidden="true" />
    </section>

    <section class="pm-kpis">
      <div v-for="kpi in kpis" :key="kpi.key" class="pm-kpi">
        <span class="pm-kpi__value" :style="{ color: kpi.color }">{{ kpi.value }}</span>
        <span class="pm-kpi__label">{{ kpi.label }}</span>
      </div>
    </section>

    <div class="pm-home__cols">
      <section class="pm-panel">
        <header class="pm-panel__head">
          <h2>最近更新</h2>
          <RouteLink to="/products/" class="pm-panel__more">全部 →</RouteLink>
        </header>
        <ul class="pm-recent">
          <li v-for="p in recent" :key="p.id" class="pm-recent__item">
            <RouteLink :to="`/products/${p.id}.html`" class="pm-recent__link">
              <span class="pm-recent__icon">{{ (categoryMeta[p.category] || {}).icon || '📦' }}</span>
              <span class="pm-recent__main">
                <span class="pm-recent__name">{{ p.name }}</span>
                <span class="pm-recent__model">{{ p.model }}</span>
              </span>
              <StatusBadge :status="p.status" size="sm" />
              <span class="pm-recent__date">{{ p.updated }}</span>
            </RouteLink>
          </li>
        </ul>
      </section>

      <section class="pm-panel">
        <header class="pm-panel__head">
          <h2>阶段分布</h2>
          <RouteLink to="/board.html" class="pm-panel__more">看板 →</RouteLink>
        </header>
        <ul class="pm-dist">
          <li v-for="key in statusOrder" :key="key" class="pm-dist__row">
            <span class="pm-dist__label" :style="{ '--pm-dist-color': statusMeta[key].color }">
              <i />{{ statusMeta[key].label }}
            </span>
            <span class="pm-dist__bar">
              <span
                class="pm-dist__fill"
                :style="{
                  width: `${products.length ? ((counts[key] || 0) / products.length) * 100 : 0}%`,
                  background: statusMeta[key].color,
                }"
              />
            </span>
            <span class="pm-dist__num">{{ counts[key] || 0 }}</span>
          </li>
        </ul>
        <p class="pm-panel__hint">
          维护方式：编辑 <code>src/data/products.js</code> 后提交，AGI Pages 自动构建发布。
        </p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.pm-home {
  display: flex;
  flex-direction: column;
  gap: 26px;
}

.pm-hero {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 40px 36px;
  border-radius: 18px;
  border: 1px solid var(--vp-c-divider);
  background:
    radial-gradient(90% 160% at 0% 0%, color-mix(in srgb, var(--pm-brand) 20%, transparent), transparent 62%),
    radial-gradient(70% 140% at 100% 100%, color-mix(in srgb, var(--pm-brand-2) 16%, transparent), transparent 60%),
    var(--vp-c-bg-alt);
}

.pm-hero__text {
  position: relative;
  z-index: 1;
  max-width: 620px;
}

.pm-hero__eyebrow {
  margin: 0 0 8px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--pm-brand);
}

.pm-hero__title {
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  font-size: 34px;
  line-height: 1.25;
  letter-spacing: -0.01em;
}

.pm-hero__sub {
  margin: 12px 0 0;
  font-size: 14px;
  line-height: 1.75;
  color: var(--vp-c-text-mute);
}

.pm-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 22px;
}

.pm-btn {
  display: inline-flex;
  align-items: center;
  padding: 8px 18px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 8px;
  text-decoration: none !important;
  color: var(--vp-c-text) !important;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg);
  transition: all 0.18s ease;
}

.pm-btn:hover {
  border-color: var(--pm-brand);
  color: var(--pm-brand) !important;
  transform: translateY(-1px);
}

.pm-btn--primary {
  color: #fff !important;
  border-color: transparent;
  background: linear-gradient(135deg, var(--pm-brand), var(--pm-brand-2));
  box-shadow: 0 8px 18px -10px color-mix(in srgb, var(--pm-brand) 80%, transparent);
}

.pm-btn--primary:hover {
  color: #fff !important;
}

.pm-hero__orb {
  position: absolute;
  right: -60px;
  top: -60px;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--pm-brand), var(--pm-brand-2));
  opacity: 0.12;
  filter: blur(2px);
}

.pm-kpis {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
}

.pm-kpi {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}

.pm-kpi__value {
  font-size: 26px;
  font-weight: 700;
  line-height: 1.2;
  font-variant-numeric: tabular-nums;
}

.pm-kpi__label {
  font-size: 12px;
  color: var(--vp-c-text-subtle);
}

.pm-home__cols {
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: 16px;
}

.pm-panel {
  padding: 18px 20px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}

.pm-panel__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.pm-panel__head h2 {
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  font-size: 15px;
}

.pm-panel__more {
  font-size: 12px;
  color: var(--pm-brand) !important;
  text-decoration: none !important;
}

.pm-recent {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
}

.pm-recent__item + .pm-recent__item {
  border-top: 1px dashed var(--vp-c-divider);
}

.pm-recent__link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 4px;
  color: inherit !important;
  text-decoration: none !important;
  border-radius: 6px;
}

.pm-recent__link:hover {
  background: var(--vp-c-bg-alt);
}

.pm-recent__icon {
  font-size: 15px;
}

.pm-recent__main {
  display: flex;
  flex-direction: column;
  min-width: 0;
  margin-inline-end: auto;
}

.pm-recent__name {
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pm-recent__model {
  font-size: 11px;
  font-family: var(--vp-font-family-mono, ui-monospace, monospace);
  color: var(--vp-c-text-subtle);
}

.pm-recent__date {
  font-size: 11px;
  color: var(--vp-c-text-subtle);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.pm-dist {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.pm-dist__row {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
}

.pm-dist__label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 62px;
  color: var(--vp-c-text-mute);
}

.pm-dist__label i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--pm-dist-color);
}

.pm-dist__bar {
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: var(--vp-c-bg-alt);
  overflow: hidden;
}

.pm-dist__fill {
  display: block;
  height: 100%;
  border-radius: 3px;
  min-width: 2px;
  transition: width 0.4s ease;
}

.pm-dist__num {
  min-width: 18px;
  text-align: end;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-subtle);
}

.pm-panel__hint {
  margin: 14px 0 0;
  padding-top: 10px;
  border-top: 1px dashed var(--vp-c-divider);
  font-size: 11px;
  line-height: 1.7;
  color: var(--vp-c-text-subtle);
}

@media (max-width: 959px) {
  .pm-kpis {
    grid-template-columns: repeat(3, 1fr);
  }

  .pm-home__cols {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 719px) {
  .pm-hero {
    padding: 28px 22px;
  }

  .pm-hero__title {
    font-size: 26px;
  }

  .pm-kpis {
    grid-template-columns: repeat(2, 1fr);
  }

  .pm-recent__name {
    white-space: normal;
    line-height: 1.4;
  }

  .pm-recent__link {
    align-items: flex-start;
  }

  .pm-recent__icon {
    margin-top: 2px;
  }
}
</style>
