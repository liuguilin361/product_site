/**
 * ============================================================
 *  产品数据 —— 全站唯一数据源（Single Source of Truth）
 * ============================================================
 *
 *  ⚠️ 说明：当前内容为「示例数据」，status / owner / specs / milestones
 *     等字段请按实际情况修改。产品型号与名称取自现有产品资料。
 *
 *  新增产品：在 products 数组末尾追加一个对象即可。
 *  产品目录、状态看板、首页会立即生效；详情页路由由
 *  src/.vuepress/config.js 的 onInitialized 钩子自动注入。
 *
 *  必填字段：id / model / name / category / status
 *  可选字段：summary / tags / owner / updated / specs / highlights /
 *           milestones / docs
 */

/** 产品状态（顺序即看板列顺序） */
export const statusMeta = {
  concept: { label: '概念', color: '#8b5cf6', desc: '需求评估 / 预研' },
  developing: { label: '开发中', color: '#f59e0b', desc: '立项开发 / 样机调试' },
  sampling: { label: '送样', color: '#3b82f6', desc: '客户送样 / 小批试产' },
  mp: { label: '量产', color: '#10b981', desc: '批量交付' },
  eol: { label: 'EOL', color: '#94a3b8', desc: '停产 / 仅维护' },
}

export const statusOrder = ['concept', 'developing', 'sampling', 'mp', 'eol']

/** 产品分类 */
export const categoryMeta = {
  dashcam: { label: '行车记录仪', icon: '🚗' },
  doorbell: { label: '智能门铃', icon: '🔔' },
  ptz: { label: '云台摄像机', icon: '🎥' },
  batterycam: { label: '电池相机', icon: '🔋' },
  bulb: { label: '灯泡相机', icon: '💡' },
  tracker: { label: '定位终端', icon: '📍' },
  other: { label: '其他', icon: '📦' },
}

export const categoryOrder = [
  'dashcam',
  'doorbell',
  'ptz',
  'batterycam',
  'bulb',
  'tracker',
  'other',
]

