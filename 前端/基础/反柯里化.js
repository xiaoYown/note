// 1. 反柯里化 柯里化的作用 教研类型 checkType isString isNull
// 反柯里化 目的是扩大函数的作用范围

// let r = Object.prototype.toString.call({ name: 'xx' });

// console.log(r)

// function uncurring (fn) {
//   return function (context) {
//     return fn.call(context);
//   }
// }

// let toString = toString(Object.prototype.toString);

// let r = toString({ name: 'xx' });

// console.log(r)

// function uncurring (fn) {
//   return function (context, ...args) {
//     return fn.call(context, args);
//   }
// }

// let join = uncurring(Array.prototype.join);

// let r = join([1, 2, 3], ':'); 

// console.log(r)

function uncurring (fn) {
  return function (context, ...args) {
    // 改变 this, 让函数执行, 把参数传入
    // 将 fn 执行, 并将后续参数传递给 apply 方法
    return Reflect.apply(fn, context, args);
    // Function.prototype.apply = function (context, args) {
    //   context.fn(...args);
    // }
    // return Function.prototype.apply.call(fn, context, args);
  }
}

let join = uncurring(Array.prototype.join);

let r = join([1, 2, 3], ':'); 

console.log(r)