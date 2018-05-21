## 项目规范

#### 目录结构
```
.           
├── README.md           
├── .babelrc                                          // babel配置
├── build                                             // 环境配置文件
├── config                                            // 项目配置文件
├── dist                                              // build目录
└── src                                               // 开发文件目录
    ├── assets                                        // css 和图片资源
    ├── components                                    // 通用组件
    ├── pages                                         // html页面
    ├── tools                                         // 工具函数
    ├── store                                         // 状态文件, store, action, types
    └── views                                         // 页面组件目录(对应html的入口文件以及当前html的router)
        ├── index                                     // index 页面文件夹
        │   ├── index.js                              // index 页面入口文件
        │   ├── mixin                                 // 当前路由页面私有组件
        │   │   ├── simpleComponent.vue
        │   │   ├── complexComponent                  // 有强耦合子组件, 增加文件夹层级
        │   │   │   ├── complexComponent.vue
        │   │   │   ├── complexComponentChildren.vue
        │   ├── library
        │   │   ├── library.vue                       // index 页面下路由分页组件
        │   │   ├── mixin
        │   │   │   ├── userList.vue                  // 当前路由分页下私有组件, 复杂度高的组件可增加文件夹层级
        │   │   │   └── ...
        │   │   ├── ...
        │   ├── myReports
        │   │   └── ...
        ├── edit
        │   └── ...
        ├── banber
        │   └── ...
        ├── user
        │   └── ...
        ├── manage
        │   └── ...
        ├── dataset
        │   └── ...
        └── wechat
            └── ...
.
```

#### 接口管理
>所有的接口放置于 @/assets/js/interface 文件夹下， 接口按照页面进行管理.

1) 防止同一接口多处使用, 减少修改时的复杂度
2) 避免接口可能使用字符串进行拼接, 便于查找接口使用位置
3) 方便查询在使用接口
4) 为接口存在版本号做准备

#### 项目版本
合并 master 前, 注意修改版本号.(先拉取合并后修改)
(1) 大版本更新
(2) 功能更新
(3) 补丁更新