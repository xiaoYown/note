
let arrayProto = Array.prototype;
let proto = Object.create(arrayProto);
['push', 'shift', 'splice'].forEach(method => {
  proto[method] = function (...args) {
    const result = arrayProto[method].apply(this, args);
    let inserted; // 默认插入新的数据
    switch (method) {
      case 'push':
      case 'shift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2);
        break;
      default:
        break;
    }
    ArrayObserver(inserted);
    return result;
  }
});

function ArrayObserver (arr) {
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    observer(item);
  }
}

function observer (obj) {
  if (typeof obj !== 'obj' || obj === null) {
    return obj;
  }
  if (Array.isArray(obj)) {
    // 数组方法重新
    Object.setPrototypeOf(obj, proto);
    ArrayObserver(obj);
  } else {
    for (let key in obj) {
      defineReactive(obj, key, obj[key]);
    }
  }
}

function defineReactive (obj, key, value) {
  observer(value);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get () {
      return value;
    },
    set (newVal) {
      value = newVal;
      // 此处更新视图
      console.log('视图更新: ' + key);
    }
  })
}

let data = {
  a: [1, 2, 3, { name: 'p' }],
  n: 10
}
observer(data);

// vue 3.0

// let obj = {
//   name: 'hh',
//   info: {
//     age: 10
//   }
// }

// let handler = {
//   set (target, key, value) {
//     // target[key] = value;
//     if (key === 'length') {
//       return true;
//     }
//     // set 要求有返回值 (返回 boolean, 表示代理更新是否成功)
//     let flag = Reflect.set(target, key, value);
//     console.log(`proxy: ${key}`)
//     return flag;
//   },
//   get (target, key) {
//     // return target[key];
//     if (typeof target[key] === 'object') {
//       return new Proxy(target[key], handler);
//     }
//     return Reflect.get(target, key);
//   }
// }

// let proxy = new Proxy(obj, handler);

// proxy.name = 'jj'
// console.log(proxy.name)
// // 取值时进行代理
// proxy.info.age = 9;
// console.log(proxy.info.age)

// let arr = [1, 2, 3]
// let proxy_1 = new Proxy(arr, handler);
// proxy_1.push(4);