import Vue from 'vue'
import App from './App.vue'
import router from '@/router'

// 引入ElementUI插件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

// 导入字体图标
import '@/assets/fonts/iconfont.css'

// 导入全局样式表
import "@/assets/css/global.css"

// 使用插件
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
