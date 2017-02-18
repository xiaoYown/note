import Vue 			from 'vue';
import VueRouter 	from 'vue-router';
import VueResource 	from 'vue-resource';
import { sync } 	from 'vuex-router-sync';		//同步vuex与路由的状态

import {getCookie}  from 'tools/client';

import App 			from './app.vue';
import store 		from 'vueX/store/index';


Vue.use(VueRouter);
Vue.use(VueResource);

const routes = [
	{ 	path: '/',
		component: require('Views/index/index.vue'),
		name: 'index',
		meta: {
			user: true
		}
	},
	{ 	path: '/login', 	
		component: require('components/login.vue'), 
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
	if( !!sessionId ){
		return next();
	} else if( meta.user && path != '/login' ) {
		return next({path: '/login'});
	}
	next();
});

new Vue({
	el: '#page-home',
	router,
	store,
	...App
});