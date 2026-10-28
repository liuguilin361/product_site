import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { createPage, defineUserConfig } from 'vuepress'

import { products, statusMeta, categoryMeta } from '../data/products.js'

// ---- 数据校验：在启动时就暴露问题，避免带着错误数据发布 ----
const validateProducts = () => {
  const seen = new Set()
  const problems = []

  for (const p of products) {
    if (!p.id || !/^[a-z0-9][a-z0-9-]*$/.test(p.id)) {
      problems.push(`id 非法（需小写字母 / 数字 / 连字符）：${p.id ?? '(空)'}`)
      continue
    }
    if (seen.has(p.id)) problems.push(`id 重复：${p.id}`)
    seen.add(p.id)

    for (const key of ['model', 'name', 'category', 'status']) {
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

/**
 * 由产品数据生成详情页路由：
 *   /products/<id>.html  ->  <ProductDetail id="<id>" />
 * 不落盘、不产生额外 markdown 文件，数据改了页面就跟着变。
 */
const createProductPages = (app) =>
  products.map((product) =>
    createPage(app, {
      path: `/products/${product.id}.html`,
      frontmatter: {
        title: `${product.model} · ${product.name}`,
        pageClass: 'pm-detail-page',
        sidebar: false,
        lastUpdated: false,
        contributors: false,
        editLink: false,
      },
      content: `<ProductDetail id="${product.id}" />`,
    }),
  )

export default defineUserConfig({
  bundler: viteBundler(),
  lang: 'zh-CN',
  title: '产品管理平台',
  description: '产品目录 · 阶段状态 · 关键规格与文档',
  head: [['meta', { name: 'theme-color', content: '#2f6bff' }]],
  theme: defaultTheme({
    navbar: [
      { text: '首页', link: '/' },
      { text: '产品目录', link: '/products/' },
      { text: '状态看板', link: '/board.html' },
      { text: '使用说明', link: '/guide/' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '使用说明',
          children: [
            '/guide/README.md',
            '/guide/getting-started.md',
            '/guide/configuration.md',
          ],
        },
      ],
    },
    repo: 'liuguilin361/product_site',
    docsDir: 'src',
    editLink: false,
    lastUpdated: false,
    contributors: false,
    colorMode: 'auto',
    colorModeSwitch: true,
  }),

  // onInitialized 在扫描 markdown 之后、生成路由之前触发，
  // 这里把产品详情页注入 app.pages。
  async onInitialized(app) {
    app.pages.push(...(await Promise.all(createProductPages(app))))
  },
})
