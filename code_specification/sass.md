## 样式

样式文件不再直接写在 vue 文件中, 文件中标注使用的scss文件位置
```
// @import "@/assets/test.scss"
```

>注意不要使用单组件或内部组件样式. 公用样式提取到sass文件中, 父组件可控制其子组件样式, 单不可使用其子组件样式
(webpack后模块引入均采用异步实现, 若是使用的 class 来源于未加载组件, 则样式不可见, 可能会导致不可直接观察到的样式问题)

####1.sass 目录结构
root: @/assets/sass

```
.           

├── components          // @/components 中组件的样式文件, 目录结构同组件
├── mixin               // 基本样式存放文件夹
│   ├── reset.scss      // 样式重置文件
│   ├── theme.scss      // 项目颜色管理文件
│   ├── ui.scss         // 项目全局使用 class, 例如 滚动条样式
│   ├── transition.scss // 一些基本过渡效果样式(不存放特定过渡效果)
│   └── base.scss       // 基本样式(所有页面样式入口文件都需引入), 引入 ./mixin 中所有文件作
├── index               // 首页样式存放文件夹
│   ├── main.scss       // 页面样式入口, 当前文件夹下所有样式的集合, 不直接编写样式, 对应的页面入口 js 文件引入
│   ├── mixin           // 当前页面私有组件, 跨路由使用的组件样式
│   │   ├── nav.scss
│   │   ├── ...
│   ├── library
│   │   ├── main.scss   // index 页面下路由分页, 样式入口文件, 当前文件夹下所有样式的集合, 可直接编写当前页面布局样式
│   │   ├── menu.scss
│   │   ├── ...
│   ├── myReports
│   │   └── ...
├── edit
│   └── ...
└── ...
.
```

####2.样式命名
```
布局(g): 以 g 为命名空间
  例: .g-wrap , .g-header, .g-content.
-------------------------------------------------------------
状态(s): 以 s 为命名空间, 表示动态的, 具有交互性质的状态
  例: .s-active,  s-selected.
-------------------------------------------------------------
工具(u): 以 u 为命名空间, 表示不耦合业务逻辑的, 可复用的工具
  例: u-clearfix, u-ellipsis.
-------------------------------------------------------------
组件(m/p): 与业务逻辑耦合的组件
  复用: 以 m 为命名空间, 表示可复用, 移植的组件模块
    例: m-slider.
  ----
  非复用: 以 p 为命名空间, 表示私有组件, 仅单一位置使用
    例: p-format, p-sidebar
-------------------------------------------------------------
钩子(j): 以 j 为命名空间, 表示特定给 JavaScript 调用的类名
  例: j-request, j-open.
  -------------------------------------------------------------
钩子(global): 以 j 为命名空间, 表示特定给 JavaScript 调用的类名
  例: global-button, global-select.
```

####3.避免通用的 class 写在全局
例: s-hover, s-focus, s-active, s-link, s-visited, ...
使用: .u-button.s-active
该类型样式仅在 **特定元素对应状态** 下生效

####4.根据属性的重要性按顺序书写
> 只遵循横向顺序即可，先显示定位布局类属性，后盒模型等自身属性，文本类属性, 修饰类属性

|显示属性|自身属性|文本属性|修饰属性|
|----|----|----|----|
|display|width|color|background|
|visibility|height|font-size|transition|
|position|padding|text-align|animation|
|float|margin|line-height|-|
|top|border|text-decoration|-|