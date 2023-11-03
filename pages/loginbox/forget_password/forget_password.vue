<template>
	<view class="boxx">
		<view class="box">
			<my-nav title='找回密码'></my-nav>
			<view class="phone">
				<u-input v-model="phoneNumber" :color="fontColor" border="bottom" clearable
				placeholder="手机号" :placeholderStyle="placeholderStyle"></u-input>
			</view>
			<view class="verification-code">
				<view class="left">
					<u-input v-model="verificationCode" :color="fontColor" border="bottom" clearable
					placeholder="验证码" :placeholderStyle="placeholderStyle"></u-input>
				</view>
				<view class="right" v-if="isEnableSend==true">
					<u-button type="primary" text="发送验证码"  @tap="sendVerificationCode"></u-button>
				</view>
				<view class="right" v-if="isEnableSend==false">
					<u-button type="warning" :text="sendText" disabled></u-button>
				</view>
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
				<u-button type="primary" text="确 定"  @tap="toSubmit"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapGetters, mapActions} from 'vuex'
	import trim from '@/utils/trim.js'
	import isPhoneAvailable from '@/utils/isPhoneAvailable.js'
	import isVerificationCodeAvailable from '@/utils/isVerificationCodeAvailable.js'
	export default {
		data() {
			return {
				// 一些样式
				fontColor:"#21231e",
				placeholderStyle:"color: #8c9299",
				suffixIconStyle:"color: #21231e; font-size: 40rpx;",
				
				phoneNumber:'',
				verificationCode:'',
				password:'',
				passwordAgain:'',
				
				IntervalTimeId:0,
				
			}
		},
		computed:{
			...mapGetters(['getTimeRemaining']),
			isEnableSend(){
				return this.getTimeRemaining['FindPasswordCode'] < 1? true:false
			},
			sendText(){
				return this.getTimeRemaining['FindPasswordCode'] + "秒后重试"
			}
		},
		methods: {
			...mapActions(["setFindPasswordCode"]),
			
			// 发送验证码
			sendVerificationCode:function(){
				
				var phone_number = trim(this.phoneNumber)
				if(!isPhoneAvailable(phone_number)){
					uni.showToast({title:"手机号格式错误",icon:"none"})
				}else{
					// 发送验证码
					this.$u.api.SignIn.findPasswordVerificationCode({ params:{phone_number}, custom:{'auth':false}}).then(res=>{
						console.log(res.statusCode)
						if(res.statusCode == 200){
							// 发送成功时，执行
							this.setFindPasswordCode(60)
							var that = this
							that.IntervalTimeId = setInterval(()=>{
								that.setFindPasswordCode(that.getTimeRemaining['FindPasswordCode']-1)
								if(that.getTimeRemaining['FindPasswordCode'] < 1){
									clearInterval(that.IntervalTimeId)
								}
							},1000)
						}else{
							uni.showToast({title:"发送失败",icon:"none"})
						}
					})
				}
			},
			// 确定
			toSubmit:function(){
				var phone_number = trim(this.phoneNumber)
				var password = trim(this.password)
				var passwordAgain = trim(this.passwordAgain)
				var validation_code = trim(this.verificationCode)
				// 进行参数检验
				if(phone_number == ''){
					uni.showToast({title:"手机号不能为空",icon:"none"})
				}else if(!isPhoneAvailable(phone_number)){
					uni.showToast({title:"手机号格式错误",icon:"none"})
				}else if(password == ""){
					uni.showToast({title:"密码不能为空",icon:"none"})
				}else if(password != passwordAgain){
					uni.showToast({title:"两次密码不一致",icon:"none"})
				}else if(!isVerificationCodeAvailable(validation_code)){
					uni.showToast({title:"验证码格式错误",icon:"none"})
				}else{
					this.$u.api.SignIn.passwordForgottenSubmit({phone_number,password,validation_code},{
						custom:{'auth':false}
					}).then(res=>{
						if(res.data.code == -8){
							// 密码类型错误
							uni.showToast({title:res.data.msg ,icon:"none"})
						}else{
							// 正确执行的话，后端程序报错
							// 。。。 需要修改
							// 跳转页面
							var url = '/pages/loginbox/sign_in/sign_in'
							uni.reLaunch({url})
						}
					}).catch(err=>{
						if(err.statusCode == 400){
							// 验证码错误
							uni.showToast({title:err.data,icon:"none"})
						}else if(err.statusCode == 500){
							uni.showToast({title:"该用户不存在",icon:"none"})
						}
					})
				}
				
			}
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
			width:650rpx;
			height: 60vh;
			border-radius: 15rpx;
			background-color: #ffffffb5;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
			
			.phone, .verification-code, .password,.sure{
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
		}
	}

</style>
