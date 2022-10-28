import Vue from 'vue'
import App from './App.vue'
//import '../plugins/element-ui'

// import axios from 'axios'
import echarts from 'echarts'
import 'font-awesome/css/font-awesome.min.css'
import router from './router'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import service from './service'

Vue.use(ElementUi)
// Vue.prototype.axios = axios
Vue.prototype.$echarts = echarts
Vue.prototype.service = service
Vue.config.productionTip = false

// 路由导航守卫
router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('username')) {
    if (to.path !== '/login') {
      next('/login')
    } else next()
  } next()
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
