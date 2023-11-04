<template>
	<view class="boxx">
		<view class="box">
			<view class="image">
				<image :src="Icon?Icon:'http://pre.static.xyhsn.com/uploaded/default_icon.jpg'">
			</view>
			<view class="right">
				<view class="right-top">
					{{UserName?UserName:'好友'}}
				</view>
			</view>
			<view v-if="item.count>0" class="point">
				<view class="point_right">
					{{item.count_str}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"friend-list",
		props:['item'], // id avatar user_name
		data() {
			return {
			}
		},
		computed:{
			UserName(){
				return this.item.name.length>19?this.item.name.substring(0,19)+"..." : this.item.name
			},
			Icon(){
				return this.item.avatar
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
			image{
				width:100rpx;
				height: 100rpx;
				border-radius: 50rpx;
			}
		}
		.right{
			flex: 8;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: space-between;
			.right-top{
				font-size: 29rpx;
				height: 50rpx;
			}
		}
		.point{
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			.point_right{
				border-radius: 50rpx;
				background-color: red;
				color: white;
				font-weight: 550;
				width: 50rpx;
				height: 50rpx;
				font-size: 27rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}

		}
	}
}
</style>