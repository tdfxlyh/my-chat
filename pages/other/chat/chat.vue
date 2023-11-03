<template>
	<view class="boxx">		
		<block >	
			<block> 
				<scroll-view class="scroll"  scroll-y="true" scroll-with-animation="true" :scroll-top='scrollTop' @scroll="lookChat"  
					refresher-enabled="true" :refresher-threshold="10" :refresher-triggered="false" @refresherrefresh="onRefresh">
					<block v-for="(item, index) in message_list" :key="index">
						<!-- 其他人 -->
						<view class="chat-one" v-if="!item.is_me">
							<image class="chat-face"  :src="item.avatar_url" @tap="toSeeUserImages(item.avatar_url)" mode="aspectFill"/>
							<view class="chat-box"> 
								<view class="chat-content" v-if="item.message_type==1 && item.with_draw==0" @longpress="toOptMsg(item)">{{item.content}}</view>
								<view class="chat-content with_draw" v-if="item.message_type==1 && item.with_draw==1">>>对方撤回了一条消息</view>
							</view>
						</view>
						<!-- 我自己 -->
						<view v-else class="chat-one chat-one-mine">
							<view class="chat-box">
								<view class="chat-content" v-if="item.message_type==1 && item.with_draw==0" @longpress="toOptMsg(item)">{{item.content}}</view>
								<view class="chat-content with_draw" v-if="item.message_type==1 && item.with_draw==1">>>我撤回了一条消息</view>
							</view>
							<image class="chat-face" :src="item.avatar_url"  @tap="toSeeUserImages(item.avatar_url)" mode="aspectFill"/>
						</view>
					</block>
				</scroll-view>
				
				<view class="chat-footer">
					<input class="msg-input" type="text" cursor-spacing="16" v-model="myInput" @input="longCheck()" placeholder="请输入(140字以内)"/>
					<view class="send-btn" @tap="toSendMsg()">发送</view>
				</view>
			
			</block>
		</block>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	export default {
		data() { 
			return {
				// 自动滚动吗，0不滚动，1滚动
				isGunDong:1,
				scrollTop:999999,
				
				myInput:"",
				
				receiver_user_id:0, 
				receiver_user_name: "",
				message_list:[],
				
				// 下拉刷新是否被触发
				triggeredPull:false,
				
				// 定时执行
				timeOut1:0,
				
				
			}
		},
		computed:{
			...mapGetters([])
		},
		onLoad(e){
			this.receiver_user_id = parseInt(e.other_user_id, 10)
			var opt_type = 1
			var receiver_user_id = this.receiver_user_id
			// 获取聊天信息
			this.$u.api.Friend.getMessage({
				opt_type, 
				receiver_user_id
			}, {
				custom: {
					'auth': true
				}
			}).then(res => {
				console.log(res)
				if (res.status == 0) {
					this.receiver_user_name = res.data.user_name
					this.message_list = res.data.msg_list
					uni.setNavigationBarTitle({
						title: res.data.user_name
					});
				} else {
					uni.showToast({
						title: "服务器内部错误",
						icon: "none"
					})
				}
			})
		
		},
		onShow() {
			this.goBottom()
			var that = this
			that.timeOut1 = setInterval(()=>{
				console.log(1)
				if (that.isGunDong == 1) {
					var opt_type = 4 // 新消息
					var receiver_user_id = that.receiver_user_id
					var timestamp = 0
					if (that.message_list.length>0){
						timestamp = that.message_list[that.message_list.length-1].timestamp
					}
					// 获取最新消息
					that.$u.api.Friend.getMessage({
						opt_type, 
						receiver_user_id,
						timestamp
					}, {
						custom: {
							'auth': true
						}
					}).then(res => {
						console.log(res)
						if (res.status == 0) {
							res.data.msg_list.forEach(tmp=>{
								that.message_list.push(tmp)
							})
						} else {
							uni.showToast({
								title: "服务器内部错误",
								icon: "none"
							})
						}
					})
				}
			},2000)
		},
		onHide(){
			clearInterval(this.timeOut1)
		},
		onUnload(){
			clearInterval(this.timeOut1)
		},
		methods: {
			// 查看聊天记录
			lookChat:function(e){
				var top = e.target.scrollTop
				var height = e.target.scrollHeight
				if(height-top>770){
					this.isGunDong=0
				}else{
					this.isGunDong=1
				}
			},
			goBottom: function(e) {
				if(this.isGunDong==1){
					this.scrollTop = 999999999+Math.ceil(Math.random()*1000); 
				}
			},
			// 查看头像
			toSeeUserImages:function(photo){
				var that = this
				var nowPhoto = photo
				var imageList = [nowPhoto]
				uni.previewImage({
					current:nowPhoto,
					urls: imageList,
					longPressActions: {
						itemList: ['保存图片'],
						itemColor:'#417fca',
						success: function(data) {
							var nowphoto = imageList[data.index]
							that.toDownImages(nowphoto)
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			// 输入文字长度检查
			longCheck:function(){
				if(this.myInput.length==140){
					uni.showToast({title:"已达到最大长度！",icon:'none',mask:false})
				}else if(this.myInput.length>=138){
					uni.showToast({title:"注意不要超过140字！",icon:'none',mask:false})
				}
			},
			onRefresh:function(){
				var that = this
				that.triggeredPull = true
				// 获取历史聊天信息
				var opt_type = 3 // 历史50条
				var receiver_user_id = that.receiver_user_id
				var timestamp = 0
				if (that.message_list.length>0){
					timestamp = that.message_list[0].timestamp
				}
				if (timestamp == 0){
					return
				}
				this.$u.api.Friend.getMessage({
					opt_type, 
					receiver_user_id,
					timestamp
				}, {
					custom: {
						'auth': true
					}
				}).then(res => {
					console.log(res)
					if (res.status == 0) {
						res.data.msg_list.reverse()
						res.data.msg_list.forEach(tmp=>{
							that.message_list.unshift(tmp)
						})
						setTimeout(()=>{
							that.triggeredPull = false
						},1000)
						
					} else {
						uni.showToast({
							title: "服务器内部错误",
							icon: "none"
						})
					}
				})
			},
			toOptMsg:function(item){
				if (!item.is_me) { // 只能删除
					uni.showModal({
						content: "是否确定删除",
						confirmColor:"#ff0000",
						success:res=>{
							if(res.confirm==true){
								// 操作信息
								this.$u.api.Friend.optMessage({
									opt_type:2, 
									message_id:item.id,
								}, {
									custom: {
										'auth': true
									}
								}).then(res => {
									console.log(res)
									if (res.status == 0) {
										this.reloadData()
										uni.showToast({
											title: "删除成功",
											icon: "none"
										})
									} else {
										uni.showToast({
											title: "服务器内部错误",
											icon: "none"
										})
									}
								})
							}
						}
					})
					return
				}
				// 自己的可以删除，可以撤回
				uni.showModal({
					content:"选择需要执行的操作",
					confirmColor:"#ff0000",
					confirmText:"删除",
					cancelColor:"#5AC725",
					cancelText:"撤回",
					success:res=>{
						var opt_type = 2
						var message_id = item.id
						if(res.confirm==true){ // 删除
							opt_type = 2
						}else{ // 撤回
							opt_type = 3
						}
						uni.showModal({
							content: "是否确定" + opt_type==2?"删除":"撤回",
							confirmColor:"#ff0000",
							success:res=>{
								if(res.confirm==true){
									// 操作信息
									this.$u.api.Friend.optMessage({
										opt_type, 
										message_id
									}, {
										custom: {
											'auth': true
										}
									}).then(res => {
										console.log(res)
										if (res.status == 0) {
											this.reloadData()
											uni.showToast({
												title: opt_type==2?"删除":"撤回" + "成功",
												icon: "none"
											})
										} else {
											uni.showToast({
												title: "服务器内部错误",
												icon: "none"
											})
										}
									})
								}
							}
						})
					}
				})
			},
			reloadData:function(){
				var that = this
				that.$u.api.Friend.getMessage({
					opt_type:2, // 2: 最新n条消息 
					receiver_user_id: that.receiver_user_id,
					n: that.message_list.length,
				}, {
					custom: {
						'auth': true
					}
				}).then(res => {
					console.log(res)
					if (res.status == 0) {
						that.message_list = res.data.msg_list
					} else {
						uni.showToast({
							title: "服务器内部错误",
							icon: "none"
						})
					}
				})
			},
			// 发送消息
			toSendMsg:function(){
				var that = this
				if(that.myInput==""){
					uni.showToast({title:"输入不能为空！",icon:"none"})
					return
				}
				var message_type = 1
				var receiver_user_id = that.receiver_user_id
				var content = that.myInput
				that.$u.api.Friend.addMessage({
					message_type, 
					receiver_user_id,
					content
				}, {
					custom: {
						'auth': true
					}
				}).then(res => {
					console.log(res)
					if (res.status != 0) {
						uni.showToast({
							title: "服务器内部错误",
							icon: "none"
						})
						return
					}
					that.myInput = ""
				})
				
			},
		}
	}
</script>

<style scoped lang="scss">
.boxx{
	width: 100%;
	height: 100vh; 
	background: $back-color;
	// background-color: pink;
	z-index: -1;
	.scroll{
		width: 100%;
		background-color: $back-color;
		position: absolute;
		top: 0rpx; 
		bottom: 100rpx;
		padding-bottom: 30rpx;
		border-bottom: 1rpx solid #dddddd;
		.chat-one {
			display: flex;
			flex-direction: row; 
			flex-wrap: wrap;
			justify-content: flex-start;
			align-items: flex-start;
			padding: 20rpx 0;
		}
		.chat-one-begin {
			padding: 40rpx 0 0;
		}
		.chat-one-mine {
			justify-content: flex-end;
		}
		.chat-face {
			width: 84rpx;
			height: 84rpx;
			border-radius: 10rpx;
			margin-left: 40rpx;
		}
		.chat-one-mine .chat-face {
			margin-left: 0;
			margin-right: 40rpx;
		}
		.chat-box {
			max-width: calc(100% - 290rpx);
			margin-left: 20rpx;
			font-size: 30rpx;
		}
		.chat-one-mine .chat-box {
			margin-right: 20rpx;
		}
	
		.chat-content {
			background-color: #fff;
			border-radius: 5px;
			padding: 10px;
			.micon {
				margin-right: 20rpx;
				color: #666;
			}
		}
		.with_draw{
			color: #aaaaaa;
			font-size: 27rpx;
		}
		.chat-img {
			float: left;
			max-width: 50%;
			border-radius: 10rpx;
		}
		.chat-one-mine .chat-img {
			float: right;
		}
		
	}

	.chat-footer {
		width: 670rpx;
		padding: 0 40rpx;
		height: 120rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #f1f1f1;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		align-content: center;
		border-top: 1rpx solid #ddd;
		.msg-input {
			background-color: #fff;
			width: calc(100% - 200rpx);
			height: 70rpx;
			line-height: 70rpx;
			font-size: 30rpx;
			border-radius: 10rpx;
			padding: 0 20rpx;
		}
		.send-btn {
			height: 60rpx;
			line-height: 60rpx;
			width: 120rpx;
			text-align: center;
			background-color: $theme-color;
			color: #FFFFFF;
			border-radius: 12rpx;
		}
	}
}
</style>
