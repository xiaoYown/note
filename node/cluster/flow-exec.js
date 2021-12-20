function isPromise(obj) {
  return Object.prototype.toString.call(obj) === "[object Promise]";
};

function isFunction(obj) {
  return Object.prototype.toString.call(obj) === "[object Function]";
};
class FlowExec {

  isPending = false;

  tasks = [];

  exec = (fn) => {
    if (this.isPending) {
      this.tasks.push(fn);
      return;
    }
    this.do(fn);
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
    console.log('Task type error!');
  }
}