[参考](https://segmentfault.com/a/1190000017494569)

核心文件是：

snabbdom.js
h.js
vnode.js(最新版本改为tovnode.js)
htmldomapi.js
is.js(这个文件是用来提供函数来判断数据是否为undefined,最新版本已经没把它单独拿出来了)
polyfill.js(我这边为了兼容IE8自己添加的文件)
有了这几个文件其实就可以使用snabbdom.js来渲染我们的页面。

当然还有很重要的模块文件：

style.js
props.js
eventlistener.js
class.js
attribute.js
dataset.js
eventlistener.js
