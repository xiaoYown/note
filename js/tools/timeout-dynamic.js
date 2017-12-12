function Timer (params) {
  this.isStop = params.isStop
  this.intervalFn = params.cb
  this.time = params.time
  this.init()
}

Timer.prototype = {
  timer: null,
  init: function () {
    this.cicrl()
  },
  cicrl: function () {
    this.intervalFn()
    if (!this.isStop()) {
      this.timer = setTimeout(this.cicrl.bind(this), this.time)
    } else {
      clearTimeout(this.timer)
      this.timer = null
    }
  }
}