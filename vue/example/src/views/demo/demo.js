import Vue 			from 'vue';
import VueRouter 	from 'vue-router';
import VueResource  from 'vue-resource';
import { sync } 	from 'vuex-router-sync';

import App 			from './app-demo.vue';
import lazy 		from 'vue-lazy-component';
import { getCookie } from 'tools/client';
import store 		from 'vueX/store/demo';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(lazy);

const UserProfile = {
	template: '<p>children-1</p>',
};

const UserPosts = {
	template: '<p>children-2</p>',
};


const routes = [
	{ 	path: '/', 	
		name: 'demo',
		component: require('./views/index.vue'),
		meta: {
			user: true,
		},
	},
	{ 	path: '/foo',
		name: 'demo-foo',
		component: require('./views/foo.vue'),
		meta: {
			user: true,
		},
	},
	{ 	path: '/bar', 	
		name: 'demo-bar',
		component: require('./views/bar.vue'),
		meta: {
			user: true,
		},
	},
	{
		path: '/params/:name/:age',
		name: 'params',
		component: require('./views/params.vue'),
		meta: {
			user: true,
		},
	},
	{
		path: '/nested/:id',
		name: 'nested',
		component: require('./views/nested.vue'),
		meta: {
			user: true,
		},
		children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'profile',
          component: UserProfile
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'posts',
          component: UserPosts
        }
      ]
	},
	{ 	path: '/login', 	
		name: 'login',
	},
	{
		path: '/to:link',
		name: 'to',
		component: require('components/to.vue'),
		meta: {
			user: false,
		},
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