# 使用说明

这是一个**静态产品管理站点**：所有页面由数据驱动，一次修改、全站同步。

## 三个入口

| 页面 | 地址 | 用途 |
| --- | --- | --- |
| 首页 | `/` | 产品总数、阶段分布、最近更新 |
| [产品目录](/products/) | `/products/` | 卡片 / 表格视图，支持搜索与筛选 |
| [状态看板](/board.html) | `/board.html` | 按阶段分列，看清每条产品线进度 |

每个产品还有独立详情页：`/products/<id>.html`，包含规格表、亮点、里程碑与文档入口。

## 数据流

```
src/data/products.js             ← 唯一数据源（手工维护）
        │
        ├─► 首页 / 目录 / 看板组件直接读取
        │
        └─► .vuepress/config.js 的 onInitialized 钩子
                └─► 动态注入 /products/<id>.html 路由（无需生成文件）
```

- 改产品数据 → 只改 `src/data/products.js`
- 改站点结构 → 改 `src/.vuepress/config.js` 与 `src/` 下的页面
- 改视觉样式 → 改 `src/.vuepress/styles/index.scss` 或组件内的 `<style scoped>`

## 本地运行

```bash
npm install
npm run dev     # http://localhost:8080
npm run build   # 产物：src/.vuepress/dist
```

## 下一步

- [新增 / 编辑产品](./getting-started.md)
- [数据结构与部署](./configuration.md)
