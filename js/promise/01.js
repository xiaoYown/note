function runAsync(content){
	var p = new Promise(function(resolve, reject){
	    //做一些异步操作
	    // setTimeout(function(){
	    //     resolve(content);
	    // }, 1000);
	    setTimeout(function(){
	        reject(content);
	    }, 2000);
	});
	return p;            
}
var pro = runAsync('content');

pro.then(function(data){
	console.log('success-'+data)
},function(data){
	console.log('fail-'+data)
})


