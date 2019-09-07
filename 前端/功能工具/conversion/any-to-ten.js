import HexCharStore from './hex-char';
/**
 * 任何进制转 10 进制
 * @param {Number, String} num - 对应进制数值
 * @param {Number} hex - 进制
 */
function AnyToTen (num, hex) {
  num = num + '';
  let result = 0;
  let len = num.length;
  let i = 0;
  let store = HexCharStore().toNum;

  for (; i < len; i++) {
    result += store[num[i]] * Math.pow(hex, len - i -1);
  }

  return result;
}

export default AnyToTen;
