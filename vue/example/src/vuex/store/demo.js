import Vue 				from 'vue';
import Vuex 			from 'vuex';

import middlewares 		from '../middlewares';
import demo 			from '../modules/demo';

Vue.config.debug = true;
Vue.use(Vuex);
Vue.config.warnExpressionErrors = false;

const store = new Vuex.Store({
	modules: {
		demo,
	},
    strict: process.env.NODE_ENV !== 'production',
    middlewares
});
export default store

