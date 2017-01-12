(function(modules) {
    window.define = function(chunkId, moduleName, moreModules) {
    	var callbacks = [];
        if (!modules[chunkId]) {
            modules[chunkId] = moreModules;
            modules[chunkId + '_id'] = moduleName;
        }
        if( modules[chunkId] ){
        	return require(chunkId)
        }
        return modules[chunkId];
    }
    var installedModules = {};

    function require(moduleId){
    	if(installedModules[moduleId])
 			return installedModules[moduleId].exports;

 		var module = installedModules[moduleId] = {
 			exports: {},
 			id: moduleId,
 			loaded: false
 		};
 		var module_list = [];
 		for( var key in modules[moduleId + '_id'] ){
 			module_list.push(modules[modules[moduleId + '_id'][key]]);
 			console.log(modules)
 		}
 		modules[moduleId].call(module_list);

 		module.loaded = true;

 		return module.exports;
    }
}([]));

define("module_a", [], function() {
    //module A
    var module_a = function(){
    	console.log('0')
    };
    return module_a
});

define("module_b", ['module_a', 'module_1'], function(module_a, module_1) {
	console.log(arguments)
    //module B
    var module_b = function(){
    	console.log('module_b');
    };
    return module_b

});