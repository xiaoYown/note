import TenToAny from './ten-to-any';
import AnyToTen from './any-to-ten';
/**
 * 任何转任何进制 
 * @param {Number, String} num - 原始数值
 * @param {Number} hexFrom - 输入的进制
 * @param {Number} hexTo - 输出到的进制
 */
// 任何进制转任何进制
function  Conversion (num, hexFrom, hexTo) {
  return TenToAny(AnyToTen(num, hexFrom), hexTo);
}
console.log(Conversion(8, 10, 2));
export default Conversion;
