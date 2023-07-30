export default {
	// 得到登录信息
	getLoginState:function(state){
		return state.loginState
	},
	getToken:function(state){
		return state.token
	},
}