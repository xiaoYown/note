/**
 * 任何进制转 10 进制
 * @return {Object} num - 预存对应 char num 存储, 例: 97 <-> 'a', 122 <-> 'z'
 */
function HexCharStore () {
  let i = 0
  let maxHex = 35
  let charCodeStart = 97
  let hexCharStore = {
    toChar: {},
    toNum: []
  }
  for (; i <= maxHex; i++) {
    if (i < 10) {
      hexCharStore.toChar[i + ''] = i
      hexCharStore.toNum[i] = i
    } else {
      hexCharStore.toChar[i + ''] = String.fromCharCode(charCodeStart - 10 + i)
      hexCharStore.toNum[String.fromCharCode(charCodeStart - 10 + i) + ''] = i
    }
  }
  return hexCharStore
}

/**
 * 任何进制转 10 进制
 * @param {Number, String} num - 对应进制数值
 * @param {Number} hex - 进制
 */
function AnyToTen (num, hex) {
  num = num + ''
  let result = 0
  let len = num.length
  let i = 0
  let store = HexCharStore().toNum

  for (; i < len; i++) {
    result += store[num[i]] * Math.pow(hex, len - i -1)
  }

  return result
}

/**
 * 10 进制转任何进制 
 * @param {Number} num - 10进制数值
 * @param {Number} hex - 输出到的进制
 */
function TenToAny (num, hex) {
  let result = ''
  let store = HexCharStore().toChar // 存储 1 ~ hex 对应数值表示

  if (hex > 35) { // 超过 36 字母能表示值
    return console.log('hex over the max: ' + maxHex)
  }

  while (num >= hex) {
    result = store[num % hex + ''] + result
    num = Math.floor(num / hex)
  }
  result = store[num] + result

  return result
}

/**
 * 任何转任何进制 
 * @param {Number, String} num - 原始数值
 * @param {Number} hexFrom - 输入的进制
 * @param {Number} hexTo - 输出到的进制
 */
// 任何进制转任何进制
function  Conversion (num, hexFrom, hexTo) {
  return TenToAny(AnyToTen(num, hexFrom), hexTo)
}
