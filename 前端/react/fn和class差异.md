> * 原文地址：[How Does React Tell a Class from a Function?](https://overreacted.io/how-does-react-tell-a-class-from-a-function/)
> * 原文作者：[Dan Abramov](https://mobile.twitter.com/dan_abramov)
> * 译文出自：[掘金翻译计划](https://github.com/xitu/gold-miner)
> * 本文永久链接：[https://github.com/xitu/gold-miner/blob/master/TODO1/how-does-react-tell-a-class-from-a-function.md](https://github.com/xitu/gold-miner/blob/master/TODO1/how-does-react-tell-a-class-from-a-function.md)
> * 译者：[Washington Hua](https://tonghuashuo.github.io)
> * 校对者：[nanjingboy](https://github.com/nanjingboy), [sunui](https://github.com/sunui)

# React 如何区分 Class 和 Function？

让我们来看一下这个以函数形式定义的 `Greeting` 组件：

```
function Greeting() {
  return <p>Hello</p>;
}
```

React 也支持将他定义成一个类：

```
class Greeting extends React.Component {
  render() {
    return <p>Hello</p>;
  }
}
```

（直到 [最近](https://reactjs.org/docs/hooks-intro.html)，这是使用 state 特性的唯一方式）

当你要渲染一个 `<Greeting />` 组件时，你并不需要关心它是如何定义的：

```
// 是类还是函数 —— 无所谓
<Greeting />
```

但 **React 本身**在意其中的差别！

如果 `Greeting` 是一个函数，React 需要调用它。

```
// 你的代码
function Greeting() {
  return <p>Hello</p>;
}

// React 内部
const result = Greeting(props); // <p>Hello</p>
```

但如果 `Greeting` 是一个类，React 需要先用 `new` 操作符将其实例化，**然后** 调用刚才生成实例的 `render` 方法：

```
// 你的代码
class Greeting extends React.Component {
  render() {
    return <p>Hello</p>;
  }
}

// React 内部
const instance = new Greeting(props); // Greeting {}
const result = instance.render(); // <p>Hello</p>
```

无论哪种情况 React 的目标都是去获取渲染后的节点（在这个案例中，`<p>Hello</p>`）。但具体的步骤取决于 `Greeting` 是如何定义的。

**所以 React 是怎么知道某样东西是 class 还是 function 的呢？**

就像我 [上一篇博客](https://overreacted.io/why-do-we-write-super-props/) 中提到的，**你并不需要知道这个才能高效使用 React。** 我几年来都不知道这个。请不要把这变成一道面试题。事实上，这篇博客更多的是关于 JavaScript 而不是 React。

这篇博客是写给那些对 React 具体是 **如何** 工作的表示好奇的读者的。你是那样的人吗？那我们一起深入探讨一下吧。

**这将是一段漫长的旅程，系好安全带。这篇文章并没有多少关于 React 本身的信息，但我们会涉及到 `new`、`this`、`class`、箭头函数、`prototype`、`__proto__`、`instanceof` 等方面，以及这些东西是如何在 JavaScript 中一起工作的。幸运的是，你并不需要在使用 React 时一直想着这些，除非你正在实现 React...**

（如果你真的很想知道答案，直接翻到最下面。）

* * *

首先，我们需要理解为什么把函数和类分开处理很重要。注意看我们是怎么使用 `new` 操作符来调用一个类的：

```
// 如果 Greeting 是一个函数
const result = Greeting(props); // <p>Hello</p>

// 如果 Greeting 是一个类
const instance = new Greeting(props); // Greeting {}
const result = instance.render(); // <p>Hello</p>
```

我们来简单看一下 `new` 在 JavaScript 是干什么的。

* * *

在过去，JavaScript 还没有类。但是，你可以使用普通函数来模拟。**具体来讲，只要在函数调用前加上 `new` 操作符，你就可以把任何函数当做一个类的构造函数来用：**

```
// 只是一个函数
function Person(name) {
  this.name = name;
}

var fred = new Person('Fred'); // ✅ Person {name: 'Fred'}
var george = Person('George'); // 🔴 没用的
```

现在你依然可以这样写！在 DevTools 里试试吧。

如果你调用 `Person('Fred')` 时 **没有** 加 `new`，其中的 `this` 会指向某个全局且无用的东西（比如，`window` 或者 `undefined`），因此我们的代码会崩溃，或者做一些像设置 `window.name` 之类的傻事。

通过在调用前增加 `new`，我们说：“嘿 JavaScript，我知道 `Person` 只是个函数，但让我们假装它是个构造函数吧。**创建一个 `{}` 对象并把 `Person` 中的 `this` 指向那个对象，以便我可以通过类似 `this.name` 的形式去设置一些东西，然后把这个对象返回给我。**”

这就是 `new` 操作符所做的事。

```
var fred = new Person('Fred'); // 和 `Person` 中的 `this` 等效的对象
```

`new` 操作符同时也把我们放在 `Person.prototype` 上的东西放到了 `fred` 对象上：

```
function Person(name) {
  this.name = name;
}
Person.prototype.sayHi = function() {  alert('Hi, I am ' + this.name);}
var fred = new Person('Fred');
fred.sayHi();
```

这就是在 JavaScript 直接支持类之前，人们模拟类的方式。

* * *

`new` 在 JavaScript 中已经存在了好久了，然而类还只是最近的事，它的出现让我们能够重构我们前面的代码以使它更符合我们的本意：

```
class Person {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    alert('Hi, I am ' + this.name);
  }
}

let fred = new Person('Fred');
fred.sayHi();
```

**捕捉开发者的本意** 是语言和 API 设计中非常重要的一点。

如果你写了一个函数，JavaScript 没办法判断它应该像 `alert()` 一样被调用，还是应该被视作像 `new Person()` 一样的构造函数。忘记给像 `Person` 这样的函数指定 `new` 会导致令人费解的行为。

**类语法允许我们说：“这不仅仅是个函数 —— 这是个类并且它有构造函数”。** 如果你在调用它时忘了加 `new`，JavaScript 会报错：

```
let fred = new Person('Fred');
// ✅  如果 Person 是个函数：有效
// ✅  如果 Person 是个类：依然有效

let george = Person('George'); // 我们忘记使用 `new`
// 😳 如果 Person 是个长得像构造函数的方法：令人困惑的行为
// 🔴 如果 Person 是个类：立即失败
```

这可以帮助我们在早期捕捉错误，而不会遇到类似 `this.name` 被当成 `window.name` 对待而不是 `george.name` 的隐晦错误。

然而，这意味着 React 需要在调用所有类之前加上 `new`，而不能把它直接当做一个常规的函数去调用，因为 JavaScript 会把它当做一个错误对待！

```
class Counter extends React.Component {
  render() {
    return <p>Hello</p>;
  }
}

// 🔴 React 不能简单这么做：
const instance = Counter(props);
```

这意味着麻烦。

* * *

在我们看到 React 如何处理这个问题之前，很重要的一点就是要记得大部分 React 的用户会使用 Babel 等编译器来编译类等现代化的特性以便能在老旧的浏览器上运行。因此我们需要在我们的设计中考虑编译器。

在 Babel 的早期版本中，类不加 `new` 也可以被调用。但这个问题已经被修复了 —— 通过生成额外的代码的方式。

```
function Person(name) {
  // 稍微简化了一下 Babel 的输出：
  if (!(this instanceof Person)) {
    throw new TypeError("Cannot call a class as a function");
  }
  // Our code:
  this.name = name;
}

new Person('Fred'); // ✅ OK
Person('George');   // 🔴 无法把类当做函数来调用
```

你或许已经在你构建出来的包中见过类似的代码，这就是那些 `_classCallCheck` 函数做的事。（你可以通过启用“loose mode”来关闭检查以减小构建包的尺寸，但这或许会使你最终转向真正的原生类时变得复杂）

* * *

至此，你应该已经大致理解了调用时加不加 `new` 的差别：

|            | `new Person()`               | `Person()`                          |
| ---------- | ---------------------------- | ----------------------------------- |
| `class`    | ✅ `this` 是一个 `Person` 实例 | 🔴 `TypeError`                      |
| `function` | ✅ `this` 是一个 `Person` 实例 | 😳 `this` 是 `window` 或 `undefined` |

这就是 React 正确调用你的组件很重要的原因。 **如果你的组件被定义为一个类，React 需要使用 `new` 来调用它**

所以 React 能检查出某样东西是否是类吗？

没那么容易！即便我们能够 [在 JavaScript 中区分类和函数](https://stackoverflow.com/questions/29093396/how-do-you-check-the-difference-between-an-ecmascript-6-class-and-function)，面对被 Babel 等工具处理过的类这还是没用。对浏览器而言，它们只是不同的函数。这是 React 的不幸。

* * *

好，那 React 可以直接在每次调用时都加上 `new` 吗？很遗憾，这种方法并不总是有用。

对于常规函数，用 `new` 调用会给它们一个 `this` 作为对象实例。对于用作构造函数的函数（比如我们前面提到的 `Person`）是可取的，但对函数组件这或许就比较令人困惑了：

```
function Greeting() {
  // 我们并不期望 `this` 在这里表示任何类型的实例
  return <p>Hello</p>;
}
```

这暂且还能忍，还有两个 **其他** 理由会扼杀这个想法。

* * *

关于为什么总是使用 `new` 是没用的的第一个理由是，对于原生的箭头函数（不是那些被 Babel 编译过的），用 `new` 调用会抛出一个错误：

```
const Greeting = () => <p>Hello</p>;
new Greeting(); // 🔴 Greeting 不是一个构造函数
```

这个行为是遵循箭头函数的设计而刻意为之的。箭头函数的一个附带作用是它 **没有** 自己的 `this` 值 —— `this` 解析自离得最近的常规函数：

```
class Friends extends React.Component {
  render() {
    const friends = this.props.friends;
    return friends.map(friend =>
      <Friend
        // `this` 解析自 `render` 方法
        size={this.props.size}
        name={friend.name}
        key={friend.id}
      />
    );
  }
}
```

OK，所以 **箭头函数没有自己的 `this`。**但这意味着它作为构造函数是完全无用的！

```
const Person = (name) => {
  // 🔴 这么写是没有意义的！
  this.name = name;
}
```

因此，**JavaScript 不允许用 `new` 调用箭头函数。** 如果你这么做，你或许已经犯了错，最好早点告诉你。这和 JavaScript 不让你 **不加** `new` 去调用一个类是类似的。

这样很不错，但这也让我们的计划受阻。React 不能简单对所有东西都使用 `new`，因为会破坏箭头函数！我们可以利用箭头函数没有 `prototype` 的特点来检测箭头函数，不对它们使用 `new`：

```
(() => {}).prototype // undefined
(function() {}).prototype // {constructor: f}
```

但这对于被 Babel 编译过的函数是 [没用](https://github.com/facebook/react/issues/4599#issuecomment-136562930) 的。这或许没什么大不了，但还有另一个原因使得这条路不会有结果。

* * *

另一个我们不能总是使用 `new` 的原因是它会妨碍 React 支持返回字符串或其它原始类型的组件。

```
function Greeting() {
  return 'Hello';
}

Greeting(); // ✅ 'Hello'
new Greeting(); // 😳 Greeting {}
```

这，再一次，和 [`new` 操作符](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new) 的怪异设计有关。如我们之前所看到的，`new` 告诉 JavaScript 引擎去创建一个对象，让这个对象成为函数内部的 `this`，然后把这个对象作为 `new` 的结果给我们。

然而，JavaScript 也允许一个使用 `new` 调用的函数返回另一个对象以 **覆盖** `new` 的返回值。或许，这在我们利用诸如“对象池模式”来对组件进行复用时是被认为有用的：

```
// 创建了一个懒变量 zeroVector = null;
function Vector(x, y) {
  if (x === 0 && y === 0) {
    if (zeroVector !== null) {
      // 复用同一个实例
      return zeroVector;
    }
    zeroVector = this;
  }
  this.x = x;
  this.y = y;
}

var a = new Vector(1, 1);
var b = new Vector(0, 0);
var c = new Vector(0, 0); // 😲 b === c
```

然而，如果一个函数的返回值 **不是** 一个对象，它会被 `new` **完全忽略**。如果你返回了一个字符串或数字，就好像完全没有 `return` 一样。

```
function Answer() {
  return 42;
}

Answer(); // ✅ 42
new Answer(); // 😳 Answer {}
```

当使用 `new` 调用函数时，是没办法读取原始类型（例如一个数字或字符串）的返回值的。因此如果 React 总是使用 `new`，就没办法增加对返回字符串的组件的支持！

这是不可接受的，因此我们必须妥协。

* * *

至此我们学到了什么？React 在调用类（包括 Babel 输出的）时 **需要用** `new`，但在调用常规函数或箭头函数时（包括 Babel 输出的）**不需要用** `new`，并且没有可靠的方法来区分这些情况。

**如果我们没法解决一个笼统的问题，我们能解决一个具体的吗？**

当你把一个组件定义为类，你很可能会想要扩展 `React.Component` 以便获取内置的方法，比如 `this.setState()`。 **与其试图检测所有的类，我们能否只检测 `React.Component` 的后代