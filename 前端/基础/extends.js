// es5 继承

function Parent () {
  this.name = 'instance name'; // 实例属性
}

// 继承属性
Parent.prototype.say = function () {
  console.log('say');
}

// extends 方案 1
// 继承实例属性
function Child () {
  Parent.call(this); // 相当于 super
}
// 继承公共属性
Child.prototype.__proto__ = Parent.prototype;

// extends 方案 2
function create (parentPrototype) {
  function Fn () {}
  Fn.prototype = parentPrototype;
  return new Fn();
}
Child.prototype = Object.create(Parent.prototype, { constructor: { value: Child } });
// Child.prototype = create(Parent.prototype, { constructor: { value: Child } });

// let parent = new Parent;
let child = new Child;
console.log(child.say);
console.log(child.constructor);

// console.log(child.name)

// 每个 类(构造函数) 都有 prototype 对象
// 每个实例都有 __proto__, __proto__ 指向的是所属类的原型
