const path = require("path");
const { statSync } = require("fs");
const YAML = require("yaml");
const constants = require("./constants");

function call (obj) {
  return Object.prototype.toString.call(obj);
}

function isPromise (obj) {
  return call(obj) === "[object Promise]";
};

function isFunction (obj) {
  return call(obj) === "[object Function]";
};

exports.isFolder = (name) => {
  try {
    const stats = statSync(name);
    return stats.isDirectory();
  } catch (_error) {
    return false;
  }
};

exports.isFile = (name) => {
  try {
    const stats = statSync(name);
    return !stats.isDirectory();
  } catch (_error) {
    return false;
  }
};

exports.json2yaml = (json) => {
  return YAML.stringify(json);
};

exports.getRepeaterIpcPath = () => {
  return path.join(constants.settingFolder, "repeaterctl");
};

exports.isPromise = isPromise;
exports.isFunction = isFunction;
