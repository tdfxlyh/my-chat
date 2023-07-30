export default {
	// 用户信息
	loginState: !!uni.getStorageSync('loginState') ? true : false,
	token: !!uni.getStorageSync('token') ?  uni.getStorageSync('token') : "",
}