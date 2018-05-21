import { printName } from '../test/jasmine-test'

describe('Client utils', () => {
  // beforeEach(function() {
  //   foo = 0;
  //   foo += 1;
  // });

  // afterEach(function() {
  //   foo = 0;
  // });

  // it("测试1", function() {
  //   expect(foo).toEqual(1);
  // });

  // it("测试2", function() {
  //   expect(foo).toEqual(1);
  //   expect(true).toEqual(true);
  // });
  describe('printName', () => {
    it('should work', () => {
      expect(printName('true')).toBe('true')
    })
  })

  // it('should escape reserved chars', () => {
  //   expect(stringifyQuery({
  //     a: '*()!'
  //   })).toBe('?a=%2a%28%29%21')
  // })

  // it('should preserve commas', () => {
  //   expect(stringifyQuery({
  //     list: '1,2,3'
  //   })).toBe('?list=1,2,3')
  // })
})
