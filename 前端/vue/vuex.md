##mvvm(Model–view–viewmodel)
![](./images/mvvm.png)
>很容易从图中看出,model不能直接与view进行通信 , 而是由vm进行业务逻辑的处理后由vm与view进行通信 . 这样做的一个好处是将不同的model交给不同的vm处理 , 从而避免了不同业务代码的集中 . 缺点是业务逻辑都交给了vm , 当代码维护时间长久 , model势必会越来越庞大  , vm 中的属性和方法也会越来越多 , 增加了代码的复杂度 .

 ![](./images/vue-mvvm.png)
>vue与mvvm
> model ---- 数据来源
> viewmodel ---- vue实例
> view ---- template

##vuex
####vuex是什么
>Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 devtools extension，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。
####什么是“状态管理模式”？
其实一个vue的实例就是一个通过状态管理的模式进行数据管理的 .
```javascript
new Vue({
  // state
  data () {
    return {
      count: 0
    }
  },
  // view
  template: `
    <div>{{ count }}</div>
  `,
  // actions
  methods: {
    increment () {
      this.count++
    }
  }
})
```
>这个状态自管理应用包含以下几个部分：
state，驱动应用的数据源；
view，以声明方式将state映射到视图；
actions，响应在view上的用户输入导致的状态变化。
这是一个单一组件的状态管理方式 , 但是当我们嵌套了多层组件 , 难以实现state的共享该怎么么办 ? 是否可以将共享的状态提取到全局 , 供 root 下的所有组件共享 , 实现一处操作 , 多方位同步 ? 答案是肯定的 . vuex就是专门为此设计.

![](./images/vuex.png)
>从图中可以看到vuex单向数据流工作模式 . 

####vuex的使用
入口文件的定义
```javascript
// 路由状态同步
import { sync } 	from 'vuex-router-sync';
// 引入状态存储文件
import store 		from 'Store/demo';
```
创建store实例
```javascript
import Vue 				from 'vue';
import Vuex 			from 'vuex';
// 调试中间件引入
import middlewares 		from '../middlewares';
// 引入use,demor状态
import user 			from './modules/user';
import demo 			from './modules/demo';

Vue.config.debug = true;
// 模块化管理中需要使用use的方式使用vuex插件
Vue.use(Vuex);
// 创建store实例
const store = new Vuex.Store({
    // store模块 , 将store进行分割 , 进行局部的状态控制
	modules: {
		user,
		demo,
	},
    strict: process.env.NODE_ENV !== 'production',
    middlewares
});
export default store
```
store的user模块
```javascript
// 记录操作类型
import * as types 						from './types';
// 核心 state/mutations/actions
// state ---- 唯一数据源。单一状态树让我们能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照。
// mutations ---- 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutations 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数 .
// Action 类似于 mutation，不同在于：Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作。
const state = {
    userInfo: {},
};
const mutations = {
    // 使用常量替代 mutation 事件类型在各种 Flux 实现中是很常见的模式。这样可以使 linter 之类的工具发挥作用，同时把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的 mutation 一目了然
	[types.SAVE_USER_INFO]( state, payload ) {
    	// 为确保数据的渲染 ， 新增属性时使用Vue.set( obj, attrName, value ) ， 替换久属性时使用 =
		state.userInfo = payload.data;
	},
};

const actions = {
	saveUserInfo: ({ commit }, param) => {
		commit(types.SAVE_USER_INFO, param);
	},
};
export default {
    state, mutations, actions
};

```
>强调，我们通过提交 mutation 的方式，而不是直接的操作state，是因为我们想要更明确地追踪到状态的变化。这个简单的约定能够让你的意图更加明显，这样你在阅读代码的时候能更容易地解读应用内部的状态改变。此外，这样也让我们有机会去实现一些能记录每次状态改变，保存状态快照的调试工具。有了它，我们甚至可以实现如时间穿梭般的调试体验。
> 由于 store 中的状态是响应式的，在组件中调用 store 中的状态简单到仅需要在计算属性中返回即可。触发变化也仅仅是在组件的 methods 中提交 mutations。

实例中使用 vuex
```javascript
import { mapState, mapActions, mapMutation }
// 派生state
computed: {
    userInfo: state => state.user.userInfo
},
methods: {
    ...mapActions(['saveUserInfo']),
    // 不建议在实例中直接调用mutations , 容易造成state控制的混乱 ， 只在辅助是使用 。    
    ...mapMutations(['someMutations'])
}
```







