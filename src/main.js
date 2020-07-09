import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import axios from 'axios'
Vue.prototype.axios = axios;

/* 全局过滤器 */
Vue.filter('setWH',(url , arg)=>{
	return url.replace(/w\.h/,arg);
});
/* 上拉组件引用 创造全局组件*/
import Scroller from '@/components/Scroller'
Vue.component('Scroller',Scroller);
/* 加载组件  创造全局组件 */
import Loading from '@/components/Loading'
Vue.component("Loading",Loading);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
