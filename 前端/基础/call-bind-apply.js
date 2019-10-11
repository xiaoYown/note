// // call(同 apply) - 1. 改变 this 指向 2. 让函数执行

// function fn (a, b) {
//   console.log(this, a, b);
// }
// function fn1 () {
//   console.log('fn1');
// }
// Function.prototype.call = function (context, ...args) {
//   context = context ? Object(context) : window;
//   console.log(this)
//   context.fn = this;

//   context.fn(...args);
//   delete context.fn;
// }
// // fn.call.call.call(fn1);
// fn.call(1, 2, 3);

// bind 绑定 this
function fn1 () {
  console.log(this);
}
Function.prototype.bid = function (context) {
  let _this = this;
  return function () {
    _this.apply(context);
  }
}
let bindFn = fn1.bind(1);
let fn = bindFn.bind(2);

fn(); // 多次 bind 只能执行一次(首次绑定)