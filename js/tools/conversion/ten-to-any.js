import HexCharStore from './hex-char';
/**
 * 10 进制转任何进制 
 * @param {Number} num - 10进制数值
 * @param {Number} hex - 输出到的进制
 */
function TenToAny (num, hex) {
  let result = '';
  let store = HexCharStore().toChar; // 存储 1 ~ hex 对应数值表示

  if (hex > 35) { // 超过 36 字母能表示值
    return console.log('hex over the max: ' + maxHex);
  }

  while (num >= hex) {
    result = store[num % hex + ''] + result;
    num = Math.floor(num / hex);
  }
  result = store[num] + result;

  return result;
}

export default TenToAny;
