# 产品管理平台（Product Hub）

基于 [VitePress 1](https://vitepress.dev/) 的静态产品管理站点，部署于火山引擎 AGI Pages。

## 功能

- **首页仪表盘**：产品总数、阶段分布、最近更新
- **产品目录** `/products/`：卡片 / 表格视图，支持关键字搜索、分类与状态筛选
- **状态看板** `/board.html`：按概念 → 开发中 → 送样 → 量产 → EOL 分列
- **产品详情** `/products/<id>.html`：关键规格、产品亮点、里程碑时间线、文档入口
- **使用说明** `/guide/`：数据维护与部署文档

## 快速开始

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 产物：src/.vitepress/dist
npm run preview  # 本地预览构建产物
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

`npm run dev` / `npm run build` 会先执行 `npm run gen`，由
[`scripts/gen-products.mjs`](scripts/gen-products.mjs) 根据数据生成
`src/products/<id>.md` 详情页（自动清理已删除产品的页面）。
构建时还会校验数据（必填字段、id 唯一、分类/状态合法性），有问题直接报错。

## 目录结构

```
scripts/gen-products.mjs        # 数据 → 详情页生成脚本
src/.vitepress/config.mts       # 站点配置（导航、侧边栏、数据校验）
src/.vitepress/theme/           # 主题入口、样式、产品组件
src/data/products.js            # 唯一数据源
src/products/                   # 产品目录页 + 生成的详情页
src/guide/                      # 使用说明
src/board.md · src/index.md     # 看板 / 首页
```

## 部署到 AGI Pages

| 配置项 | 值 |
| --- | --- |
| Install Command | `npm ci`（或 `npm install`） |
| Build Command | `npm run build` |
| Output Directory | `src/.vitepress/dist` |

> 从 VuePress 迁移过来后，需在 AGI Pages 控制台把构建命令与产物目录改成上面的值。

## 技术栈

VitePress 1.6（Vite + Vue 3） · 默认主题 + 自定义组件 · 数据驱动生成页面
