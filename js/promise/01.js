/*
	( 以下说明来自简书 )
	Promise 对象有以下两个特点:

		1.对象的状态不受外界影响。
			Promise 对象代表一个异步操作，有三种状态：
				Pending(进行中)
				Resolved(已完成，又称 Fulfilled)
				Rejected(已失败)。
				只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。

		2.一旦状态改变，就不会再变，任何时候都可以得到这个结果。
			Promise 对象的状态改变，只有两种可能：
				Pending -> Resolved 
				Pending -> Rejected
				只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果。
				就算改变已经发生了，你再对 Promise 对象添加回调函数，也会立即得到这个结果。
				这与事件(Event)完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

	Promise 也有一些缺点。
	1.无法取消 Promise，一旦新建它就会立即执行，无法中途取消。
	2.如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。
	3.当处于 Pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）

	Promise 构造函数接受一个函数作为参数，该函数的两个参数分别是
		resolve 方法
			如果异步操作成功，则用 resolve 方法将 Promise 对象的状态，从「未完成」变为「成功」（即从 pending 变为 resolved）；
		reject  方法
			如果异步操作失败，则用 reject 方法将 Promise 对象的状态，从「未完成」变为「失败」（即从 pending 变为 rejected）。

	基本的 api :

		Promise.resolve()
		Promise.reject()
		Promise.prototype.then()
		Promise.prototype.catch()
		Promise.all() // 所有的完成
		Promise.race() // 竞速，完成一个即可

*/
var colors = require('colors');

console.log('red'.red)

function runAsync(time){

	var p = new Promise(function(resolve, reject){
			//做一些异步操作
			setTimeout(function(){
				if( time % 2 === 1 ){
					reject( time );
				} else {
			    	resolve(time);
				}
			}, time);
		});

	return p;            
}

var pro_1 = runAsync(1001),
	pro_2 = runAsync(1200);

pro_1.then(function(data){
	console.log('success', data);
},function(data){
	console.log('fail', data);
});
// 异常捕获, 执行 reject 可捕获
pro_1.catch(function(err){
	console.log('pro_1 exception capture', err)
})

pro_2.then(function(data){
	console.log('success', data);
},function(data){
	console.log('fail', data);
});

Promise.race([pro_1, pro_2]).then(function(val){
	console.log(val);
}).catch(function(err){
	console.log('error', err);
});




