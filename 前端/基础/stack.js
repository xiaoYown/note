// 栈
class Stack {
  constructor () {
    this.arr = [];
  }
  push (element) {
    this.arr.push(element);
  }
  pop () {
    return this.arr.pop();
  }
}
let stack = new Stack();