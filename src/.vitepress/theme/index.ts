import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'

import HomeDashboard from './components/HomeDashboard.vue'
import ProductCatalog from './components/ProductCatalog.vue'
import ProductDetail from './components/ProductDetail.vue'
import StatusBoard from './components/StatusBoard.vue'

import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('HomeDashboard', HomeDashboard)
    app.component('ProductCatalog', ProductCatalog)
    app.component('ProductDetail', ProductDetail)
    app.component('StatusBoard', StatusBoard)
  },
} satisfies Theme
