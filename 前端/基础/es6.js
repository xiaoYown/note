// # 数据劫持
// let obj = {
//   name: 'hh'
// }
// function update (key) {
//   console.log('update ' + key)
// }

// function observe (obj) {
//   if (typeof obj !== 'object') {
//     return
//   }
//   for (let key in obj) {
//     defineReactive(obj, key, obj[key])
//   }
// }

// function defineReactive (obj, key, value) {
//   observe(value);
//   Object.defineProperty(obj, key, {
//     enumerable: true,
//     configurable: true,
//     get () {
//       return value;
//     },
//     set (newVal) {
//       // update value
//       update(key)
//       value = newVal;
//     }
//   })
// }
// observer(obj);
// obj.name = 'p'

// proxy 代理
// 缺点 兼容性差

// 如果是循环代理, 先代理外层
let obj = {
  name: 'hh',
  info: {
    age: 10
  }
}

let handler = {
  set (target, key, value) {
    // target[key] = value;
    if (key === 'length') {
      return true;
    }
    // set 要求有返回值 (返回 boolean, 表示代理更新是否成功)
    let flag = Reflect.set(target, key, value);
    console.log(`proxy: ${key}`)
    return flag;
  },
  get (target, key) {
    // return target[key];
    if (typeof target[key] === 'object') {
      return new Proxy(target[key], handler);
    }
    return Reflect.get(target, key);
  }
}

let proxy = new Proxy(obj, handler);

proxy.name = 'jj'
console.log(proxy.name)
// 取值时进行代理
proxy.info.age = 9;
console.log(proxy.info.age)

let arr = [1, 2, 3]
let proxy_1 = new Proxy(arr, handler);
proxy_1.push(4);

// es6 模块
// esModule es6模块 (import export) 静态模块
// commonjs 规范 node 的模块 (require module.exports) 动态模块
// requirejs AMD seajs CMD umd

// es6
export const a = 9
// 等价于
const a = 9
const c = 10
export {
  a,
  c as default // 把 c 作为默认值导出
}
// 整合导出 (不能使用 c, b 中的内容, 中途不能操作)
// 如果导出变量同名, 以第一个为准 (与对象优先级置后不同)
export * from './c';
export * from './b';
export { d } from './c';
