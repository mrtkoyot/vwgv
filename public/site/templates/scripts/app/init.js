'use strict';

// Set up our requirements
//----------------------------------

import Vue from 'vue'
import store from './store'


// Create Vue Instance
//----------------------------------

new Vue({


	el: '#app',


	data: {
		message: 'Hello Vue.js!',

	},


    methods : {

        increment: store.actions.increment,

        decrement: store.actions.decrement,

    },


    computed : {

        // bind to state using computed properties
        count: function() {

            return store.state.count;

        }

    },

})


