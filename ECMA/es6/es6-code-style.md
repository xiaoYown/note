##ES6编程风格
>学习es6编程风格的主要目的是为了写出合理的。易于阅读和维护的代码。有很多公司都已经公开其风格规范，以下内容主要参考了[Airbnb](https://github.com/airbnb/javascript)

####块级作用域
>let 取代 var
```javascript
"use strict";
console.log(x); // ReferenceError (若是var,则是undefined,不会报错. let避免var的变量提升)
let x = 10;
```
 全局常量和线程安全，在let和const之间，优先使用const，尤其是在全局环境，不应使用设置变量。这符合函数式编程思想，有利于将来的分布式运算。
用const声明常量还有两大好虎，一是阅读代码的人立刻意识到不应修改这个值，而是防止了无意间修改变量值导致错误。
所有的函数都应设置为常量。
let表示的变量只应出现在单线程运行的代码中，不能提供多线程共享，这样有利于保证线程安全。
>V8引擎只在严格模式下支持let和const。

####字符串
>静态字符串一律使用单引号或反引号，不使用双引号。动态字符串使用反引号。
```javascript
const a = 'hello';
const b = `${a} world`;
```
####解构赋值
（以下情况优先使用解构赋值）
>使用数组成员对变量赋值
```javascript
const arr = [1,2,3,4];
const [first, second] = arr;
```
>函数的参数如果是对象的成员
```javascript
function getInfo({name, age}){
    // use name and age ...
}
```
>函数返回多个值
```javascript
const {name, age} = getInfo(user); // return {name, age}
```
####对象
>单行定义的对象最后一个成员不以逗号结尾，多行定义对象以逗号结尾。
```javascript
const a = {a: a, b: b};
const b = {
    a: a,
    b: b,
}
```
>对象尽量静态化，一旦定义，不得随意添加新的属性。如果添加新的属性不可避免，要使用Object.assign(对象扩展,rest运算符添加的属性转码后会通过extend方式解决兼容性问题)方法。
```javascript
const a = { x: null };
a.x = 10;
// 或者
const a = {};
Object.assgin(a, {x: 10});
```
>如果对象的属性名是动态的，可以在创造对象时使用属性表达式定义。
```javascript
const a = 'name';
const obj = {
    [a]: 10,  
};
```