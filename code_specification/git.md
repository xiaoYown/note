## 1. Commit message 的格式
每次提交, Commit message 都包括三个部分：header, body 和 footer。

```html
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

其中, header 是必需的, body 和 footer 可以省略。
不管是哪一个部分, 任何一行都不得超过72个字符(或100个字符)。这是为了避免自动换行影响美观。


#### Header
Header 部分只有一行, 包括三个字段：type(必需)、scope(可选)和subject(必需)。

type: 用于说明 commit 的类别, 只允许使用下面7个标识。

- feat: 新功能(feature)
- fix: 修补bug
- remove: 删除冗余代码/移除废弃文件
- docs: 文档(documentation)
- style: 格式(不影响代码运行的变动)
- refactor: 重构(即不是新增功能, 也不是修改bug的代码变动)
- test: 增加测试
- chore: 构建过程或辅助工具的变动

subject: commit 目的的简短描述, 不超过50个字符


#### Body
Body 部分是对本次 commit 的详细描述, 可以分成多行。下面是一个例子。

```
style 首页sass文件格式修改

- 简报预览显示简报信息组件样式格式变动
- 简报列表样式格式变动
```

>注意点: 第2行是空行

应该说明代码变动的动机, 以及与以前行为的对比。


#### Footer
Footer 部分只用于以下两种情况：

1)不兼容变动

如果当前代码与上一个版本不兼容, 则 Footer 部分以BREAKING CHANGE开头, 后面是对变动的描述、以及变动理由和迁移方法。
```
BREAKING CHANGE: 入参类型更改.

  To migrate the code follow the example below:

  Before:

  props: {
    index: [String, Number],
  }

  After:

  props: {
    index: Number,
  }

  index 为数组下标入参, 应使用 Number 类型作为入参.
```

2) 关闭 Issue

如果当前 commit 针对某个issue, 那么可以在 Footer 部分关闭这个 issue 。
```
Closes #234
```


#### Revert

还有一种特殊情况, 如果当前 commit 用于撤销以前的 commit, 则必须以revert:开头, 后面跟着被撤销 Commit 的 Header。
```
revert: feat(pencil): add 'graphiteWidth' option

This reverts commit 667ecc1654a317a13331b17617d973392f415f02.
```
Body部分的格式是固定的, 必须写成This reverts commit &lt;hash>., 其中的hash是被撤销 commit 的 SHA 标识符。

如果当前 commit 与被撤销的 commit, 在同一个发布(release)里面, 那么它们都不会出现在 Change log 里面。如果两者在不同的发布, 那么当前 commit, 会出现在 Change log 的Reverts小标题下面。

