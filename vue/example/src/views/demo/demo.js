import Vue 			from 'vue';
import VueRouter 	from 'vue-router';
import VueResource  from 'vue-resource';
import { sync } 	from 'vuex-router-sync';

import App 			from './app.vue';
import lazy 		from 'vue-lazy-component';
import { getCookie } from 'tools/client';
import store 		from 'vueX/store/demo';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(lazy);

const routes = [
	{ 	path: '/', 	
		name: 'demo',
		component: require('./views/index.vue'),
		meta: {
			user: true
		},
	},
	{ 	path: '/foo',
		name: 'sdemo-foo',
		component: require('./views/foo.vue'),
		meta: {
			user: true
		},
	},
	{ 	path: '/bar', 	
		name: 'demo-bar',
		component: require('./views/bar.vue'),
		meta: {
			user: true
		},
	},
	{ 	path: '/login', 	
		name: 'login',
	},
	{ 	path: '*', 	
		component: require('Views/404.vue'),
	},
];

const router = new VueRouter({
	routes,
});

router.beforeEach(({meta, path}, from, next) => {
	let sessionId = getCookie('session');
	if( !!sessionId || !meta.user ){
		return next();
	} else {
		window.location.href = "index.html#/login";
		return
	}
	next();
});

new Vue({
	el: '#page-demo',
	router,
	store,
	...App,
});