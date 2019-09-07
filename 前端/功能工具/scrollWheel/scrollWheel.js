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
  listener: '', // 当前实例监听事件 scroll: 初始化监听 -> mouseshell: 确认产生滚动后监听
  listenAttr: '', // 滚轮方向判断属性 - deltaY | wheelDelta (没有不处理)

  init () {
    this.listener = 'scroll'
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
    this.listener = 'wheel'
    this.wrap.addEventListener('mousewheel', this.wheel) // 开始绑定 mousewheel 事件
    this.wrap.removeEventListener('scroll', this.scroll) // 移除 scroll 事件
  },
  wheel (event) {
    let atTop = false
    let atBottom = false
    let scrollTop = this.wrap.scrollTop
    let scrollHeight = this.wrap.scrollHeight
    let clientHeight = this.wrap.clientHeight

    if (!this.listenAttr) this.setListenAttr(event)

    if (!this.listenAttr) { // 若无判断属性, 直接注销实例
      this.destroy()
    }

    if (clientHeight === scrollHeight) return // 滚动区域高度 === 元素高度时

    if (scrollTop === 0) {
      atTop = true
    } else if (scrollTop + clientHeight >= scrollHeight) {
      atBottom = true
    }

    switch (this.listenAttr) {
      case 'deltaY':
        if (atTop && event.deltaY < 0 || atBottom && event.deltaY > 0) {
          event.preventDefault()
        }
        break
      case 'wheelDelta':
        if (atTop && event.wheelDelta > 0 || atBottom && event.wheelDelta < 0) {
          event.preventDefault()
        }
        break
    }
  },
  setListenAttr (event) { // 确认滚动方向属性
    if (event.deltaY) {
      this.listenAttr = 'deltaY'
    } else if (event.wheelDelta) {
      this.listenAttr = 'wheelDelta'
    }
  },
  destroy () {
    if (this.listener === 'scroll') {
      this.wrap.removeEventListener('scroll', this.scroll)
    } else if (this.listener === 'wheel') {
      this.wrap.removeEventListener('mousewheel', this.wheel)
    }
  }
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ScrollWheel
}
