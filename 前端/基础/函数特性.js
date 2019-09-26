// console.log(19)
// var a = { a: 1 }
// console.log(new Set([a, a]).values())

// let map = new Map();
// map.set('a', 10);
// map.set({ b: 10 }, 100);

// map.get('a');
// console.log(map.get({ b: 10 }))

// map.forEach((item, key) => {
//   console.log(key, item)
// })

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
  hash.set(obj, cloneObj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 做一个映射关系, 存起来
      // 数据结构 队列 栈 链表 集合set hash表 树 图
      cloneObj[key] = cloneDeep(obj[key], hash);
    }
  }
  return cloneObj;
}
var b = { a: 7, c: { b: 10 } };
var a = cloneDeep(b);