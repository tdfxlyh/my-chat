<template>
	<view class="boxx">
		<view class="box">
			<my-nav title='注册'></my-nav>
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
			<view class="invitation">
				<u-input v-model="invitationCode" :color="fontColor" border="bottom" clearable
				placeholder="邀请码(选填)" :placeholderStyle="placeholderStyle"
				></u-input>
			</view>
			<view class="goodat">
				
			</view>
			<view class="follow">
				
			</view>
			<view class="identity">
				<radio-group @change="chooseIdentity">
					<label class="radio-left">
						<radio value="person" checked/><text>个人</text> 
					</label>
					<label>
						<radio value="unit" /><text>单位</text>
					</label>
				</radio-group>
			</view>
			
			
			<view class="sure">
				<u-button type="primary" text="注 册"  @tap="toSubmit"></u-button>
			</view>
			
			<view class="agreement">
				<checkbox :checked="isCheckAgreement" @tap="toCheck"/>
				我已阅读并同意
				<view @tap="toSjwlServiceAgreement">
					《社交网络用户服务协议》
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import {mapGetters, mapActions} from 'vuex'
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
				invitationCode:'',
				identity:'person',
				
				isCheckAgreement:false,
				
				
				IntervalTimeId:0,
				
				
			}
		},
		computed:{
			...mapGetters(['getTimeRemaining']),
			isEnableSend(){
				return this.getTimeRemaining['RegisterCode'] < 1? true:false
			},
			sendText(){
				return this.getTimeRemaining['RegisterCode'] + "秒后重试"
			}
		},
 
		methods: {
			...mapActions(["setRegisterCode"]),
			// 发送验证码
			sendVerificationCode:function(){
				this.setRegisterCode(60)
				var that = this
				that.IntervalTimeId = setInterval(()=>{
					that.setRegisterCode(that.getTimeRemaining['RegisterCode']-1)
					// console.log(that.getTimeRemaining['RegisterCode'])
					if(that.getTimeRemaining['RegisterCode'] < 1){
						clearInterval(that.IntervalTimeId)
					}
				},1000)
			},
			// 是否勾选协议
			toCheck:function(){
				this.isCheckAgreement = !this.isCheckAgreement
			},
			// 选择身份
			chooseIdentity:function(e){
				this.identity = e.detail.value
				console.log(this.identity)
			},
			// 注册
			toSubmit:function(){
				console.log(this.identity)
				console.log(this.isCheckAgreement)
			},
			// 服务许可协议
			toSjwlServiceAgreement:function(){
				uni.navigateTo({
					url: '/pages/loginbox/sjwl_service_agreement/sjwl_service_agreement'
				});
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
