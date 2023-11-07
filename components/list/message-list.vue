<template>
	<view class="boxx">
		<view class="box">
			<view class="image">
				<image :src="Icon?Icon:'http://pre.static.xyhsn.com/uploaded/default_icon.jpg'">
				<view class="point" v-if="item.count>0">
					{{item.count_str}}
				</view>
			</view>
			<view class="right">
				<view class="right-top">
					{{UserName?UserName:'好友'}}
				</view>
				<view class="right-bottom">
					{{Desc?Desc:''}}
				</view>
			</view>
			<view  class="time">
				<view class="time_right">
					{{item.time_str}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"message-list",
		props:['item'], 
		data() {
			return {
			}
		},
		computed:{
			UserName(){
				return this.item.name.length>15?this.item.name.substring(0,15)+"..." : this.item.name
			},
			Icon(){
				return this.item.avatar
			},
			Desc(){
				return this.item.desc.length>15?this.item.desc.substring(0,15)+"..." : this.item.desc
			}
		}
	}
</script>

<style scoped lang="scss">
.boxx{
	border-top: 3rpx solid #eee;
	border-radius: 10rpx;
	width: 100%;
	height: 120rpx;
	// background-color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	// background-color: pink;
	.box{
		width: 90%;
		height: 100rpx;
		display: flex;
		align-items: center;
		// background-color: #00ffff;
		.image{
			flex: 2;
			width:100rpx;
			height: 100rpx;
			border-radius: 50rpx;
			position: relative;
			image{
				width:100rpx;
				height: 100rpx;
				border-radius: 50rpx;
			}
			.point{
				position: absolute;
				top: 0rpx;
				right: 20rpx;
				border-radius: 50rpx;
				background-color: red;
				color: white;
				font-weight: 550;
				width: 32rpx;
				height: 32rpx;
				font-size: 15rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				
			}
		}
		.right{
			flex: 7;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: space-between;
			.right-top{
				font-size: 29rpx;
				height: 50rpx;
			}
			.right-bottom{
				color: #aaa;
				font-size: 27rpx;
				height: 30rpx;
			}
		}
		.time{
			flex: 3;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			.time_right{
				font-size: 22rpx;
				color: #aaa;
			}
		}
	}
}
</style>