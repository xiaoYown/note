#### 如何区分 Class 和 Function？

```js
class: Greeting.prototype.isReactComponent = {}
```

#### setState 原理

[原理](https://juejin.cn/post/6844903928509759496)

```js
onClick = () => {
    setTimeout(() => {this.setState({ loading: true }, () => {console.log('1-setState');})}, 4000)

    new Promise(resolve => { 
        this.setState({ loading: false }, () => {console.log('3-setState');});
        console.log('2');
        resolve(4);

    })
    .then((res) => {
        this.setState({ loading: false }, () => {console.log('2-setState');});
        
        console.log(res, '////res');
    });
    console.log('1');
}
```