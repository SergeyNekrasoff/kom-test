import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import { routes } from './router/index'
import SuiVue from 'semantic-ui-vue'
import 'semantic-ui-css/semantic.min.css'
import AnimatedVue from 'animated-vue'
import 'animate.css/animate.css'

Vue.config.productionTip = false

Vue.use(AnimatedVue)
Vue.use(VueRouter)
Vue.use(SuiVue)

const router = new VueRouter({
  routes: routes,
  mode: 'history'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