/** 产品列表 */
export const products = [
  {
    id: 'qdk201',
    model: 'QDK201',
    name: 'Dash Camera 行车记录仪',
    category: 'dashcam',
    status: 'sampling',
    summary:
      '4G 车载行车记录仪，支持 ADAS / DMS 事件检测与事件前后 5 秒抓拍，可选配 RTK 与 RFID 司机识别。',
    tags: ['ADAS', 'DMS', '4G', 'RTK 选配'],
    owner: '待补充',
    updated: '2026-10-26',
    specs: {
      产品形态: '车载行车记录仪',
      网络: '4G / Wi-Fi',
      定位: 'GPS；RTK 选配',
      'ADAS / DMS': 'FCW / LDW / 前车近距 / 行人碰撞，档位与报警间隔可配',
      事件抓拍: '事件前 5 s / 后 5 s（可编程）',
      接口: 'RS232 ×1（FLS 与 RFID 二选一）',
      视频回放: '手机 App 经 Wi-Fi 热点回放 / 下载；SD 卡本地读取',
      语音: 'TTS 播报（收费授权功能）',
      工作温度: '待补充',
      供电: '待补充',
    },
    highlights: [
      'ADAS / DMS 多类事件检测，灵敏度与报警间隔可分项配置',
      '事件前后各 5 秒抓拍，可只上传单张图片以节省流量',
      '断网时手机 App 可经 Wi-Fi 热点查看直播 / 回放 / 下载',
      'RTK 版本支持高精度定位（算法需平台侧支持）',
    ],
    milestones: [
      { date: '2026-06', title: 'RFQ Datasheet 版本发出', done: true },
      { date: '2026-09', title: 'EVT 样机调试', done: true },
      { date: '2026-10', title: '客户送样（QDK201-SA1）', done: true },
      { date: 'TBD', title: 'DVT → PVT → MP', done: false },
    ],
    docs: [
      { name: 'Datasheet QDK201', type: 'PPTX', note: '网盘 · OEM-Sharepoint' },
      { name: 'Software Feature List', type: '文档', note: '网盘 · OEM-Sharepoint' },
    ],
  },
  {
    id: 'qdk202',
    model: 'QDK202',
    name: 'Doorbell 智能门铃',
    category: 'doorbell',
    status: 'developing',
    summary: '电池供电智能门铃，支持 PIR 侦测、双向对讲与云端存储。',
    tags: ['电池', 'PIR', '双向对讲'],
    owner: '待补充',
    updated: '2026-10-22',
    specs: {
      产品形态: '电池智能门铃',
      供电: '待补充',
      侦测: 'PIR 人体侦测',
      对讲: '双向语音',
      存储: '待补充',
      网络: 'Wi-Fi',
      工作温度: '待补充',
    },
    highlights: ['免布线安装', '低功耗待机', 'App 远程查看与对讲'],
    milestones: [
      { date: '2026-08', title: 'RFQ Datasheet V0.1', done: true },
      { date: '2026-10', title: 'Datasheet V1.1', done: true },
      { date: 'TBD', title: '样机 / 送样', done: false },
    ],
    docs: [{ name: 'Doorbell Datasheet V1.1', type: 'PPTX', note: '网盘 · OEM-Sharepoint' }],
  },
  {
    id: 'qdk203',
    model: 'QDK203',
    name: 'PTZ Camera 云台摄像机',
    category: 'ptz',
    status: 'developing',
    summary: '室内外云台摄像机，支持水平 / 垂直转动、自动追踪与夜视。',
    tags: ['云台', '夜视', '自动追踪'],
    owner: '待补充',
    updated: '2026-10-18',
    specs: {
      产品形态: '云台摄像机',
      云台: '水平 / 垂直转动（角度待补充）',
      夜视: '待补充',
      网络: 'Wi-Fi',
      存储: '待补充',
      供电: '待补充',
    },
    highlights: ['远程云台控制', '移动侦测与自动追踪', '红外夜视'],
    milestones: [
      { date: '2026-09', title: 'Datasheet V1.0', done: true },
      { date: 'TBD', title: 'EVT 样机', done: false },
    ],
    docs: [{ name: 'PTZ Datasheet V1.0', type: 'PPTX', note: '网盘 · OEM-Sharepoint' }],
  },
  {
    id: 'qdk001',
    model: 'QDK001',
    name: 'Tracker 车载定位终端',
    category: 'tracker',
    status: 'mp',
    summary: '4G 车载定位终端，支持 Wialon 等平台对接、电子围栏与远程诊断。',
    tags: ['4G', 'Wialon', '电子围栏'],
    owner: '待补充',
    updated: '2026-10-12',
    specs: {
      产品形态: '车载定位终端',
      网络: '4G',
      定位: 'GPS',
      平台对接: 'Wialon 等第三方平台',
      接口: '待补充',
      供电: '待补充',
      工作温度: '待补充',
    },
    highlights: ['平台协议对接周期约一周', '电子围栏 / 远程诊断', '软件特性清单可随版本更新'],
    milestones: [
      { date: '2026-03', title: 'Datasheet V1.4', done: true },
      { date: '2026-05', title: '量产（MP）', done: true },
    ],
    docs: [
      { name: 'Tracker QDK001 Datasheet V1.4', type: '文档', note: '网盘 · OEM-Sharepoint' },
      { name: 'Tracker QDK001 Software Feature List', type: '文档', note: '网盘 · OEM-Sharepoint' },
    ],
  },
  {
    id: 'qdm110',
    model: 'QDM110',
    name: 'Tracker 定位终端（QDM110）',
    category: 'tracker',
    status: 'sampling',
    summary: '小型化定位终端，面向车队管理与资产管理场景。',
    tags: ['4G', '小型化'],
    owner: '待补充',
    updated: '2026-10-08',
    specs: {
      产品形态: '定位终端',
      网络: '待补充',
      定位: 'GPS',
      供电: '待补充',
      工作温度: '待补充',
    },
    highlights: ['体积小、易安装', '适合车队批量部署'],
    milestones: [
      { date: '2026-03', title: 'Datasheet V1.0', done: true },
      { date: 'TBD', title: '客户送样', done: false },
    ],
    docs: [{ name: 'ikotek Tracker Datasheet QDM110 V1.0', type: 'PPTX', note: '网盘 · OEM-Sharepoint' }],
  },
  {
    id: 'batterycam',
    model: 'BatteryCam',
    name: 'Battery Camera 电池相机',
    category: 'batterycam',
    status: 'concept',
    summary: '电池供电无线相机，适合无布线场景，支持 App 远程查看。',
    tags: ['电池', '无线', '低功耗'],
    owner: '待补充',
    updated: '2026-09-30',
    specs: {
      产品形态: '电池相机',
      供电: '电池',
      网络: 'Wi-Fi',
      存储: '待补充',
      待机: '待补充',
    },
    highlights: ['免布线', '超长待机', 'PIR 触发录像'],
    milestones: [
      { date: '2026-04', title: 'RFQ Datasheet V0.1', done: true },
      { date: 'TBD', title: '需求评审', done: false },
    ],
    docs: [
      { name: 'Ikotek_BatteryCam_RFQ_Datasheet_V0.1', type: 'PPTX', note: '网盘 · OEM-Sharepoint' },
      { name: 'Battery Camera Guide', type: 'PDF', note: '网盘 · OEM-Sharepoint' },
    ],
  },
  {
    id: 'bulbcam',
    model: 'BulbCam',
    name: 'Bulb Camera 灯泡相机',
    category: 'bulb',
    status: 'concept',
    summary: 'E27 灯座式相机，替换灯泡即可使用，适合家庭安防。',
    tags: ['E27', '即插即用'],
    owner: '待补充',
    updated: '2026-09-28',
    specs: {
      产品形态: '灯泡相机',
      灯座: 'E27',
      网络: 'Wi-Fi',
      夜视: '待补充',
      存储: '待补充',
    },
    highlights: ['免安装、免布线', '360° 视角（待确认）'],
    milestones: [
      { date: '2026-04', title: 'RFQ Datasheet V0.1', done: true },
      { date: 'TBD', title: '需求评审', done: false },
    ],
    docs: [{ name: 'Ikotek_BulbCam_RFQ_Datasheet_V0.1', type: 'PPTX', note: '网盘 · OEM-Sharepoint' }],
  },
]

/** 工具函数 */
export const getProduct = (id) => products.find((p) => p.id === id)

export const statusCounts = () =>
  statusOrder.reduce((acc, key) => {
    acc[key] = products.filter((p) => p.status === key).length
    return acc
  }, {})

export const recentProducts = (limit = 5) =>
  [...products].sort((a, b) => (b.updated || '').localeCompare(a.updated || '')).slice(0, limit)
