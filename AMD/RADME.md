####前言： 
>为什么我们需要模块化开发，模块化开发的好处有哪些？ 首先我们先说一下非模块化的开发方式带来的弊端。 非模块化开发中会导致一些问题的出现，变量和函数命名可能相同，会造成变量污染和冲突，并且出错时候很难排查。耦合程度高，不符合软件开发中的高内聚和低耦合的原则，所以我们就可以总结一下模块化开发的好处了： 

1. **解决项目中的变量污染问题。**
2. **开发效率高,有利于多人协同开发。**
3. **职责单一,方便代码重用和维护。**
4. **解决文件依赖问题,无需关注引包顺序 。**
####模块化开发的演变过程
**普通的函数封装**
1. 封装成对象
2. 私有公有成员分离 (使用自执行函数，避免变量污染)
3. 模块的维护和扩展(用多个自执行函数把模块分离开来，使用开闭原则—去增添功能，而尽量不要修改原来的代码，)
4. 可以添加模块的第三方依赖(比如添加jQuery的$,$作为一个编程的接口,降低程序之间的耦合度)
####AMD规范
>异步模块定义规范(Asynchronous Module Definition)制定了定义模块的规则，这样模块和模块的依赖可以被异步加载。这和浏览器的异步加载模块的环境刚好适应（浏览器同步加载模块会导致性能、可用性、调试和跨域访问等问题）。具体规范链接在这里：中文版   英文版 ，requireJs就是AMD规范的实现。

**main文件**
```javascript
define(['module1','module2',function(m1,m2) {
    // module1 和 module2是依赖模块
    // main中主要写加载依赖后的主要业务逻辑
    // 如果需要暴露出去，需要 return
    return {};
}]);
```