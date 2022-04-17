#### 1. 组件的生命周期

> 挂载

当组件实例被创建并插入 DOM 中时，其生命周期调用顺序如下：

- constructor()
- static getDerivedStateFromProps()
- render()
- componentDidMount()

即将过时

- UNSAFE_componentWillMount() ()

> 更新

当组件的 props 或 state 发生变化时会触发更新。组件更新的生命周期调用顺序如下：

- static getDerivedStateFromProps()
- shouldComponentUpdate()
- render()
- getSnapshotBeforeUpdate()
- componentDidUpdate()

即将过时

- UNSAFE_componentWillUpdate()
- UNSAFE_componentWillReceiveProps()

> 卸载

当组件从 DOM 中移除时会调用如下方法：

- componentWillUnmount()

> 错误处理

当渲染过程，生命周期，或子组件的构造函数中抛出错误时，会调用如下方法：

- static getDerivedStateFromError()
- componentDidCatch()

---

#### 2. 如何区分 Class 和 Function？

```js
class: Greeting.prototype.isReactComponent = {}
```

---

#### 3. setState 原理

[原理](https://juejin.cn/post/6844903928509759496)

```js
onClick = () => {
  setTimeout(() => {
    this.setState({ loading: true }, () => {
      console.log("1-setState");
    });
  }, 4000);

  new Promise((resolve) => {
    this.setState({ loading: false }, () => {
      console.log("3-setState");
    });
    console.log("2");
    resolve(4);
  }).then((res) => {
    this.setState({ loading: false }, () => {
      console.log("2-setState");
    });

    console.log(res, "////res");
  });
  console.log("1");
};
```

#### 4. 逻辑复用

HOC & render props & hook 自定义

HOC - 缺点, props 属性覆盖
render props - 缺点: 可能出现多层嵌套
hooks
