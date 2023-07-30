<template>
	<view style="padding: 20px;">
			<u-button type="primary" text="确定"></u-button>
			<u-button type="primary" :plain="true" text="镂空"></u-button>
			<u-button type="primary" :plain="true" :hairline="true" text="细边"></u-button>
			<u-button type="primary" :disabled="disabled" text="禁用"></u-button>
			<u-button type="primary" loading loadingText="加载中"></u-button>
			<u-button type="primary" icon="map" text="图标按钮"></u-button>
			<u-button type="primary" shape="circle" text="按钮形状"></u-button>
			<u-button @tap="test" text="渐变色按钮" color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"></u-button>
			
		</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	export default {
		data() {
			return {
				disabled: true,
				name:'默认'
			};
		},
		computed:{
			...mapGetters(['getName'])
		},
		onLoad(){
			console.log('-------------------')
			console.log(uni.$u.http.config.baseURL)
			this.name = this.getName
			console.log(uni)

		},
		methods:{
			test(){
				this.$u.api.loading.fanyi({name:'huige'},{
						header: {laa:'huigege'},params:{age:18}
					}).then(res => {
					console.log('-----------success-----------')
					console.log(res.data)
				}).catch(err => {
					console.log('-----------error-----------')
					console.log(err)
				})
			}
		}
	};
</script>

<style>
	
</style>
