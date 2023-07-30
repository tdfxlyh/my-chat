<template>
	<view class="boxx">
		<!-- search -->
		<view class="search-box">
			<view class="search">
				<u-search placeholder="请输入关键字" v-model="searchVal" :clearabled="true" shape="square" :showAction="false"
					searchIconSize="45rpx" height="60rpx" color="#333"></u-search>
			</view>
		</view>

		<!-- 内容 -->
		<view class="box">
			<scroll-view scroll-y="true" class="scroll-Y">
				<view class="content">
					<view v-for="(item,index) in testPersonalListComp" :key="index">
						<FriendList :item='item' @tap='toChat(item.id)'></FriendList>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import FriendList from "@/components/list/friend-list.vue"
	export default {
		data() {
			return {
				current: 0,
				searchVal: "",
				testPersonalList: [{
						user_name: "常仔",
						avatar: "https://img2.baidu.com/it/u=2179862893,3843283184&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
					},
					{
						user_name: "常仔",
						avatar: "https://img2.baidu.com/it/u=2179862893,3843283184&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
					},
					{
						user_name: "飞哥",
						avatar: "https://img2.baidu.com/it/u=2179862893,3843283184&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
					},
					{
						user_name: "腾飞",
						avatar: "https://img2.baidu.com/it/u=2179862893,3843283184&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
					},
					{
						user_name: "辉辉",
						avatar: "https://img2.baidu.com/it/u=2179862893,3843283184&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
					},
				],
			}
		},
		components: {
			FriendList
		},
		onShow() {
			// 。。。
		},
		computed: {
			testPersonalListComp() {
				if (this.current == 0) {
					var searchVal = this.searchVal
					if (searchVal == '') {
						return this.testPersonalList
					} else {
						return this.testPersonalList.filter((temp) => {
							var tempData = temp.name + temp.username
							return tempData.indexOf(searchVal) !== -1
						})
					}
				}
			}
		},
		methods: {
			toChat: function(id) {
				// 跳转到
			}
		}
	}
</script>


<style scoped lang="scss">
	.boxx {
		background-color: #eeeeee;
		height: 100vh;

		.search-box {
			width: 100%;
			height: 100rpx;
			background-color: white;
			border-top: 1rpx solid #eee;
			display: flex;
			justify-content: center;
			align-items: center;

			.search {
				width: 85%;
				height: 80rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

		.box {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;

			.scroll-Y {
				width: 100%;
				height: 100%;
				background-color: #eeeeee;

				.content {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
