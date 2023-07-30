export default {
	// 如果get想增加body,直接在params里面写即可
	// get方法，第二个参数为：{参数}，或者{{参数}，{操作}}
	// post方法，第二个参数为：{参数}，第三个参数为{操作}
	// 如下示例
	// getMethodDemo : params => uni.$u.http.get('/#zh/en/%E4%BD%A0%E5%A5%BD', params),
	// fanyi : (data, body) => uni.$u.http.post('/#zh/en/%E4%BD%A0%E5%A5%BD', data, body),
	toSignIn: (data, body) => uni.$u.http.post('/login', data, body),
	// 忘记密码，确定
	// passwordForgottenSubmit: (data, body) => uni.$u.http.post('/users/password_forgotten/', data, body),
}
