
function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)

  return this
}
ListNode.prototype.getValue = () => {
  const res = [];
  let cur = this;
  res.push(cur.val)

  console.log(this.val)
  while (cur.next) {
    cur = cur.next;
    res.push(cur.val);
  }

  return res
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let head = null
  let cur = null
  let over = 0
  while (l1 || l2) {
    let sum = over
    if (l1) {
      sum += l1.val
      l1 = l1.next
    }
    if (l2) {
      sum += l2.val
      l2 = l2.next
    }
    console.log(sum % 10)
    if (!cur) {
      head = cur = new ListNode(sum % 10)
    } else {
      cur.next = new ListNode(sum % 10)
    }
    over = Math.floor(sum / 10)
  }
  return head
};

function create (arr) {
  let head = null
  let res = null;
  while (arr.length) {
    if (!res) {
      head = res = new ListNode(arr.shift())
    } else {
      res.next = new ListNode(arr.shift())
      res = res.next
    }
  }
  return head
}

console.log(addTwoNumbers(create([2,4,3]), create([5,6,4])).getValue())