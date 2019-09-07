```css
.wrapper {
  display: table;
  width: 100%;
  height: 100%;
}
.cell {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.inner {
  display: inline-block;
  width: 100px;
  height: 100px;
  border: 1px solid #000;
}
```

```html
<div class="wrapper">
  <div class="cell">
    <div class="inner"></div>
  </div>
</div>
```

- table-cell 不敢知 margin, 在父元素上设置 table-row 等属性, 也会使其不敢知 height.
- 父元素若设置 float/position 会对默认布局造成破坏, 建议在外层再加一个元素定义定位.