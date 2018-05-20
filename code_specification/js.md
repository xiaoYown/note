## js 文件

#### 1.文件均采用 utf-8 编码
#### 2.vue 风格为不使用分号作语句结束
#### 3.垂直占位
  空行出现在以下位置:
  1) 类/对象 中连续的方法
      例外: 两个连续属性的空行定义是可选的, 可根据空行创建字段的逻辑分组.
  2) 在函数主体中, **不允许函数体 开始/结尾 处空行**.
  3) 在 类/对象 第一个方法之前/最后一个方法之后 空行.(该空行为可选)

#### 4.水平占位
  1) 对齐占位: 符采用 2 空格缩进, 不使用 tab 缩进
  2) 语句占位
  ```
  // if 语句
  if (true) {
  ...
  } else {
    ...
  }
  // for 语句
  let i = 0
  let len = 10
  for (; i < len; i++) {
    ...
  }
  // switch 语句
  switch (type) {
    ...
  }
  // 函数
  function fn () {
    ...
  }
  // 注释
  const NUMS = 10 // 
  // 运算符
  num = a + b / 10
  ```

#### 5.变量定义尽量不要放在一行内
```
// bad
  let a = 10
  let b = 10
// good
  let a = 10, b = 10
```

#### 6.注释
```
单行注释:
  var a = 10 // 解释
多行注释(遵循JSDoc注释):
  /**
   * Book类，代表一个书本.
   * @constructor
   * @param {string} title - 书本的标题.
   * @param {string} author - 书本的作者.
   */
```

#### 7.基本类型数据常量名使用 全大写 + 下划线
```javascript
const NUMBER = 10
const USER_NAME = 'user'
const BuildingInformation = {
  BUILDING_NAME: '九洲电器大厦',
  STREE: '科技南十一路'
}
```

#### 8.方法编写
  1) 避免单个方法过长
  2) 方法作用范围针对当前实例, 超出范围采用通知的形式
  3) 按事务编写方法, 不要集中处理:
  ```javascript
  {
    queryUserInfo () { // 请求用户信息数据
      ...
    },
    modifyUserState () { // 修改用户信息
      ...
    }
  }
  ```

#### 9.函数编写
  通用性的函数提取到 @/tools 文件夹下, 非通用直接在当前文件中编写


#### 10.类的编写(根据需求编写)
  确定需要使用到类的特性, 多处存在相同的应用场景


#### 11.保证代码的可读性
  1) 变量名: 名称定义尽量清晰, 避免模糊, 注释描述清晰
  ```javascript
  // bad
  let info = ...
  // good
  let userInfo = ... // 用户信息数据, 当前用户信息展示数据源
  ```
  2) 函数: 名称直接描述所执行的事务, 避免模糊. 注释描述清晰
  ```javascript
  /**
 * 对收到的信息进行处理.
 *
 * @param {string} message - 信息内容
 * @returns {String} 过滤后的信息内容
 */
  function handleReceiveMessage (message) {
    let result = ''

    if (typeof message === 'string') {
      result = message.replace(reg, '')
    } else {
      ...
    }
    return result
  }

  ```
  3) 自己在修改旧文件时, 发现可以提升可读性的代码, 在影响不大的前提下, 直接修改
  4) 每完成一个任务时, 读一遍自己写的代码, 确保代码可读性

