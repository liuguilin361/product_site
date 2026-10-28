# 新增 / 编辑产品

所有产品都在 [`src/data/products.js`](https://github.com/liuguilin361/product_site/blob/main/src/data/products.js) 的 `products` 数组中。

## 最小示例

```js
{
  id: 'qdk204',                 // 小写字母/数字/连字符，决定详情页地址 /products/qdk204.html
  model: 'QDK204',              // 型号
  name: 'Dash Camera 行车记录仪', // 产品名称
  category: 'dashcam',          // 分类，见 categoryMeta
  status: 'developing',         // 状态，见 statusMeta
  summary: '一句话说明产品定位。',
  tags: ['ADAS', '4G'],
  owner: '张三',
  updated: '2026-10-28',
}
```

保存后执行 `npm run gen`（`npm run dev` / `npm run build` 会自动执行），
产品列表、看板、详情页会一起更新。

## 完整字段

| 字段 | 必填 | 类型 | 说明 |
| --- | --- | --- | --- |
| `id` | ✅ | string | 唯一标识，同时是详情页路径 |
| `model` | ✅ | string | 型号，如 `QDK201` |
| `name` | ✅ | string | 产品名称 |
| `category` | ✅ | string | 分类 key（`dashcam` / `doorbell` / `ptz` / `batterycam` / `bulb` / `tracker` / `other`） |
| `status` | ✅ | string | 状态 key（`concept` / `developing` / `sampling` / `mp` / `eol`） |
| `summary` | | string | 列表卡片与详情页的一句话简介 |
| `tags` | | string[] | 标签，卡片最多显示 4 个 |
| `owner` | | string | 负责人 |
| `updated` | | string | 最近更新日期，`YYYY-MM-DD`，影响排序与“最近更新” |
| `specs` | | Record<string, string> | 关键规格键值对，详情页渲染为表格 |
| `highlights` | | string[] | 产品亮点 |
| `milestones` | | `{ date, title, done }[]` | 里程碑时间线，`done: true` 显示为已完成 |
| `docs` | | `{ name, type, href?, note? }[]` | 相关文档，有 `href` 显示“打开”，否则显示备注 |

## 新增分类 / 状态

编辑 `src/data/products.js` 顶部的 `categoryMeta` / `statusMeta`（含颜色），
再同步 `categoryOrder` / `statusOrder` 的顺序，全站自动生效。

## 构建期校验

启动或构建时会自动检查数据，以下情况会直接报错并中止，避免带错误数据发布：

- `id` 缺失、格式非法或重复
- `model` / `name` / `category` / `status` 缺失
- `category` / `status` 使用了未定义的 key

校验逻辑在 `src/.vitepress/config.mts` 中。

## 详情页是怎么来的

`scripts/gen-products.mjs` 会根据产品数据生成 `src/products/<id>.md`：

```md
---
layout: page
pageClass: pm-detail-page
---
<ProductDetail id="qdk201" />
```

- `npm run dev` / `npm run build` 会自动先执行生成
- 从数据中删除产品后，对应页面会在下次生成时自动清理
- 生成页顶部有 `AUTO-GENERATED` 标记，**不要手工编辑**
