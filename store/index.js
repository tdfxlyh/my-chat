// 引入Vue及Vuex
import Vue from 'vue'
import Vuex from 'vuex'

// 引入基本模块
import state from './modular/state.js'
import mutations from './modular/mutations.js'
import actions from './modular/actions.js'
import getters from './modular/getters.js'


// 声明使用插件
Vue.use(Vuex) 


export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})
