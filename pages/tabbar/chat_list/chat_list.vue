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
					<view v-for="(item,index) in friendListDataComp" :key="index" @tap='toChat(item.id)'>
						<FriendList :item='item' :isChatList="true" ></FriendList>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import FriendList from "@/components/list/friend-list.vue"
	import compare from '@/utils/compare.js'
	export default {
		data() {
			return {
				current: 0,
				searchVal: "",
				friendListData: [{
						id: 3,
						name: "wxy",
						avatar: "https://img2.baidu.com/it/u=2179862893,3843283184&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
						pinyin:"w"
					},
				],
				// 定时器
				timeOut1:0,
			}
		},
		components: {
			FriendList
		},
		onShow() {
			var that = this
			that.getFriendList()
			that.timeOut1 = setInterval(()=>{
				console.log(334)
				// 获取用户信息
				that.getFriendList()
			},2000)
		},
		onHide(){
			console.log(443)
			clearInterval(this.timeOut1)
		},
		computed: {
			friendListDataComp() {
				if (this.current == 0) {
					var searchVal = this.searchVal
					if (searchVal == '') {
						return this.friendListData
					} else {
						return this.friendListData.filter((temp) => {
							var tempData = temp.name + temp.username
							return tempData.indexOf(searchVal) !== -1
						})
					}
				}
			}
		},
		methods: {
			toChat: function(id) {
				uni.navigateTo({
						url:  "/pages/other/chat/chat?other_user_id="+id
					}
				)
			},
			getFriendList:function(){
				// 获取用户信息
				this.$u.api.Friend.friendList({}, {
					custom: {
						'auth': true
					}
				}).then(res => {
					console.log(res)
					if (res.status == 0) {
						this.friendListData = res.data.msg_list.sort(compare('count', false))
					} else {
						uni.showToast({
							title: "服务器内部错误",
							icon: "none"
						})
					}
				}).catch(err => {
					uni.showToast({
						title: "服务器内部错误",
						icon: "none"
					})
				})
			},
		}
	}
</script>


<style scoped lang="scss">
	.boxx {
		// background-color: #eeeeee;
		// height: 100vh;
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
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			.scroll-Y {
				width: 100%;
				height: 100%;
				// background-color: #eeeeee;

				.content {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
