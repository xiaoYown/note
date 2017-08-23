/** 内部滚动条区域 mousewheel 不会触发 body 的 mousewheel
 * param
 * wrap Element ---- scroll 元素
 * main Element ---- 使 scroll 元素 产生滚动条 元素
 * methods
 * init ---- 实例化后调用 init 进行事件绑定
 * destroy ---- 解绑事件
 */
function ScrollWheel (option) {
  this.wrap = option.wrap
  this.main = option.main
}
ScrollWheel.prototype = {
  status: '',
  init () {
    this.status = 'scroll'
    this.initMethods()
    this.wrap.addEventListener('scroll', this.scroll)
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
    this.wrap.addEventListener('mousewheel', this.wheel)
    this.wrap.removeEventListener('scroll', this.scroll)
  },
  wheel (event) {
    if (this.wrap.offsetHeight >= this.main.offsetHeight) return
    let top = false, bottom = false, scrollTop = this.wrap.scrollTop
    if (scrollTop === 0) {
      top = true
    } else if (scrollTop + this.wrap.offsetHeight >= this.main.offsetHeight) {
      bottom = true
    }
    if (top && event.deltaY < 0 || bottom && event.deltaY > 0) {
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
