<template>
	<view class="boxx">
		<view class="box">
			<view class="logo">
				<image src="https://bpic.51yuansu.com/pic3/cover/04/00/52/5f744b5a97c9c_610.jpg" mode="aspectFill">
				</image>
			</view>
			<view class="myInput">
				<u-input v-model="phone" :color="fontColor" border="bottom" clearable placeholder="手机号"
					:placeholderStyle="placeholderStyle"></u-input>
			</view>
			<view class="myInput">
				<u-input v-model="password" :color="fontColor" border="bottom" clearable password placeholder="密码"
					:placeholderStyle="placeholderStyle"></u-input>
			</view>
			<view class="sign">
				<u-button type="primary" text="登 录" size='large' @tap="toSign"></u-button>
			</view>

			<view class="register-box">
				<view class="register" @tap="toRegister">
					注册
				</view>
				<view class="forget" @tap="toFindPassword">
					忘记密码?
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import trim from '@/utils/trim.js'
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				// 一些样式
				fontColor: "#21231e",
				placeholderStyle: "color: #8c9299",

				phone: '',
				password: '',
				isCheckAgreement: false,
			}
		},
		computed: {
			...mapGetters(['getLoginState'])
		},
		onLoad() {
			if (!!this.getLoginState) {
				uni.switchTab({
					url:'/pages/tabbar/chat_list/chat_list'
				})
			}
		},
		methods: {
			...mapActions(["userLoginAction"]),
			// 登录
			toSign: function() {
				var phone = this.phone
				var password = this.password
				if (trim(phone) == '' || trim(password) == '') {
					uni.showToast({
						title: "手机号或密码不能为空！",
						icon: "none"
					})
				} else {
					// 发送请求，并不需要鉴权
					this.$u.api.SignIn.toSignIn({
						phone,
						password
					}, {
						custom: {
							'auth': false
						}
					}).then(res => {
						console.log(res)
						if (res.status == 0) {
							var token = res.data.token
							this.userLoginAction(token)
							uni.switchTab({
								url:'/pages/tabbar/chat_list/chat_list'
							})
						} else if (res.status == 40001){
							uni.showToast({title:"用户名或密码错误",icon:"none"})
						}else if (res.status == 50000){
							uni.showToast({title:"服务器内部错误",icon:"none"})
						}
					}).catch(err => {
						console.log("login in err: ", err)
						uni.showToast({title:"服务器内部错误",icon:"none"})
					})
				}
			},
			// 注册
			toRegister: function() {
				uni.navigateTo({
					url: '/pages/loginbox/register/register'
				});
			},
			// 忘记密码
			toFindPassword: function() {
				uni.showToast({title:"联系辉哥重置密码",icon:"none"})
				// uni.navigateTo({
				// 	url: '/pages/loginbox/forget_password/forget_password'
				// });
			},
		}
	}
</script>

<style scoped lang="scss">
	.boxx {
		width: 100%;
		height: 100vh;
		// background-image: url("https://www.bupt.edu.cn/images/18/05/09/1mu9mjraxf/xyfg7.jpg");
		background-color: #3c9cff88;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;

		.box {
			position: absolute;
			margin-top: 20vh;
			width: 650rpx;
			height: 60vh;
			border-radius: 15rpx;
			// background-color: #3c9cff77;
			background-color: #ffffffb5;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;

			.logo {
				margin-top: -70rpx;
				margin-bottom: 180rpx;
				width: 150rpx;
				height: 150rpx;
				border-radius: 100rpx;

				image {
					width: 100%;
					height: 100%;
					border-radius: 100rpx;
				}
			}

			.myInput {
				width: 450rpx;
				height: 100rpx;
				color: #d7f9fd;

			}

			.sign {
				width: 450rpx;
				margin-top: 80rpx;
			}

			.register-box {
				width: 450rpx;
				margin-top: 40rpx;
				font-size: 29rpx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;

				.register {
					color: #318efd;
				}

				.forget {

					text-decoration: underline;
				}
			}
		}
	}
</style>
