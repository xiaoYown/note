function defineProperty(obj, key, value, set){
	Object.defineProperty(obj, key, {
		enumerable: true,
		configurable: true,
		get: function(){
			return value
		},
		set: function(newVal, oldVal){
			if (value === newVal) {
                return
            } else {
                value = newVal
            }
			set(newVal, oldVal);
		}
	});
}
var XyDragmove = function(option){
	return new XyDragmove.prototype.init(option);
}
XyDragmove.prototype = {
	constructor: XyDragmove,
	
	/**
	 * el: 拖拽元素
	 * axis: x,y,w,h
	 * isResize: 是否启动resize
	 * isRotate: 是否启动rotate
	 */
	init: function({el, axis, isResize, isRotate, dragstart, dragmove, dragend, rotatestart, rotating, rotateend}){

		if( !!this.el ) return;

		this.el 	= el;

		/* 回调绑定 */
		this._dragstart 	= dragstart;
		this._dragmove  	= dragmove;
		this._dragend   	= dragend;
		this._rotatestart 	= rotatestart;
		this._rotating 		= rotating;
		this._rotateend 	= rotateend;
		/* 数据初始化 */
		this.data_init();
		/* 视图绑定 */
		this.bind_view();
		/* 事件绑定 */
		this.bind_move();
		if( isResize )
			this.bind_resize();
		if( isRotate )
			this.bind_rotate();
		return this;
	},
	data_init(){
		this.el_resizes = []; 		// resizes元素
		this.el_rotate = null;		// rotate元素
		this.mouse = {};
		this.axis_bf = {};
		this.axis = {};
		this.size ={};
		this.deg = 0;
	},
	show(bool){
		this.is_show = bool;
		if( bool ){
			this.is_show 
			this.el.style.display = 'block';
		} else {

			this.el.style.display = 'none';
		}
	},
	bind_view(){
		let _this = this;
		defineProperty( this.axis, 'x', 0 , function(newVal, oldVal){
			_this.el.style.left = newVal + 'px';
		} );
		defineProperty( this.axis, 'y', 0, function(newVal, oldVal){
			_this.el.style.top  = newVal + 'px';
		} );
		defineProperty( this.size, 'w', 0 , function(newVal, oldVal){
			_this.el.style.width = newVal + 'px';
		} );
		defineProperty( this.size, 'h', 0, function(newVal, oldVal){
			_this.el.style.height  = newVal + 'px';
		} );
		defineProperty( this, 'is_show', false, function(newVal, oldVal){
			if( newVal ){
				_this.el.style.display = 'block';
			} else {
				_this.el.style.display = 'none';
			}
		} );
	},
	bind_move: function(){
		this.el.addEventListener('dragstart', this.dragstart.bind(this), false);
		this.el.addEventListener('drag', this.dragmove.bind(this), false);
		this.el.addEventListener('dragend', this.dragend.bind(this), false);
	},
	bind_rezie: function(){
		if( this.resizes.length > 0 ) return;

		let frag = document.createFragement(),
			resize = null,
			resizes = [
			'xy-resize-top-left',
			'xy-resize-top-cent',
			'xy-resize-top-righ',
			'xy-resize-middle-l',
			'xy-resize-middle-r',
			'xy-resize-bottom-l',
			'xy-resize-bottom-c',
			'xy-resize-bottom-r'
		];
		for( let i = 0, len = resizes.length; i < len; i++ ){
			resize = document.createElement('span');
			resize.className = resizes[i];
			this.el_resizes.push(resize);
			frag.append(resize);
		}
		this.el.appendChild(frag);
	},
	bind_rotate: function(){
		
	},
	set_coord(coord){
		this.axis.x = coord.x;
		this.axis.y = coord.y;
		this.size.w = coord.w;
		this.size.h = coord.h;
		this.set_record();
	},
	dragstart: function(event){
		event.stopPropagation();
		event.dataTransfer.setDragImage(shadow, 0,  0);
		this.mouse.x = event.clientX;
		this.mouse.y = event.clientY;
	},
	dragmove(event){
		event.stopPropagation();
		if( event.clientX == 0 && event.clientY == 0 ) return;
		this.axis.x = this.axis_bf.x + event.clientX - this.mouse.x;
		this.axis.y = this.axis_bf.y + event.clientY - this.mouse.y;
	},
	dragend: function(event){
		event.stopPropagation();
		this.set_record();
	},
	set_record: function(){
		this.axis_bf.x = this.axis.x
		this.axis_bf.y = this.axis.y
	},
	resize: function(){

	},
	resizeend: function(){

	},
	destroy: function(){

	}
};

XyDragmove.prototype.init.prototype = XyDragmove.prototype;
