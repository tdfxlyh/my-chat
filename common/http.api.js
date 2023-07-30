import SignIn from './apis/sign_in.js'
import Me from './apis/me.js'

// api集中管理
// 此处第二个参数vm，就是在页面使用的this，可以通过vm获取vuex等操作.
const install = (Vue, vm) => {
	let api = {}
	
	// 把模块化的加进来
	api.SignIn = SignIn
	api.Me = Me
	// ...
	
	
	// 挂到vm上
	vm.$u.api = api
}

export default {
	install
}
