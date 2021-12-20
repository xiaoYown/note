const { statSync } = require("fs");
const YAML = require("yaml");

function isFolder(folder) {
  try {
    const stats = statSync(folder);
    return stats.isDirectory();
  } catch (_error) {
    return false;
  }
}
console.log(isFolder("./.xv-lang-manage"));

function isFile(file) {
  try {
    const stats = statSync(file);
    return !stats.isDirectory();
  } catch (_error) {
    return false;
  }
}
console.log(isFile("./constants.js"));

function json2yaml(json) {
  return YAML.stringify(json);
}

console.log(
  json2yaml({
    name: "Jian",
    info: {
      age: 14,
      gender: "man",
    },
  })
);

function isPromise(obj) {
  return Object.prototype.toString.call(obj) === "[object Promise]";
}

isPromise(new Promise(() => {}));

function flowsComposeAsync (promise) {
  return {
    exec(fn) {
      promise.then(() => {
        fn()
      });
      return flowsCompose();
    }
  }
}

function flowsCompose() {
  return {
    exec(fn) {
      const next = fn();

      if (isPromise(next)) {
        return flowsComposeAsync(next);
      }
      
      if (isFunction(next)) {
        next();
      }
      return flowsCompose();
    },
  };
}

flowsCompose()
  .exec(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('1');
        resolve();
      }, 1000);
    })
  })
  .exec(() => {
    return () => {
      console.log(2);
    }
  })
