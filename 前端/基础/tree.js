// 二叉树 两个分支 二叉索表树
// 遍历树 广度 深度

class Node {
  constructor (val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor () {
    this.root = null;
  }
  insertTree (currentNode, newNode) {
    if (currentNode.val > newNode.val) {
      if (currentNode.left === null) {
        currentNode.left = newNode;
      } else {
        this.insertTree(currentNode.left, newNode);
      }
    } else {
      if (currentNode.right === null) {
        currentNode.right = newNode;
      } else {
        this.insertTree(currentNode.right, newNode);
      }
    }
  }
  set (val) {
    let node = new Node(val);
    if (!this.root) {
      this.root = node;
    } else {
      this.insertTree(this.root, node);
    }
  }
}

let tree = new Tree();

tree.set(100);
tree.set(200);
tree.set(30);
tree.set(20);

console.log(tree)