// 任何进制转任何进制
function  Conversion (num, hexFrom, hexTo) {

}
// 任何进制转 10 进制
function AnyToTen (num) {

}
// 10 进制转任何进制
function TenToAny (num, hex) {
  let result = ''
  let next = num
  let maxHex = 25
  let charCodeStart = 97
  let i = 0
  let len = 10 + maxHex
  let store = {}

  if (hex > maxHex + 10) { // 超过 36 字母能表示值
    return console.log('hex over the max: ' + maxHex)
  } else {
    for (; i <= len; i++) {
      if (i < 10) {
        store[i + ''] = i
      } else {
        store[i + ''] = String.fromCharCode(charCodeStart - 10 + i)
      }
    }
  }

  while (next >= hex) {
    result = store[next % hex + ''] + result
    next = Math.floor(next / hex)
  }
  result = next + result

  return result
}