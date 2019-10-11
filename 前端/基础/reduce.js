// reduce 收敛

[1, 2, 3].reduce((prev, next, index, current) => {
  return prev + next;
}, 0);

// 数组扁平化
function flat (prev, next) {
  if (next.constructor === Array) {
    return next.reduce(flat, prev);
  } else {
    prev.push(next);
    return prev;
  }
}
let arr = [1, [2, [3, [4, [5]]]]].reduce(flat, []);

console.log(arr);

// 实现 redux compose

// function compose (...fns) {
//   return fns.reduce((prev, next) => {
//     return function (...args) {
//       return prev(next(...args));
//     }
//   })
// }

let compose = (...fns) => fns.reduce((prev, next) => (...args) => prev(next(...args)))

// 箭头函数 1. 没有 this, 没有 arguments, 没有 prototype, 不能 new
