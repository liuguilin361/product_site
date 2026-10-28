# 数据结构与部署

## 目录结构

```
product_site/
├── scripts/
│   └── gen-products.mjs         # 由数据生成产品详情页
├── src/
│   ├── .vitepress/
│   │   ├── config.mts           # 站点配置（导航、侧边栏、数据校验）
│   │   └── theme/
│   │       ├── index.ts         # 主题入口，注册产品组件
│   │       ├── custom.css       # 品牌色与全局样式
│   │       └── components/      # 产品相关 Vue 组件
│   │           ├── HomeDashboard.vue
│   │           ├── ProductCatalog.vue
│   │           ├── ProductCard.vue
│   │           ├── ProductDetail.vue
│   │           ├── StatusBadge.vue
│   │           └── StatusBoard.vue
│   ├── data/products.js         # ★ 产品数据（唯一数据源）
│   ├── products/                # 产品目录页 + 自动生成的详情页
│   ├── guide/                   # 使用说明
│   ├── board.md                 # 状态看板
│   └── index.md                 # 首页
└── package.json
```

## 站点配置

`src/.vitepress/config.mts`：

```ts
export default defineConfig({
  lang: 'zh-CN',
  title: '产品管理平台',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '产品目录', link: '/products/' },
      { text: '状态看板', link: '/board.html' },
      { text: '使用说明', link: '/guide/' },
    ],
    sidebar: { '/guide/': [/* ... */] },
  },
})
```

## 主题与样式

- 品牌色：`src/.vitepress/theme/custom.css` 中的 `--pm-brand` / `--pm-brand-2`
- 版心宽度：页面 frontmatter 的 `pageClass`（`pm-wide-page` 1180px / `pm-detail-page` 980px）
- 深浅色模式：默认跟随系统，导航栏右上角可切换

## 部署到 AGI Pages

构建命令与产物目录：

- **Build Command**: `npm run build`
- **Output Directory**: `src/.vitepress/dist`

如果 AGI Pages 使用 GitHub 仓库自动构建，确认上面两项已改为 VitePress 的配置；
也可以本地构建后上传产物：

```bash
npm run build
# 将 src/.vitepress/dist 目录作为静态站点上传
```

::: tip 依赖安装
确保构建环境执行 `npm install`（或 `npm ci`），否则 `vitepress` 命令不可用。
:::
