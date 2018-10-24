/** 内部滚动条区域 mousewheel 不会触发 body 的 mousewheel
 * param
 * wrap Element ---- scroll 元素
 * methods
 * init ---- 实例化后调用 init 进行事件绑定
 * destroy ---- 解绑事件
 */
function ScrollWheel (option) {
  this.wrap = option.wrap
}
ScrollWheel.prototype = {
  status: '',
  init () {
    this.status = 'scroll'
    this.initMethods()
    this.wrap.addEventListener('scroll', this.scroll) // 触发 scroll 之后绑定 mousewheel 事件(没有滚动条则不会触发)
  },
  initMethods () {
    function bind (fn, ctx) {
      return function (a) {
        var l = arguments.length
        return l
            ? l > 1
            ? fn.apply(ctx, arguments)
            : fn.call(ctx, a)
            : fn.call(ctx)
      }
    }
    for (let key in this) {
      if (typeof this[key] === 'function') {
        this[key] = bind(this[key], this)
      }
    }
  },
  scroll () {
    this.status = 'wheel'
    this.wrap.addEventListener('mousewheel', this.wheel) // 开始绑定 mousewheel 事件
    this.wrap.removeEventListener('scroll', this.scroll) // 移除 scroll 事件
  },
  wheel (event) {
    let atTop = false
    let atBottom = false
    let scrollTop = this.wrap.scrollTop
    let scrollHeight = this.wrap.scrollHeight
    let clientHeight = this.wrap.clientHeight

    if (clientHeight === scrollHeight) return // 滚动区域高度 === 元素高度时

    if (scrollTop === 0) {
      atTop = true
    } else if (scrollTop + clientHeight >= scrollHeight) {
      atBottom = true
    }
    if (atTop && event.deltaY < 0 || atBottom && event.deltaY > 0) {
      event.preventDefault()
    }
  },
  destroy () {
    if (this.status === 'scroll') {
      this.wrap.removeEventListener('scroll', this.scroll)
    } else if (this.status === 'wheel') {
      this.wrap.removeEventListener('mousewheel', this.wheel)
    }
  }
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ScrollWheel
}
