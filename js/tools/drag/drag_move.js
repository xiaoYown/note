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
		this.axis_bf 	= axis;

		/* 回调绑定 */
		this._dragstart 	= dragstart;
		this._dragmove  	= dragmove;
		this._dragend   	= dragend;
		this._rotatestart 	= rotatestart;
		this._rotating 		= rotating;
		this._rotateend 	= rotateend;
		/* 数据初始化 */
		this.dataInit();
		/* 视图绑定 */
		this.bindView();
		/* 事件绑定 */
		this.bind_move();
		if( isResize )
			this.bind_resize();
		if( isRotate )
			this.bind_rotate();
		return this;
	},
	dataInit(){
		this.el_resizes = []; 		// resizes元素
		this.el_rotate = null;		// rotate元素
		this.mouse = {
			x: 0,
			y: 0,
		};
		this.axis_bf = {
			x: 0,
			y: 0,
		};
		this.axis = {
			// x: 0,
			// y: 0,
		};
		this.size ={
			w: 0,
			h: 0,
		};
		this.deg = 0;
	},
	bindView(){
		let _this = this;
		defineProperty( this.axis, 'x', this.axis_bf.x , function(newVal, oldVal){
			_this.el.style.left = newVal + 'px';
		} );
		defineProperty( this.axis, 'y', this.axis_bf.y, function(newVal, oldVal){
			_this.el.style.top  = newVal + 'px';
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
	dragstart: function(event){
		event.dataTransfer.setDragImage(shadow, 0,  0);
		this.mouse.x = event.clientX;
		this.mouse.y = event.clientY;
	},
	dragmove(event){
		if( event.clientX == 0 && event.clientY == 0 ) return;
		this.axis.x = this.axis_bf.x + event.clientX - this.mouse.x;
		this.axis.y = this.axis_bf.y + event.clientY - this.mouse.y;
	},
	dragend: function(){
		console.log('---')
		this.axis_bf.x = this.axis.x
		this.axis_bf.y = this.axis.y
	},
	resize: function(){

	},
	destroy: function(){

	}
};

XyDragmove.prototype.init.prototype = XyDragmove.prototype;
