const { isPromise, isFunction } = require('./utils');

class FlowExec {

  isPending = false;

  tasks = [];

  exec = (fn) => {
    if (this.isPending) {
      this.tasks.push(fn);
      return;
    } else {
      this.do(fn);
    }
    return this;
  }

  do = (fn) => {
    const next = fn();

    if (isFunction(next)) {
      next();
      return;
    }
    if (isPromise(next)) {
      this.isPending = true;
      next
        .then(() => {
          this.isPending = false;
          if (this.tasks.length) {
            this.do(this.tasks.shift());
          }
        })
        .catch(error => {
          this.isPending = false;
          console.log(error);
        });
      return;
    }
    if (typeof next !== 'undefined') {
      console.log('Task type error, now use ' + Object.prototype.toString.call(next));
    }
  }
}

function flowsCompose () {
  return new FlowExec();
}

exports.flowsCompose = flowsCompose;