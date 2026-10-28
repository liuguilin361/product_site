import { defineClientConfig } from 'vuepress/client'
import HomeDashboard from './components/HomeDashboard.vue'
import ProductCatalog from './components/ProductCatalog.vue'
import ProductDetail from './components/ProductDetail.vue'
import StatusBoard from './components/StatusBoard.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component('HomeDashboard', HomeDashboard)
    app.component('ProductCatalog', ProductCatalog)
    app.component('ProductDetail', ProductDetail)
    app.component('StatusBoard', StatusBoard)
  },
})
