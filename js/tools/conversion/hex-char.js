/**
 * 任何进制转 10 进制
 * @return {Object} num - 预存对应 char num 存储, 例: 97 <-> 'a', 122 <-> 'z'
 */
function HexCharStore () {
  let i = 0;
  let maxHex = 35;
  let charCodeStart = 97;
  let hexCharStore = {
    toChar: {},
    toNum: []
  };
  for (; i <= maxHex; i++) {
    if (i < 10) {
      hexCharStore.toChar[i + ''] = i;
      hexCharStore.toNum[i] = i;
    } else {
      hexCharStore.toChar[i + ''] = String.fromCharCode(charCodeStart - 10 + i);
      hexCharStore.toNum[String.fromCharCode(charCodeStart - 10 + i) + ''] = i;
    }
  }
  return hexCharStore;
}

export default HexCharStore;
