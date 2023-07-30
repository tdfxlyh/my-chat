import App from './App'

// #ifndef VUE3
import Vue from 'vue'

// 1.生产提示关闭
Vue.config.productionTip = false


// 2.引入uview-ui
import uView from "uview-ui";
Vue.use(uView);

// 3.如果需要引入公共组件，在下面引入即可
// ...

// 4.引入Vuex的store对象
import store from './store'
Vue.prototype.$store = store


// 5.修改一些其他的配置
uni.$u.setConfig({
	// 修改$u.config对象的属性
	config: {
		unit: 'rpx'
	},
	props: {
		radio: {
			size: 15
		}
	}
})

// 实例化
App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})

// 6.拦截器
import httpInterceptor from '@/common/http.interceptor.js'
Vue.use(httpInterceptor, app)

// 7.接口管理
import httpApi from '@/common/http.api.js'
Vue.use(httpApi, app)

app.$mount()




// --------------下面是如果使用vue3语法的时候用的，本项目使用的vue2语法，下面没用
// #endif
// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif