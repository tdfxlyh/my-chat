export default {
	// 用户登录与退出
	userLogin(state, token) {
		state.loginState = true
		state.token = token
		uni.setStorageSync('loginState', 'ok')
		uni.setStorageSync('token', token)
	},
	userLogout(state) {
		state.loginState = false
		state.token = ""
		uni.clearStorageSync('loginState')
		uni.clearStorageSync('token')
	},
}