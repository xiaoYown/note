// 默认 js 执行栈会开启一个

// 微任务：then  MutationObserver(监控dom 变化 等待本轮dom变化完成后会执行)
// 宏任务 ie下有的setImmediate  setTimeout (MessageChannel)

// 当script 执行完毕后 会先将微任务队列清空，清空后 会执行宏任务
// 微任务清空后，会取出一个宏任务执行，宏任务执行完毕会再次清空微任务，无线循环
// 这个过程是无限的 浏览器关闭后就销毁了