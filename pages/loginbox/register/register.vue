<template>
	<view class="boxx">
		<view class="box">
			<my-nav title='注册'></my-nav>
			<view class="phone">
				<u-input v-model="user_name" :color="fontColor" border="bottom" clearable
				placeholder="昵称" :placeholderStyle="placeholderStyle"></u-input>
			</view>
			<view class="phone">
				<u-input v-model="phone" :color="fontColor" border="bottom" clearable
				placeholder="手机号" :placeholderStyle="placeholderStyle"></u-input>
			</view>
			<view class="password">
				<u-input v-model="password" :color="fontColor" border="bottom" clearable password
				placeholder="密码" :placeholderStyle="placeholderStyle"
				></u-input>
			</view>
			<view class="password">
				<u-input v-model="passwordAgain" :color="fontColor" border="bottom" clearable password
				placeholder="确认密码" :placeholderStyle="placeholderStyle"
				></u-input>
			</view>
			<view class="sure">
				<u-button type="primary" text="注 册"  @tap="toSubmit()"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapGetters, mapActions} from 'vuex'
	import isPhoneAvailable from '@/utils/isPhoneAvailable.js'
	export default {
		data() {
			return {
				// 一些样式
				fontColor:"#21231e",
				placeholderStyle:"color: #8c9299",
				suffixIconStyle:"color: #21231e; font-size: 40rpx;",
				
				user_name:'',
				phone:'',
				password:'',
				passwordAgain:'',
			}
		},
		methods: {
			// 注册
			toSubmit:function(){
				if (this.user_name == ""){
					uni.showToast({title:"请输入昵称",icon:"none"})
					return
				}
				if (this.phone == ""){
					uni.showToast({title:"请输入手机号",icon:"none"})
					return
				}
				if (!isPhoneAvailable(this.phone)){
					uni.showToast({title:"手机号不合法",icon:"none"})
					return
				}
				if (this.password == ""){
					uni.showToast({title:"请输入密码",icon:"none"})
					return
				}
				if (this.passwordAgain == ""){
					uni.showToast({title:"请输入确认密码",icon:"none"})
					return
				}
				if (this.password != this.passwordAgain){
					uni.showToast({title:"密码不一致",icon:"none"})
					return
				}
				this.$u.api.SignIn.toRegister({
					user_name:this.user_name,
					phone:this.phone,
					password:this.password,
				}, {
					custom: {
						'auth': false
					}
				}).then(res => {
					console.log(res)
					if (res.status == 0) {
						uni.showToast({title:"注册成功",icon:"none"})
						uni.redirectTo({
							url: "/pages/loginbox/sign_in/sign_in"
						})
					} else{
						uni.showToast({title:res.custom_msg,icon:"none"})
					}
				}).catch(err => {
					console.log("login in err: ", err)
					uni.showToast({title:"服务器内部错误",icon:"none"})
				})
			},

		}
	}
</script>

<style scoped lang="scss">

	.boxx{
		width: 100%;
		height: 100vh;
		background-color: #3c9cff88;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.box{
			position: absolute;
			width:650rpx;
			height: 70vh;
			border-radius: 15rpx;
			background-color: #ffffffb5;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
			
			.phone, .verification-code,.invitation, .password, .sure{
				margin-top: 20rpx;
				width: 500rpx;
			}
			.verification-code{
				display: flex;
				flex-direction: row;
				align-items: center;
				.left{
					width: 60%;
				}
				.right{
					width: 40%;
					padding: 10rpx;
				}
			}
			.invitation{
				margin-top: 50rpx;
			}
			.identity{
				margin-top: 40rpx;
				font-size: 27rpx;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				.radio-left{
					margin-right: 30rpx;
				}
			}
			.sure{
				margin-top: 40rpx;
			}
			
			.agreement{
				position: absolute;
				bottom: 50rpx;
				font-size: 26rpx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				view{
					color: #318efd;
				}
			}
		}
	}

</style>
