let a = require('./set');
// race 兼容
let fs = require('fs').promises;

// fs.readFile('./template.html').then(data => {
//   console.log(data);
// });

// function isPromise (val) {
//   return typeof val === 'function'
// }

// let p = fs.readFile('./template.html', 'utf8');

// Promise.race = function (promises) {
//   return new Promise((resolve, reject) => {
//     for (let i = 0; i < promises.length; i++) {
//       let current = promises[i];
//       if (isPromise(current)) {
//         current.then(resolve, reject);
//       } else {
//         resolve(current);
//       }
//     }
//   })
// }

// Promise.race([p, 1]).then(data => {
//   console.log(data)
// })

/* --- */

function wrap (fn1) {
  let about = null;
  let p = new Promise((resolve, reject) => {
    about = reject;
  });
  let newPromise = Promise.race([p, fn1]);
  newPromise.about = about;
  return newPromise;
}

let p = wrap(new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success');
  }, 3000)
}));

p.then(function (data) {
  console.log(data)
}, function (err) {
  console.log('err', err);
});

setTimeout(() => {
  p.about('超时');
}, 2000)