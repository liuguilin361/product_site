# 产品管理平台（Product Hub）

基于 [VuePress 2](https://v2.vuepress.vuejs.org/) 的静态产品管理站点，部署于火山引擎 AGI Pages。

## 功能

- **首页仪表盘**：产品总数、阶段分布、最近更新
- **产品目录** `/products/`：卡片 / 表格视图，支持关键字搜索、分类与状态筛选
- **状态看板** `/board.html`：按概念 → 开发中 → 送样 → 量产 → EOL 分列
- **产品详情** `/products/<id>.html`：关键规格、产品亮点、里程碑时间线、文档入口
- **使用说明** `/guide/`：数据维护与部署文档

## 快速开始

```bash
npm install
npm run dev     # http://localhost:8080
npm run build   # 产物：src/.vuepress/dist
```

## 数据维护

所有产品数据集中在 [`src/data/products.js`](src/data/products.js)：

```js
{
  id: 'qdk201',
  model: 'QDK201',
  name: 'Dash Camera 行车记录仪',
  category: 'dashcam',
  status: 'sampling',
  summary: '...',
  specs: { /* 键值对 */ },
  highlights: [...],
  milestones: [{ date: '2026-10', title: '客户送样', done: true }],
  docs: [{ name: 'Datasheet', type: 'PPTX', note: '网盘' }],
}
```

> 仓库内为**示例数据**，请按实际情况替换 `status` / `owner` / `specs` 等字段。

详情页路由由 `src/.vuepress/config.js` 的 `onInitialized` 钩子根据数据动态注入，
无需手工创建页面文件；构建时会自动校验数据（必填字段、id 唯一、分类/状态合法性）。

## 部署到 AGI Pages

| 配置项 | 值 |
| --- | --- |
| Build Command | `npm run build`（或 `vuepress build src`） |
| Output Directory | `src/.vuepress/dist` |

```bash
iga pages build
iga pages deploy
```

## 技术栈

VuePress 2（Vite bundler） · Vue 3 · 默认主题 + 自定义组件
