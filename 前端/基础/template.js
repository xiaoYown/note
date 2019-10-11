// 模板引擎

// // 模板字符串 es6
// let name = 'xx';
// let age = 10;

// // let str = `${name} 今年 ${age} 岁`;
// let str = '${name} 今年 ${age} 岁';

// let s = str.replace(/\$\{([\s\S]+?)\}/g, function () {
//   // console.log(arguments[1])
//   return eval(arguments[1]);
// })

// console.log(s);

// ejs 模板

// let obj = {
//   name: 'xx'
// }

// with (obj) { // 声明一个当前作用域下的 this
//   console.log(name);
// }

// new Function

function render (str, params) {
  // 拼接的是一个纯字符串
  let head = 'let str="";\r\nwith(name){\r\nstr = `\r\n';
  str = str.replace(/<%=([\s\S]+?)%>/g, function () {
      return '${' + arguments[1] + '}'
  })
  let content = str.replace(/<%([\s\S]+?)%>/g, function () {
      return '`\r\n' + arguments[1] + '\r\nstr+=`'
  });
  let tail = '`\r\n}\r\n return str'
  let s = head + content + tail;
  return new Function('name', s)(params)
}

let fs = require('fs');
let str = fs.readFileSync('template.html', 'utf8')
let ejs = require('ejs')

// let renderStr = ejs.render(str, { name: 'xx', len: 10 })
let renderStr = render(str, { name: 'xx', len: 2 })
console.log(renderStr)


