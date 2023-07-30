export default {
	// 用户登录
	userLoginAction(context, token) {
		context.commit('userLogin', token)
	},
	userLogoutAction(context) {
		context.commit('userLogout')
	},
}