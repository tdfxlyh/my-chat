// 拦截器

const install = (Vue, vm) => {
	uni.$u.http.setConfig((config) => {
		// 全局的baseURL
		config.baseURL = 'http://127.0.0.1:8080';
		config.staticURL = 'http://127.0.0.1:8080';
		config.defaultHeadURL = 'https://bpic.51yuansu.com/pic3/cover/04/00/52/5f744b5a97c9c_610.jpg';
		
		// 配置全局请求头信息
		config.header = {
			"content-type": "application/json;charset=UTF-8",
		};
		// config.custom.auth = true
		
		return config;
	});

	// 请求拦截，配置Token等参数
	uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
		// 如果需要鉴权
		if(config.custom.auth == true){
			var token = vm.$store.getters.getToken
			if(!token){
				uni.reLaunch({url:'/pages/loginbox/sign_in/sign_in'})
				return false
			}
			config.header['Authorization'] = "Bearer " + token
		}
		// console.log(config)
		return config
	})
	
	

	// 响应拦截，判断状态码是否通过
	uni.$u.http.interceptors.response.use((response) => {
		return response.data
		
	}, (response) => {
		/*  对响应错误做点什么 （statusCode !== 200）*/
		console.log(response)
		var statusCode = response.status
		if(statusCode == 500){
			uni.showToast({title:"服务器接口出现问题",icon:"none"})
		}
		return Promise.reject(response)
	})

};

export default {
	install
};

