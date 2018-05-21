## vue 文件
>详细说明可查看 [Vue风格指南](https://cn.vuejs.org/v2/style-guide)

#### 1.组件/实例的选项顺序

- name
- components / directives / filters
- extends / mixins
- model / props / propsData
- data / computed
- watch / 生命周期钩子
- methods

#### 2.元素特性的顺序

- is
- v-for / v-if / v-else-if / v-else / v-show / v-cloak
- v-pre / v-once
- id
- ref / key / slot
- v-model
- v-on
- v-html / v-text

#### 3.事件的控制

- 不要使用 this.$parent / this.$root 进行控制, 会导致流程难以跟踪. 可使用事件中心进行代替.
- 事件中心每添加事件, 需要注明事件的 名称 / 来源文件 / 流向文件, 以及事件的作用.
- 事件移除时需要移除事件中心对应事件注明.
- 组件当中有原生绑定事件, 注意在组建注销前进行移除

#### 4.编写组件的一些注意事项
1) props: 指定入参类型
```javascript
// bad
props: ['status']
// good
props: {
  status: String
}
```
2) v-for: 设置键值
```html
<li v-for="todo in todos">
  {{ todo.text }}
</li>
```
3) 私有属性名
>在插件、混入等扩展中始终为自定义的私有属性使用 $_ 前缀。并附带一个命名空间以回避和其它作者的冲突 (比如 $_yourPluginName_)
```
methods: {
  $_myGreatMixin_update: function () {
  }
}
```
4) 紧密耦合组件名
>如果一个组件只在某个父组件的场景下有意义，这层关系应该体现在其名字上。因为编辑器通常会按字母顺序组织文件，所以这样做可以把相关联的文件排在一起
```
components/
|- TodoList.vue
|- TodoListItem.vue
|- TodoListItemButton.vue
```
5) 组件名大小写
>组件名应该始终是 PascalCase
```
export default {
  name: 'MyComponent',
  // ...
}
```
6) props 名大小写
>在声明 prop 的时候，其命名应该始终使用 camelCase，而在模板中应该始终使用 kebab-case
```
// js
props: {
  greetingText: String
}
// html
<WelcomeMessage greeting-text="hi"/>
```
7) 多特性元素
>多行分隔对象的多个属性, 使模板易读
```
<MyComponent
  foo="a"
  bar="b"
  baz="c"
/>
```
8) 单文件顶级元素顺序
```html
<template>...</template>
<script>/* ... */</script>
<style>/* ... */</style>
```