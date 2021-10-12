### 原型、原型链概念：

1. js分为函数对象和普通对象，每个对象都有__proto__属性，但是只有函数对象才有prototype属性
2. Object、Function都是js内置的函数, 类似的还有我们常用到的Array、RegExp、Date、Boolean、Number、String
3. 属性__proto__是一个对象，它有两个属性，constructor和__proto__；
4. 原型对象prototype有一个默认的constructor属性，用于记录实例是由哪个构造函数创建；

### 原型、原型链遵从以下两个准则

1：原型对象的 constructor 指向构造函数本身
2：实例的 __proto__ 和原型对象指向相同

由此可以得出结论：
除了Object的原型对象（Object.prototype）的__proto__指向null，其他内置函数对象的原型对象（例如：Array.prototype）和自定义构造函数的
__proto__都指向Object.prototype, 因为原型对象本身是普通对象。
即：

```js
Object.prototype.__proto__ = null;
Array.prototype.__proto__ = Object.prototype;
Foo.prototype.__proto__  = Object.prototype;
```
