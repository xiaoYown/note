import Vue 				from 'vue';
import Vuex 			from 'vuex';

import middlewares 		from '../middlewares';

import user 			from '../modules/demo/user';

Vue.config.debug = true;
Vue.use(Vuex);
Vue.config.warnExpressionErrors = false;

const store = new Vuex.Store({
	modules: {
		user,
	},
    strict: process.env.NODE_ENV !== 'production',
    middlewares
});
export default store

