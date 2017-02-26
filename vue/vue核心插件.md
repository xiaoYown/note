##vue-router
####1.vue-router的简单使用
html
```html
<!-- a 跳转 -->
<router-link to="/foo">Go to Foo</router-link>
<router-link to="/bar">Go to Bar</router-link>
<!-- 路由出口 -->
  <router-view></router-view>
```
```javascript
// js 跳转`
this.$router.push({path: '/foo'})
```
js
```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'
//  定义路由
const routes = [
  { path: '/foo', component:  require('./foo.vue') },
  { path: '/bar', component: require('./bar.vue') }
]
//  创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
  routes
})

//  创建和挂载根实例
const app = new Vue({
  router
}).$mount('#app')
```
####2.动态路径参数
html 
```html
<!--a跳转-->
<router-link :to="{name: 'page', params{ page: 1 }">page 1</router-link>
<router-link :to="{name: 'page', params{ page: 2 }">page 2</router-link>
```
```javascript
// js 跳转
this.$router.push({name: 'page', params: {page: 1})
```
js
```javascript
// 路由设置
// 动态传参需要对路由进行标识
const router = new VueRouter({
  routes: [
    { 
        path: '/page/:index',
        // 多参数传入
        // path: '/page/:index/:id'
        name: 'page',
        component: require('./page.vue'), 
        }
  ]
})
// 组件参数获取
```