### let, const

作用域: window | function | with

var :

```
1. 污染全局
2. 预先定义, 变量提升
3. 可被定义多次, 变量覆盖
4. 无法声明常量
5. 默认不会产生作用域
```

let:

```
1. 不会污染全局
2. 不存在变量提升
3. 不能被重复定义
4. let + {} 可以产生一个作用域
```

### 深拷贝

```
JSON.parse(JSON.stringify(obj)) - 不支持函数, 日期, 正则, undefined
```

```javascript
function cloneDeep (obj, hash = new WeakMap()) {
  // 过滤 null 和 undefined
  if (obj === null || obj === undefined) {
    return obj;
  }
  // 过滤基本类型
  if (typeof obj !== 'object') {
    return obj;
  }
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  if (obj instanceof Date) {
    return new Date(obj);
  }
  let val = hash.get(obj);
  if (val) {
    return val;
  }
  let cloneObj = new obj.constructor;
  // 做一个映射关系, 存起来
  // 数据结构 队列 栈 链表 集合set hash表 树 图
  hash.set(obj, cloneObj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = cloneDeep(obj[key], hash);
    }
  }
  return cloneObj;
}

```

### set/map

set - 集合, 数组去重
map - hash 表

交集:

```
let s1 = new Set(arr1)
let s2 = new Set(arr2)

let intersection [...s1].filter(item => s2.has(item));
```

map:

```js
// WeakMap 不会导致内存泄露
let map = new Map();
map.set('a', 10);
map.set({ b: 10 }, 100);

map.get('a');

WeakMap key 只能是一个对象
```

### defineProperty

```js
let obj = {}
Object.defineProperty(obj, 'name', {
  configurable: false, // 是否 可配置, 可删除
  enumerable: true, // 可枚举
  get (val) {
    return val
  },
  set (newVal) {
    return newVal
  }
})
Object.freeze(obj) // 使对象不能增加 get set
Object.getOwnPropertyDescription(obj, 'name')
```

面试：
数据接触
proxy 代理
