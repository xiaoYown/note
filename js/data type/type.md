###JS中可以把变量分成两部分，基本类型和引用类型
*主要内容来源internel*
**基本类型比较简单:** Undefined、Null、Boolean、Number 和 String.
```
基本类型值就是简单的数据段 ; 引用类型值可能由多个值构成的对象。
引用类型值保存在内存中 ,  而JS是不能直接访问内存的 , 所以对于引用类型 , 操作的不是实际的对象而是对象的引用。
注：string在ECMAScript中不是引用类型 , 和其他许多语言不同。
```
####引用类型
1.动态属性
对象可以动态的添加属性并且复制
```javascript
var obj = new Object();
obj.num = 10;
console.log(obj.num);  // 10
```
2.复制值
引用类型复制和简单类型不同 , 变量赋值后新值和旧值都是引用的同一个对象 , 无论改变新值和旧值的对象属性   , 都会直接改变变量指向的堆内存中的对象 。
```javascript
var obj1 = new Object();
obj1.num = 10;
var obj2 = obj1;
console.log(obj2.num);  // 10
obj1.num = 20
console.log(obj2.num);  // 20
```
3.函数传参
js中所有函数传参都是按值传参。
```javascript
function setNum(obj) { 
    obj.num = 10; 
    obj = new Object();
    obj.num = 20; 
}
var person = new Object();
setName(person);
console.log(person.num); // 10
```
person的值并没有因为obj的修改而改变 , 说明不是按引用传递的。如果是按引用传递的 , obj和person指向同一个对象 , 当obj改变 , person也会改变。

4、类型检测
```text
typeof用于检测简单类型 , 对于对象 , 我们更想知道的是什么类型的对象。所以引进了instanceof操作符。
person instanceof Object 这样来检测person是不是Object。
person instanceof Array 这样来检测person是不是Array。
```