前言
TypeScript 是一种由微软开发的自由和开源的编程语言，它是JavaScript的一个超集，扩展了JavaScript的语法。Javascript实现了ES5的语法,Typescript实现了ES6的语法。

>
####Typscript的优势
1.支持ES6----未来的发展方向
2.强大的IDE----类型检查,减少犯错的几率
3.Angular2的开发语言----由Typescript写成,能更好的学习Angular2框架
####搭建Typscript开发环境
**compiler**
Typescript编译器
(不需要严格的开发环境,浏览器即可)
####语法特性
1.类 Classes
2.接口 Interfaces
3.模块 Modules 
4.类型注解 Type annotations
5.编译时类型检查 Compile time type checking 
6.Arrow 函数 (类似 C# 的 Lambda 表达式)
####JavaScript 的 TypeScript 的区别
TypeScript 是 JavaScript 的超集，扩展了 JavaScript 的语法，因此现有的 JavaScript 代码可与 TypeScript 一起工作无需任何修改，TypeScript 通过类型注解提供编译时的静态类型检查。
TypeScript 可处理已有的 JavaScript 代码，并只对其中的 TypeScript 代码进行编译。

####安装
```javascript
npm install -g typescript
```
####文件编译
```javascript
tsc filename.ts
```
####字符串新特性
>1.多行字符串----`srting`
2.字符串模板----`${string variable}`
3.自动拆分字符串
```typescript
function fn(template, name, age){
	console.log(template)
    console.log(name);
    console.log(age);
}
var name = 'xiaoYown';
var getAge = function () {
    return 24;
}
fn`hello my name is ${name}, I'm ${getAge()}`
```
####参数的类型
```typescript
/** 类型指定
 * string
 * number
 * boolean
 * void (指定函数不需要任何返回值)
 */
var myName: string = "qinzhenya"; // 也可不指定,typescript有类型推断机制(若是类型变化变量,使用:any进行指定)
myName = 12; // IDE会进行语法检测提示，减少代码错误几率**(生成的js仍可正常执行)**
```
####类型批注
>TypeScript 通过类型批注提供静态类型以在编译时启动类型检查。这是可选的，而且可以被忽略而使用 JavaScript 常规的动态类型。
```typescript
function Add(left: number, right: number): number {
	return left + right;
}
```
####参数默认值
有默认值的参数要声明在最后面
```typescript
function Add(left: number, right: number = 10): number {
	return left + right;
}
```
####可选参数 
可选参数不能写在必填参数后面
```typescript
function Add(left: number, top:?:number,right: number = 10): number {
	return left + right;
}
```
####Rest and Spread操作符
用来声明任意数量的的方法参数
```typescript
function fn(...args){
}
```
```javascript
// es6 固定数量参数
function fn(a,b,c){
    var arr = [1,2];
}
fn(...arr); // 报错
```
####generator函数
控制函数的执行过程,手工回复代码的执行
```javascript
// es6
function* fn(){
     console.log("start");
    yield;
    console.log("end");
}
var fn1 = fn();
fn1.next(); // start
fn2.next(); // end
```
####destructuring析构表达式
```typescript
// 对象取值
function getStock(){
   return {
    code: "IBM",
    price: 100,
    obj: {
        obj1: "1",
        obj2:  "2"
    }
}
var { code, price } = getStock();
var { code: codex, price } = getStock(); // 别名
var { obj: {obj2} } = getStock(); // 获取嵌套属性
var arr = [1,2,3,4];
var [num1,num2] = arr;
console.log(num1); // 1
console.log(num2); // 2
var [,num2,,num4] = arr;
console.log(num2); // 2
console.log(num4); // 4
// rest操作符
var [num1,num2,...args] = arr;
console.log(num1); // 1
console.log(num2); // 2
console.log(args); // [3,4]
```
####箭头函数表达式（lambda表达式）
>lambda表达式 ()=>{something}或()=>something 相当于js中的函数,它的好处是可以自动将函数中的this附加到上下文中。
```typescript
var shape = {
    name: "rectangle",
    popup: function() {
        // 此处会生成 var _this = this , 并将以下setTimeout中this替换成_this
        console.log('This inside popup(): ' + this.name);
        setTimeout(function() {
            console.log('This inside setTimeout(): ' + this.name);
            console.log("I'm a " + this.name + "!");
        }, 3000);
    }
};
shape.popup();
```
####类
>TypeScript支持集成了可选的类型批注支持的ECMAScript 6的类。
代码如下：
```javascript
class Shape {
    area: number;
    color: string;
    constructor ( name: string, width: number, height: number ) {
        this.area = width * height;
        this.color = "pink";
    };
    shoutout() {
        return "I'm " + this.color + " " + this.name +  " with an area of " + this.area + " cm squared.";
    }
}
var square = new Shape("square", 30, 30);
console.log( square.shoutout() );
console.log( 'Area of Shape: ' + square.area );
console.log( 'Name of Shape: ' + square.name );
console.log( 'Color of Shape: ' + square.color );
console.log( 'Width of Shape: ' + square.width );
console.log( 'Height of Shape: ' + square.height );
```
####继承
>最后，我们可以继承一个已存在的类并创建一个派生类，继承使用关键字 extends。
接下来我们在 class.ts 文件末尾添加以下代码，如下所示：
```javascript
class Shape3D extends Shape {
    volume: number;
    constructor ( public name: string, width: number, height: number, length: number ) {
        super( name, width, height );
        this.volume = length * this.area;
    };
    shoutout() {
        return "I'm " + this.name +  " with a volume of " + this.volume + " cm cube.";
    }
    superShout() {
        return super.shoutout();
    }
}
var cube = new Shape3D("cube", 30, 30, 30);
console.log( cube.shoutout() );
console.log( cube.superShout() );
```
Shape3D 继承了 Shape 类, 也继承了 Shape 类的 color 属性。
构造函数中，super 方法调用了基类 Shape 的构造函数 Shape，传递了参数 name, width, 和 height 值。 继承允许我们复用 Shape 类的代码，所以我们可以通过继承 area 属性来计算 this.volume。
Shape3D 的 shoutout() 方法重写基类的实现。superShout() 方法通过使用 super 关键字直接返回了基类的 shoutout() 方法。
其他的代码我们可以通过自己的需求来完成自己想要的功能。
