<template>
	<view>
		<!-- 头像部分 -->
		<view class="v_hand">
			<view class="box">
				<view @tap="toSeeUserImages()">
					<image :src="avatar" mode="aspectFill"></image>
				</view>
				<view>
					<view class="username">{{username}}</view>
				</view>
			</view>
		</view>

		<view class="v_mid_title">
			<view>
				账号管理
			</view>
		</view>

		<view class="v_tool">
			<view class="box">
				<view class="for" @tap="toAddFriend()">
					<view>添加好友</view>
				</view>
				<view class="for" @tap="Jump()">
					<view>退出登录</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapActions
	} from 'vuex'
	export default {
		data() {
			return {
				username: "请先登录",
				avatar: uni.$u.http.config.defaultHeadURL,
			}
		},
		onShow() {
			// 获取用户信息
			this.$u.api.Me.userInfo({
				opt_type: 1,
			}, {
				custom: {
					'auth': true
				}
			}).then(res => {
				console.log(res)
				if (res.status == 0) {
					this.username = res.data.user_name
					this.avatar = res.data.avatar
				} else if (res.status == 50000) {
					uni.showToast({
						title: "服务器内部错误",
						icon: "none"
					})
				}
			}).catch(err => {
				console.log("login in err: ", err)
				uni.showToast({
					title: "服务器内部错误",
					icon: "none"
				})
			})
		},
		methods: {
			...mapActions(['userLogoutAction']),
			toAddFriend:function(){
				uni.showToast({
					title: "待开发，敬请期待",
					icon: "none"
				})
			},
			Jump: function() {
				uni.showModal({
					title: "询问",
					content: "确定退出吗？",
					confirmColor: "#DD524D",
					success: res => {
						if (res.confirm == true) {
							this.userLogoutAction();
							uni.redirectTo({
								url: "/pages/loginbox/sign_in/sign_in"
							})
						}
					}
				})
			},
			// 预览头像
			toSeeUserImages: function() {
				// uni.showToast({title:"长按修改头像",icon:"none",mask:true}) 
				var that = this
				var nowPhoto = that.userpic
				var imageList = [nowPhoto]
				uni.previewImage({
					current: nowPhoto,
					urls: imageList,
					indicator: 'number',
					longPressActions: {
						itemList: ['保存图片'],
						itemColor: '#417fca',
						success: function(data) {
							that.toDownImages(imageList[data.index])
						}
					}
				});
			}
		},
	}
</script>

<style lang="scss" scoped>
	/* 头像start */
	.v_hand {
		width: 100%;
		height: 350rpx;
		background-color: $theme-color;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.v_hand .box {
		width: 700rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.v_hand .box view image {
		width: 130rpx;
		height: 130rpx;
		border-radius: 50%;
	}

	.v_hand .box view .username {
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-size: 35rpx;
		margin-top: 20rpx;
	}

	/* 头像end */



	/* 中间标题start */
	.v_mid_title {
		width: 100%;
		height: 50rpx;
		margin: 20rpx 0rpx;
		display: flex;
		justify-content: start;
		align-items: center;
	}

	.v_mid_title view {
		width: 90%;
		height: 100%;
		margin: 0 auto;
		font-size: 35rpx;
		font-weight: 560;
		display: flex;
		align-items: center;
		padding-left: 20rpx;
		border-left: 10rpx solid $theme-color;
	}

	/* 中间标题end */


	/* 工具start */
	.v_tool {
		width: 100%;
		margin: 20rpx 0rpx;
	}

	.v_tool .box {
		margin: 0rpx auto;
		width: 90%;
		border-radius: 15rpx;
		padding: 25rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		box-shadow: 1px 2px 4px #555555;
	}

	.v_tool .box .for {
		width: 100%;
		height: 80rpx;
		border-bottom: 1rpx solid #dddddd;
		display: flex;
		flex-direction: row;
		align-items: center;

	}

	.v_tool .box .for view:nth-child(1) {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.v_tool .box .for view:nth-child(1) image {
		width: 40rpx;
		height: 40rpx;
	}

	.v_tool .box .for view:nth-child(2) {
		flex: 9;
		padding-left: 20rpx;
		position: relative;

		.red-point-box {
			position: absolute;
			border-radius: 50%;
			top: -5rpx;
			right: 390rpx;
			width: 20rpx;
			height: 20rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			.red-point {
				background-color: #ff0000;
				border-radius: 50%;
				width: 20rpx;
				height: 20rpx;
			}
		}
	}

	.v_tool .box .for view:nth-child(3) {
		flex: 1;
	}

	.v_tool .box .for view:nth-child(3) image {
		width: 35rpx;
		height: 35rpx;
	}

	/* 工具end */
</style>
