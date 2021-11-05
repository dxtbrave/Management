import Vue from 'vue'
import App from './App.vue'
import router from '@/router'

// 引入ElementUI插件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

// 引入vue-table-with-tree-grid插件
import TreeTable from 'vue-table-with-tree-grid'

// 导入字体图标
import '@/assets/fonts/iconfont.css'

// 导入全局样式表
import "@/assets/css/global.css"


// 使用插件
Vue.use(ElementUI)


// 注册为全局可用组件
Vue.component('tree-table',TreeTable)

Vue.config.productionTip = false

// 创建事件总线
Vue.prototype.$Bus = new Vue()


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
