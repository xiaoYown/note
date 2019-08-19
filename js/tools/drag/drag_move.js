function defineProperty(obj, key, value, set) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      return value
    },
    set: function (newVal, oldVal) {
      if (value === newVal) {
        return
      } else {
        value = newVal
      }
      set(newVal, oldVal);
    }
  });
}
function reTain(num, n) {

  return Math.floor(num * Math.pow(10, n)) / Math.pow(10, n)
}
var XyDragmove = function (option) {
  return new XyDragmove.prototype.init(option);
}
XyDragmove.eventStop = function (event) {
  event.stopPropagation();
}
XyDragmove.prototype = {
  constructor: XyDragmove,

	/**
	 * el: 拖拽元素
	 * axis: x,y,w,h
	 * isResize: 是否启动resize
	 * isRotate: 是否启动rotate
	 */
  init: function ({ el, axis, isResize, isEqual, isRotate, limitSize, limitAxis, dragstart, dragmove, dragend, resizestart, resizing, resizeend, rotatestart, rotating, rotateend }) {

    if (!!this.el) return;

    this.el = el;
    this.resizes = [];

    /* 回调绑定 */
    this._dragstart = dragstart || function () { };
    this._dragmove = dragmove || function () { };
    this._dragend = dragend || function () { };
    this._resizestart = resizestart || function () { };
    this._resizeend = resizeend || function () { };
    this._resizing = resizing || function () { };
    this._rotatestart = rotatestart;
    this._rotating = rotating;
    this._rotateend = rotateend;
    /* 限制绑定 */
    this.limitSize = {
      minW: limitSize ? limitSize.minW : 0,
      maxW: limitSize ? limitSize.maxW : 0,
      minH: limitSize ? limitSize.minH : 0,
      maxH: limitSize ? limitSize.maxH : 0,
    };
    this.limitAxis = limitAxis || {};
    /* 等比 */
    this.isEqual = !!isEqual;
    /* 数据初始化 */
    this.data_init();
    /* 视图绑定 */
    this.bind_view();
    /* 事件绑定 */
    this.bind_move();
    if (isResize)
      this.bind_resize();
    if (isRotate)
      this.bind_rotate();
    return this;
  },
  data_init() {
    this.el_resizes = []; 		// resizes元素
    this.el_rotate = null;		// rotate元素
    this.mouse = {};
    this.axis_bf = {};
    this.axis = {};
    this.size_bf = {};
    this.size = {};
    this.deg_bf = 0;
    this.deg = 0;
    this.deg_op = 0;
  },
  show(bool) {
    this.is_show = bool;
    if (bool) {
      this.is_show
      this.el.style.display = 'block';
    } else {

      this.el.style.display = 'none';
    }
  },
  event_stop(el, event) {
    el.addEventListener(event, XyDragmove.eventStop, false);
  },
  event_stop_off(el, event) {
    el.removeEventListener(event, XyDragmove.eventStop, false);
  },
  bind_view() {
    let _this = this;
    defineProperty(this.axis, 'x', 0, function (newVal, oldVal) {
      _this.el.style.left = newVal + 'px';
    });
    defineProperty(this.axis, 'y', 0, function (newVal, oldVal) {
      _this.el.style.top = newVal + 'px';
    });
    defineProperty(this.size, 'w', 0, function (newVal, oldVal) {
      _this.el.style.width = newVal + 'px';
    });
    defineProperty(this.size, 'h', 0, function (newVal, oldVal) {
      _this.el.style.height = newVal + 'px';
    });
    defineProperty(this, 'is_show', false, function (newVal, oldVal) {
      if (newVal) {
        _this.el.style.display = 'block';
      } else {
        _this.el.style.display = 'none';
      }
    });
    defineProperty(this, 'deg', 0, function (newVal, oldVal) {
      _this.el.style.transform = 'rotate(' + newVal + 'deg)';
    });
  },
  bind_move: function () {
    let _this = this;
    // this.el.setAttribute('draggable', true);
    // this.el.addEventListener('mousedown', this.dragstart.bind(this), false);
    this.el.onmousedown = this.dragstart.bind(this);
    document.addEventListener('mouseout', function () {
      _this.el.onmousemove = null;
      _this.el.onmouseup();
    }, false);
  },
  off_move: function () {
    // this.el.removeEventListener('mousedown', this.dragstart.bind(this), false);
    this.el.onmousedown = null;
  },
  dragstart: function (event) {
    console.log('movestart')
    event.stopPropagation();
    document.onmousemove = this.dragmove.bind(this);
    this.el.onmouseup = this.dragend.bind(this);
    // document.addEventListener('mousemove', this.dragmove.bind(this), false);
    // document.addEventListener('mouseup', this.dragend.bind(this), false);
    // if( event.dataTransfer.setDragImage )
    // 	event.dataTransfer.setDragImage(shadow, 0,  0);
    // if( event.dataTransfer.setData )
    // 	event.dataTransfer.setData('Text/plain', null);
    this.mouse.x = event.clientX;
    this.mouse.y = event.clientY;

    this._dragstart(this.axis_bf);
  },
  dragmove(event) {
    console.log('moving')
    // event.stopPropagation();
    if (event.clientX == 0 && event.clientY == 0) return;
    let axis = {
      x: this.axis_bf.x + (event.clientX - this.mouse.x),
      y: this.axis_bf.y + (event.clientY - this.mouse.y),
    }
    this.axis.x = axis.x;
    this.axis.y = axis.y;
    this._dragmove(axis);
  },
  dragend: function (event) {
    // this.dragmove(event);
    console.log('moveend')
    document.onmousemove = null;
    this.el.onmouseup = null;
    // document.removeEventListener('mousemove', this.dragmove.bind(this), false);
    // document.removeEventListener('mouseup', this.dragend.bind(this), false);
    this.set_record();
    this._dragend({
      x: this.axis.x,
      y: this.axis.y,
    });
  },

  bind_rotate: function () {
    let rotate = document.createElement('span');
    rotate.className = 'xy-rotate';
    // rotate.setAttribute('draggable', true);
    this.el_rotate = rotate;
    this.el.appendChild(rotate);

    this.event_stop(this.el_rotate, 'mousedown');
    this.el_rotate.addEventListener('mousedown', this.rotatestart.bind(this), false);
    // this.el_rotate.addEventListener('drag', this.rotating.bind(this), false);
    // this.el_rotate.addEventListener('dragend', this.rotateend.bind(this), false);
  },
  rotatestart: function (event) {
    document.onmousemove = this.rotating.bind(this);
    document.onmouseup = this.rotateend.bind(this);
    event.stopPropagation();
    // if( event.dataTransfer.setDragImage )
    // 	event.dataTransfer.setDragImage(shadow, 0,  0);
    // if( event.dataTransfer.setData )
    // 	event.dataTransfer.setData('Text/plain', null);
    this.get_center();

    let l_a = event.clientY - this.center.y,
      l_b = event.clientX - this.center.x;

    if (l_a < 0 && l_b >= 0) {
      this.deg_op = Math.atan(l_b / -l_a) * 180 / Math.PI;
    } else if (l_a >= 0 && l_b > 0) {
      this.deg_op = Math.atan(l_a / l_b) * 180 / Math.PI + 90;
    } else if (l_a > 0 && l_b <= 0) {
      this.deg_op = 270 - Math.atan(l_a / -l_b) * 180 / Math.PI;
    } else if (l_a <= 0 && l_b < 0) {
      this.deg_op = Math.atan(-l_a / -l_b) * 180 / Math.PI + 270;
    }

  },
  rotating: function (event) {
    event.stopPropagation();
    if (event.clientX == 0 && event.clientY == 0) return;

    let y_d = this.center.y - event.clientY,
      deg_ed = 0;

    if (y_d < 0) {
      deg_ed = 180 - Math.atan((event.clientX - this.center.x) / (0 - y_d)) * 180 / Math.PI;
    } else {
      deg_ed = Math.atan((event.clientX - this.center.x) / y_d) * 180 / Math.PI;
    }

    let deg = this.deg_bf + Math.floor(deg_ed - this.deg_op);

    this.deg = deg < 0 ? deg + 360 : deg >= 360 ? deg - 360 : deg;
    this._rotating(this.deg);
  },
  rotateend(event) {
    document.onmousemove = null;
    document.onmouseup = null;
    this.rotating(event);
    this.deg_bf = this.deg;
  },
  get_center() {
    let center = {
      x: this.el.offsetLeft + this.size.w / 2,
      y: this.el.offsetTop + this.size.h / 2,
    };
    this.center = center;
  },
  bind_resize: function () {
    if (this.resizes.length > 0) return;

    let _this = this;

    let frag = document.createDocumentFragment(),
      resize = null,
      resizes = [
        'xy-resize-top-left',
        'xy-resize-top-center',
        'xy-resize-top-right',
        'xy-resize-middle-right',
        'xy-resize-bottom-center',
        'xy-resize-bottom-left',
        'xy-resize-middle-left',
        'xy-resize-bottom-right',
      ];
    for (let i = 0, len = resizes.length; i < len; i++) {
      resize = document.createElement('span');
      resize.className = 'xy-drag-container-resize ' + resizes[i];
      resize.setAttribute('draggable', true);
      resize.style.zIndex = i;
      this.el_resizes.push(resize);
      resize.addEventListener('mousedown', function (event) {
        event.stopPropagation();
      }, false);
      resize.addEventListener('dragstart', function (event) {
        event.stopPropagation();
        _this.resizestart.call(_this, event, i);
      }, false);
      resize.addEventListener('drag', function (event) {
        event.stopPropagation();
        _this.resizing.call(_this, event, i);
      }, false);
      resize.addEventListener('dragend', function (event) {
        event.stopPropagation();
        _this.resizeend.call(_this, event, i)
      }, false);
      frag.appendChild(resize);
    }
    this.el.appendChild(frag);

  },
  set_coord(coord) {
    this.axis.x = coord.x;
    this.axis.y = coord.y;
    this.size.w = coord.w;
    this.size.h = coord.h;
    this.deg = coord.deg;
    this.set_record();
  },
  set_record: function () {
    this.axis_bf.x = this.axis.x;
    this.axis_bf.y = this.axis.y;
    this.size_bf.w = this.size.w;
    this.size_bf.h = this.size.h;
    this.deg_bf = this.deg;
  },
  resizestart: function (event, i) {
    event.stopPropagation();
    if (event.dataTransfer.setDragImage)
      event.dataTransfer.setDragImage(shadow, 0, 0);
    if (event.dataTransfer.setData)
      event.dataTransfer.setData('Text/plain', null);
    this.mouse.x = event.clientX;
    this.mouse.y = event.clientY;
  },
  resizing: function (event, index) {
    event.stopPropagation();
    // 防跳动
    if (event.clientX == 0 && event.clientY == 0) return;
    let
      // 未发生改变属性
      axis = {
        x: this.axis_bf.x,
        y: this.axis_bf.y,
      },
      size = {
        w: this.size_bf.w,
        h: this.size_bf.h,
      },
      // 鼠标移动距离
      distance = {
        x: event.clientX - this.mouse.x,
        y: event.clientY - this.mouse.y,
      },
      // w/h 变化值
      mol_size = {
        w: 0,
        h: 0,
      },
      // x/y 变化值
      mol_axis = {
        x: 0,
        y: 0,
      },
      // resize 前旋转角度与等腰三角形夹角
      deg_c = 0,
      // resizing 旋转角度与等腰三角形夹角
      deg_c_ = 0,
      // resize 前旋转角度与等腰三角 腰 l
      z = 0,
      // resizing 旋转角度与等腰三角 腰 l
      z_ = 0
    // x/y 比较后以位移较大的为计算标准
    d = {},
      // 发生旋转时稳定点坐标
      coord = {
        x: 0,
        y: 0,
      },
      // 发生旋转时不稳定点坐标
      _coord = {
        x: 0,
        y: 0,
      };

    // if( this.isEqual ){
    // 	if( index == 0 || index == 2 || index == 5 || index == 7 ){
    // 		if( Math.abs(distance.x) > Math.abs(distance.y) ){
    // 			distance.y = distance.y*Math.abs(distance.x)/Math.abs(distance.y);
    // 		} else {
    // 			distance.x = distance.x*Math.abs(distance.y)/Math.abs(distance.x)
    // 		}
    // 	}
    // }

    switch (index) {
      case 0:
        size = {
          w: this.size_bf.w - distance.x,
          h: this.size_bf.h - distance.y,
        };
        if (this.isEqual) {
          if (size.w < size.h) {
            size.w = size.h;
            axis = {
              x: this.axis_bf.x + distance.y,
              y: this.axis_bf.y + distance.y,
            };
          } else {
            size.h = size.w;
            axis = {
              x: this.axis_bf.x + distance.x,
              y: this.axis_bf.y + distance.x,
            };
          }
        } else {
          axis = {
            x: this.axis_bf.x + distance.x,
            y: this.axis_bf.y + distance.y,
          };
        }

        if (this.deg >= 0 && this.deg < 45) {
          mol_size.w = - distance.y * Math.cos(this.deg * Math.PI / 180);
          mol_size.h = - distance.y * Math.cos(this.deg * Math.PI / 180);
        }
        size = {
          w: this.size_bf.w + mol_size.w,
          h: this.size_bf.h + mol_size.h,
        };
        console.log(mol_size.w)
        if (this.deg != 0) {
          deg_c = Math.atan(this.size_bf.h / this.size_bf.w) + this.deg_bf * Math.PI / 180;
          deg_c_ = Math.atan(this.size.h / this.size.w) + this.deg_bf * Math.PI / 180;
          z = Math.sqrt((Math.pow(this.size_bf.h, 2) + Math.pow(this.size_bf.w, 2)) / 4);
          _z = Math.sqrt((Math.pow(this.size.h, 2) + Math.pow(this.size.w, 2)) / 4);

          coord = {
            x: this.axis_bf.x + this.size_bf.w / 2 + z * Math.cos(deg_c),
            y: this.axis_bf.y + this.size_bf.h / 2 + z * Math.sin(deg_c),
          },
            _coord = {
              x: this.axis.x + this.size.w / 2 + _z * Math.cos(deg_c_),
              y: this.axis.y + this.size.h / 2 + _z * Math.sin(deg_c_),
            };
          mol_axis = {
            x: coord.x - _coord.x,
            y: coord.y - _coord.y,
          };
          axis.x = this.axis.x + mol_axis.x;
          axis.y = this.axis.y + mol_axis.y;
        }
        //  else if( this.deg >= 45 && this.deg < 90){
        // 	mol_size.w = distance.y/Math.sin(this.deg*Math.PI/180);
        // } else if( this.deg >= 90 && this.deg < 135 ){
        // 	mol_size.w = distance.y/Math.sin(this.deg*Math.PI/180);
        // } else if( this.deg >= 135 && this.deg < 180  ){
        // 	mol_size.w = distance.x/Math.cos(this.deg*Math.PI/180);
        // } else if( this.deg >= 180 && this.deg < 225 ){
        // 	mol_size.w = distance.x/Math.cos(this.deg*Math.PI/180);
        // } else if( this.deg >= 225 && this.deg < 270 ){
        // 	mol_size.w = distance.y/Math.sin(this.deg*Math.PI/180);
        // } else if( this.deg >= 270 && this.deg < 315 ){
        // 	mol_size.w = distance.y/Math.sin(this.deg*Math.PI/180);
        // } else if( this.deg >= 315 && this.deg < 360 ){
        // 	mol_size.w = distance.x/Math.cos(this.deg*Math.PI/180);
        // }
        // size.h = this.size_bf.h + mol_size.h;

        // if( this.deg != 0 ){
        // 	deg_c  = Math.atan(this.size_bf.h/this.size_bf.w)  + this.deg_bf*Math.PI/180;
        // 	deg_c_ = Math.atan(this.size.h/this.size.w) + this.deg_bf*Math.PI/180;
        // 	z      = Math.sqrt((Math.pow(this.size_bf.h, 2) + Math.pow(this.size_bf.w, 2))/4);
        // 	_z     = Math.sqrt((Math.pow(this.size.h,    2) + Math.pow(this.size.w,    2))/4);

        // 	coord = {
        // 		x: this.axis_bf.x + this.size_bf.w/2 + z*Math.cos(deg_c),
        // 		y: this.axis_bf.y + this.size_bf.h/2 + z*Math.sin(deg_c),
        // 	},
        // 	_coord = {
        // 		x: this.axis.x + this.size.w/2 + _z*Math.cos(deg_c_),
        // 		y: this.axis.y + this.size.h/2 + _z*Math.sin(deg_c_),
        // 	};
        // 	mol_axis = {
        // 		x: coord.x - _coord.x,
        // 		y: coord.y - _coord.y,
        // 	};
        // 	axis.x = this.axis.x + mol_axis.x;
        // 	axis.y = this.axis.y + mol_axis.y;
        // }
        break;
      case 1:
        axis.y = this.axis_bf.y + distance.y;

        if (this.deg >= 0 && this.deg < 90) {
          mol_size.h = - distance.y / Math.cos(this.deg * Math.PI / 180);
        } else if (this.deg >= 90 && this.deg < 180) {
          mol_size.h = distance.y / Math.sin((this.deg - 90) * Math.PI / 180);
        } else if (this.deg >= 180 && this.deg < 270) {
          mol_size.h = distance.y / Math.cos((this.deg - 180) * Math.PI / 180);
        } else if (this.deg >= 270 && this.deg < 360) {
          mol_size.h = - distance.y / Math.sin((this.deg - 270) * Math.PI / 180)
        }
        size.h = this.size_bf.h + mol_size.h;

        if (this.deg != 0) {
          deg_c = Math.atan(this.size_bf.h / this.size_bf.w) + this.deg_bf * Math.PI / 180;
          deg_c_ = Math.atan(this.size.h / this.size.w) + this.deg_bf * Math.PI / 180;
          z = Math.sqrt((Math.pow(this.size_bf.h, 2) + Math.pow(this.size_bf.w, 2)) / 4);
          _z = Math.sqrt((Math.pow(this.size.h, 2) + Math.pow(this.size.w, 2)) / 4);

          coord = {
            x: this.axis_bf.x + this.size_bf.w / 2 + z * Math.cos(deg_c),
            y: this.axis_bf.y + this.size_bf.h / 2 + z * Math.sin(deg_c),
          },
            _coord = {
              x: this.axis.x + this.size.w / 2 + _z * Math.cos(deg_c_),
              y: this.axis.y + this.size.h / 2 + _z * Math.sin(deg_c_),
            };
          mol_axis = {
            x: coord.x - _coord.x,
            y: coord.y - _coord.y,
          };
          axis.x = this.axis.x + mol_axis.x;
          axis.y = this.axis.y + mol_axis.y;
        }
        break;
      case 2:
        size = {
          w: this.size_bf.w + distance.x,
          h: this.size_bf.h - distance.y,
        };
        axis.y = this.axis_bf.y + distance.y;
        if (this.isEqual) {
          if (size.w < size.h) {
            size.w = size.h;
          } else {
            size.h = size.w;
            axis.y = this.axis_bf.y - distance.x;
          }
        }
        break;
      case 3:
        if (this.deg >= 0 && this.deg < 45) {
          mol_size.w = distance.x / Math.cos(this.deg * Math.PI / 180);
        } else if (this.deg >= 45 && this.deg < 90) {
          mol_size.w = distance.y / Math.sin(this.deg * Math.PI / 180);
        } else if (this.deg >= 90 && this.deg < 135) {
          mol_size.w = distance.y / Math.sin(this.deg * Math.PI / 180);
        } else if (this.deg >= 135 && this.deg < 180) {
          mol_size.w = distance.x / Math.cos(this.deg * Math.PI / 180);
        } else if (this.deg >= 180 && this.deg < 225) {
          mol_size.w = distance.x / Math.cos(this.deg * Math.PI / 180);
        } else if (this.deg >= 225 && this.deg < 270) {
          mol_size.w = distance.y / Math.sin(this.deg * Math.PI / 180);
        } else if (this.deg >= 270 && this.deg < 315) {
          mol_size.w = distance.y / Math.sin(this.deg * Math.PI / 180);
        } else if (this.deg >= 315 && this.deg < 360) {
          mol_size.w = distance.x / Math.cos(this.deg * Math.PI / 180);
        }

        size.w = this.size_bf.w + mol_size.w;

        if (this.deg != 0) {
          deg_c = Math.atan(this.size_bf.h / this.size_bf.w) + this.deg_bf * Math.PI / 180;
          deg_c_ = Math.atan(this.size.h / this.size.w) + this.deg_bf * Math.PI / 180;
          z = Math.sqrt((Math.pow(this.size_bf.h, 2) + Math.pow(this.size_bf.w, 2)) / 4),
            _z = Math.sqrt((Math.pow(this.size.h, 2) + Math.pow(this.size.w, 2)) / 4);

          coord = {
            x: this.axis_bf.x + this.size_bf.w / 2 - z * Math.cos(deg_c),
            y: this.axis_bf.y + this.size_bf.h / 2 - z * Math.sin(deg_c),
          },
            _coord = {
              x: this.axis.x + this.size.w / 2 - _z * Math.cos(deg_c_),
              y: this.axis.y + this.size.h / 2 - _z * Math.sin(deg_c_),
            };
          mol_axis = {
            x: coord.x - _coord.x,
            y: coord.y - _coord.y,
          };
          axis.x = this.axis.x + mol_axis.x;
          axis.y = this.axis.y + mol_axis.y;
        }
        break;
      case 4:
        size.h = this.size_bf.h + distance.y;
        break;
      case 5:
        size = {
          w: this.size_bf.w - distance.x,
          h: this.size_bf.h + distance.y,
        };
        axis.x = this.axis_bf.x + distance.x;
        if (this.isEqual) {
          if (size.w < size.h) {
            size.w = size.h;
            axis.x = this.axis_bf.x - distance.y;
          } else {
            size.h = size.w;
          }
        }
        break;
      case 6:
        axis.x = this.axis_bf.x + distance.x;
        size.w = this.size_bf.w - distance.x;
        break;
      case 7:
        size = {
          w: this.size_bf.w + distance.x,
          h: this.size_bf.h + distance.y,
        };
        if (this.isEqual) {
          if (size.w < size.h) {
            size.w = size.h;
          } else {
            size.h = size.w;
          }
        }
        break;
    }
    if (size.w >= this.limitSize.minW && (!this.limitSize.maxW || size.w <= this.limitSize.maxW)) {
      this.axis.x = reTain(axis.x, 2);
      this.size.w = reTain(size.w, 2);
    }
    if (size.h >= this.limitSize.minH && (!this.limitSize.maxH || size.h <= this.limitSize.maxH)) {
      this.axis.y = reTain(axis.y, 2);
      this.size.h = reTain(size.h, 2);
    }
    this._resizing({
      x: this.axis.x,
      y: this.axis.y,
      w: this.size.w,
      h: this.size.h,
    });
  },
  resizeend: function (event, index) {
    this.resizing(event, index);
    this.set_record();
  },
  destroy: function () {

  }
};

XyDragmove.prototype.init.prototype = XyDragmove.prototype;
