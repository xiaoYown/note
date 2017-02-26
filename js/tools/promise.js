/** 
 * Promise: 就是一个对象，用来传递异步操作的消息.
 * 			它代表了某个未来时刻才会知道结果的事件(通常是一个异步操作), 并且这个事件提供统一的 API,可供进一步处理.
 * 两大特点
 * 1.对象状态不受外来影响
 *  	
 * 		states:
 * 			Pending(进行中)
 * 			Resolved(已完成 , 又称Fulfilled)
 * 			Rejected(已失败)
 * 2.一旦状态改变,就不会再变,任何时刻都可以得到这个结果.
 * 		两种状态变化可能:
 * 			Pending -> Resolved
 * 			Pending -> Rejected
 * 		状态一旦改变.就凝固.
 * 缺点: 
 *		1. 一旦新建,立即执行, 无法中途取消. 
 * 		2. 若不设置回调,Promise 内部抛出的错误,不会反映到外部. 
 * 		3. 处于Pending 状态时, 无法得知目前进展到哪一个阶段.
 */

// Promise.resolve()
// Promise.reject()
// Promise.prototype.then()
// Promise.prototype.catch()
// Promise.all() // 所有的完成
// Promise.race() // 竞速，完成一个即可

var promise = new Promise(function(resolve, reject) {
	if (/* 异步操作成功 */){
		resolve(value);
	} else {
		reject(error);
	}
});

promise.then(function(value) {
	// success
	}, function(value) {
	// failure
});
