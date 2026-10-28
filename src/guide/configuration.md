# 数据结构与部署

## 目录结构

```
product_site/
├── src/
│   ├── .vuepress/
│   │   ├── config.js           # 站点配置 + 由数据注入产品详情页路由
│   │   ├── client.js           # 全局注册产品组件
│   │   ├── components/         # 产品相关 Vue 组件
│   │   │   ├── HomeDashboard.vue
│   │   │   ├── ProductCatalog.vue
│   │   │   ├── ProductCard.vue
│   │   │   ├── ProductDetail.vue
│   │   │   ├── StatusBadge.vue
│   │   │   └── StatusBoard.vue
│   │   └── styles/index.scss   # 品牌色与全局样式
│   ├── data/products.js        # ★ 产品数据（唯一数据源）
│   ├── products/README.md      # 产品目录页
│   ├── guide/                  # 使用说明
│   ├── board.md                # 状态看板
│   └── README.md               # 首页
└── package.json
```

## 站点配置

`src/.vuepress/config.js`：

```js
export default defineUserConfig({
  bundler: viteBundler(),
  lang: 'zh-CN',
  title: '产品管理平台',
  theme: defaultTheme({
    navbar: [
      { text: '首页', link: '/' },
      { text: '产品目录', link: '/products/' },
      { text: '状态看板', link: '/board.html' },
      { text: '使用说明', link: '/guide/' },
    ],
    // ...
  }),

  // 由产品数据动态注入详情页路由
  async onInitialized(app) {
    app.pages.push(...(await Promise.all(createProductPages(app))))
  },
})
```

## 主题与样式

- 品牌色：`src/.vuepress/styles/index.scss` 中的 `--pm-brand` / `--pm-brand-2`
- 版心宽度：页面 frontmatter 的 `pageClass`（`pm-wide-page` 1180px / `pm-detail-page` 980px）
- 深浅色模式：默认跟随系统，导航栏右上角可切换

## 部署到 AGI Pages

构建命令与产物目录：

- **Build Command**: `npm run build`（等价于 `vuepress build src`）
- **Output Directory**: `src/.vuepress/dist`

或使用 CLI：

```bash
iga pages build
iga pages deploy
```

::: tip 依赖安装
若 AGI Pages 不会自动安装依赖，请在构建配置中加入 `npm install` 步骤。
详情页路由由配置钩子注入，无论用 `npm run build` 还是 `vuepress build src` 都能正常产出。
:::
