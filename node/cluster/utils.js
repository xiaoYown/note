const path = require("path");
const { statSync } = require("fs");
const YAML = require("yaml");
const constants = require("./constants");

function isPromise (obj) {
  return Object.prototype.toString.call(obj) === "[object Promise]";
};

function isFunction (obj) {
  return Object.prototype.toString.call(obj) === "[object Function]";
};

function flowsComposeAsync (promise) {
  return {
    exec(fn) {
      promise.resolve(() => {
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

module.exports.isFolder = (name) => {
  try {
    const stats = statSync(name);
    return stats.isDirectory();
  } catch (_error) {
    return false;
  }
};

module.exports.isFile = (name) => {
  try {
    const stats = statSync(name);
    return !stats.isDirectory();
  } catch (_error) {
    return false;
  }
};

module.exports.json2yaml = (json) => {
  return YAML.stringify(json);
};

module.exports.getRepeaterIpcPath = () => {
  return path.join(constants.settingFolder, "repeaterctl");
};

module.exports.isPromise = isPromise;

module.exports.flowsCompose = flowsCompose;
