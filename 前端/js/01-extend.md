```javascript
// 定义extend 函数
var _extends = Object.assign || function (target) { 
	for (var i = 1; i < arguments.length; i++) { 
		var source = arguments[i]; 
		for (var key in source) { 
			if (Object.prototype.hasOwnProperty.call(source, key)) { 
				target[key] = source[key]; 
			} 
		} 
	} 
	return target; 
};
// 用法
var obj = _extends({}, _obj)
```