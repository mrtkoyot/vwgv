// store.js
//----------------------------------

import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);


const state = {

	count: 0

}


const mutations = {

	INCREMENT (state) {
		state.count++
	},


	DECREMENT (state) {
		state.count--
	}

}


const actions = {

	increment: 'INCREMENT',

	decrement: 'DECREMENT'

}


export default new Vuex.Store({

	state,
	mutations,
	actions

})
