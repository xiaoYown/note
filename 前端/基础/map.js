// hash 表 - 松散的, hash表 查找数据库快, 可以直接通过索引查找
class Map {
  constructor () {
    this.arr = [];
  }
  calcKey (key) { // 此种方式可能计算 hash 重复
    let hash = 0;
    for (let k of key) {
      hash += k.charCodeAt();
    }
    return hash % 100
  }
  set (_key, value) { // 前端数据结构
    let key = this.calcKey(_key);
    this.arr[key] = value;
  }
  get (_key) {
    let key = this.calcKey(_key);
    return this.arr[key];
  }
}

let map = new Map();

map.set('h', 1);
map.set('o', 2);
// console.log(map.arr)
// console.log(map.get('h'));
// console.log(map.get('o'));