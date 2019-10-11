// 链表

class Node {
  constructor (element) {
    this.element = element;
    this.next = null;
  }
}

class LinkList {
  constructor () {
    this.head = null; // 头指针
    this.length = 0; // 链表长度
  }
  append (element) {
    let node = new Node(element);
    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head; // 开头
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.length++;
  }
  insert (position, element) {
    if (position < 0 || position >= this.length) { return; }

    let node = new Node(element);
    if (position === 0) {
      node.next = this.head;
      this.head = node;
      this.length++;
    } else {
      let current = this.head;
      let previous = null;
      let index = 0;
      while (index++ < position) {
        previous = current;
        current = current.next;
      }
      previous.next = node;
      node.next = current;
    }
  }
}
// 方便对链表中的元素进行操作
let linklist = new LinkList();
linklist.append('1');
linklist.append('2');
linklist.append('3');
linklist.insert(0, 'h');
linklist.insert(1, 'o');
console.log(JSON.stringify(linklist))
