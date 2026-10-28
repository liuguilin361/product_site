import { defineConfig } from 'vitepress'
import { categoryMeta, products, statusMeta } from '../data/products.js'

// ---- 数据校验：启动 / 构建时就暴露问题，避免带着错误数据发布 ----
const validateProducts = () => {
  const seen = new Set<string>()
  const problems: string[] = []

  for (const p of products) {
    if (!p.id || !/^[a-z0-9][a-z0-9-]*$/.test(p.id)) {
      problems.push(`id 非法（需小写字母 / 数字 / 连字符）：${p.id ?? '(空)'}`)
      continue
    }
    if (seen.has(p.id)) problems.push(`id 重复：${p.id}`)
    seen.add(p.id)

    for (const key of ['model', 'name', 'category', 'status'] as const) {
      if (!p[key]) problems.push(`产品 ${p.id} 缺少必填字段：${key}`)
    }
    if (p.category && !categoryMeta[p.category]) {
      problems.push(`产品 ${p.id} 的 category 未定义：${p.category}`)
    }
    if (p.status && !statusMeta[p.status]) {
      problems.push(`产品 ${p.id} 的 status 未定义：${p.status}`)
    }
  }

  if (problems.length) {
    throw new Error(`[products.js] 数据校验失败：\n  - ${problems.join('\n  - ')}`)
  }
}

validateProducts()

export default defineConfig({
  lang: 'zh-CN',
  title: '产品管理平台',
  description: '产品目录 · 阶段状态 · 关键规格与文档',
  head: [['meta', { name: 'theme-color', content: '#2f6bff' }]],
  appearance: true,
  cleanUrls: false,
  // 迁移期间：忽略 VuePress 留下的 README.md（路由由 index.md 提供）
  srcExclude: ['**/README.md'],
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '产品目录', link: '/products/' },
      { text: '状态看板', link: '/board.html' },
      { text: '使用说明', link: '/guide/' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '使用说明',
          items: [
            { text: '概览', link: '/guide/' },
            { text: '新增 / 编辑产品', link: '/guide/getting-started' },
            { text: '数据结构与部署', link: '/guide/configuration' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/liuguilin361/product_site' },
    ],
    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    sidebarMenuLabel: '目录',
    returnToTopLabel: '回到顶部',
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
  },
})
