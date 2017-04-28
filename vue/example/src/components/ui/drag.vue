<template lang="jade">
	.xy-drag-container(
		@mousedown="dragStart",
		:style="style",
		@drag.prevent="",
		@dragstart.prevent=""
	)
		button.xy-rotate(
			@mousedown.stop="rotateStart"
		)
		span.xy-drag-resize.xy-resize-t-l(
			@mousedown.stop="resizeStart"
		)
		span.xy-drag-resize.xy-resize-t-c(
			@mousedown.stop="resizeStart"
		)
		span.xy-drag-resize.xy-resize-t-r(
			@mousedown.stop="resizeStart"
		)
		span.xy-drag-resize.xy-resize-m-l(
			@mousedown.stop="resizeStart"
		)
		span.xy-drag-resize.xy-resize-m-r(
			@mousedown.stop="resizeStart"
		)
		span.xy-drag-resize.xy-resize-b-l(
			@mousedown.stop="resizeStart"
		)
		span.xy-drag-resize.xy-resize-b-c(
			@mousedown.stop="resizeStart"
		)
		span.xy-drag-resize.xy-resize-b-r(
			@mousedown.stop="resizeStart"
		)
</template>

<script>
	function reTain(num, n){
		return Math.floor(num*Math.pow(10, n))/Math.pow(10, n)
	}
	export default {
		data(){
			return {
				/* 功能状态 */
				isDrag  : false,
				isRotate: false,
				isResize: false,
				/* 数据存储 */
				axis:     {},
				axis_bf:  {},
				center: {},
				deg_bf: 0,
				deg_op: 0,
				/* 样式存储 */
				style: {},
				/* 鼠标按下时坐标 */
				mouse: {},
				/* resizeBtn */
				resizeBtn: '',
			}
		},
		watch: {
			axis: {
				handler(newVal){
					this.setStyle(newVal);
				},
				deep: true,
			},
		},
		created(){
			this.axis = {
				x: 20,
				y: 20,
				w: 200,
				h: 200,
				r: 0,
			}
		},
		mounted(){
			document.body.addEventListener('mousemove', this.mousemove);
			document.body.addEventListener('mouseup', this.mouseup);
		},
		beforeDestroy(){
			document.body.removeEventListener('mousemove', this.mousemove);
			document.body.removeEventListener('mouseup', this.mouseup);
		},
		methods: {
			setMouse(event){
				this.mouse = {
					x: event.clientX,
					y: event.clientY,
				};
			},
			mosuedown(){
				this.axis_bf = {
					x: this.axis.x,
					y: this.axis.y,
					w: this.axis.w,
					h: this.axis.h,
					r: this.axis.r,
				};
			},
			mousemove(event){
				if( this.isDrag )   { 
					this.draging(event);
				}
				if( this.isResize ) { 
					this.resizing(event);
				}
				if( this.isRotate ) { 
					this.rotating(event);
				}
			},
			mouseup(event){
				if( this.isDrag )   { 
					this.dragend(event);
				}
				if( this.isResize ) { 
					this.resized(event);
				}
				if( this.isRotate ) { 
					this.rotated(event);
				}

				this.isDrag     = false;
				this.isResize   = false;
				this.isRotate   = false;
			},
			changing(axis){
				this.setStyle(axis);
				this.$emit('changing', axis);
			},
			changed(axis){
				this.axis = axis;
				console.log(JSON.stringify(axis))
				this.$emit('changed', axis);
			},
			dragStart(event){
				this.mosuedown();

				this.setMouse(event);
				this.isDrag     = true;
			},
			resizeStart(event){
				this.mosuedown();

				this.resizeBtn = event.target.className.match(/xy\-resize\-([^\s]+)(\s|$)/)[1];

				this.setMouse(event);
				this.isResize   = true;
			},
			rotateStart(event){
				this.mosuedown();

				this.deg_bf = this.axis.r;

				this.getCenter();

				let l_a = event.clientY - this.center.y,
					l_b = event.clientX - this.center.x;

				if( l_a < 0 && l_b >= 0 ){
					this.deg_op = Math.atan( l_b / -l_a )*180 / Math.PI;
				} else if( l_a >= 0 && l_b > 0 ){
					this.deg_op = Math.atan( l_a / l_b )*180 / Math.PI + 90;
				} else if(  l_a > 0 && l_b <= 0 ){
					this.deg_op = 270 - Math.atan( l_a / -l_b )*180 / Math.PI;
				} else if(  l_a <= 0 && l_b < 0 ){
					this.deg_op = Math.atan( -l_a / -l_b )*180 / Math.PI + 270;
				}
				this.setMouse(event);
				this.isRotate   = true;
			},
			draging(event){
				if( event.clientX == 0 && event.clientY == 0 ) return;
				let axis = {
					x: this.axis_bf.x + ( event.clientX - this.mouse.x ),
					y: this.axis_bf.y + ( event.clientY - this.mouse.y ),
					w: this.axis_bf.w,
					h: this.axis_bf.h,
					r: this.axis_bf.r,
				};
				this.setAxis(axis);
			},
			dragend(event){
				this.draging(event);
				this.changed(this.axis);
			},
			getCenter(){
				let center = {
					x: this.$el.offsetLeft  + this.axis.w/2,
					y: this.$el.offsetTop + 48 + this.axis.h/2,
				};
				this.center = center;
			},
			rotating(event){
				if( event.clientX == 0 && event.clientY == 0 ) return;

				let y_d = this.center.y - event.clientY,
					deg_ed = 0;
				if( y_d < 0 ){
					deg_ed = 180 - Math.atan( (event.clientX - this.center.x) / ( 0 - y_d ) )*180 / Math.PI;
				} else {
					deg_ed = Math.atan( (event.clientX - this.center.x) / y_d )*180 / Math.PI;
				}

				let deg = this.deg_bf + Math.floor(deg_ed - this.deg_op);

				this.axis.r = deg < 0 ? deg + 360 : deg >= 360 ? deg - 360 : deg;

			},
			rotated(){
				this.changed(this.axis);
			},
			resizing(event){
				let 
					// 未发生改变属性
					axis = {
						x: this.axis.x,
						y: this.axis.y,
						w: this.axis.w,
						h: this.axis.h,
					},
					// 鼠标移动距离
					distance = { x: event.clientX - this.mouse.x, y: event.clientY - this.mouse.y },
					// x/y/w/h 变化值
					_axis = {
						x: 0,
						y: 0,
						w: 0,
						h: 0,
					},
					// resize 前旋转角度与等腰三角形夹角
					deg_c  = 0,
					// resizing 旋转角度与等腰三角形夹角
					deg_c_ = 0,
					// resize 前旋转角度与等腰三角 腰 l
					z  = 0,
					// resizing 旋转角度与等腰三角 腰 l
					_z = 0,
					// 发生旋转时稳定点坐标
					coord  = { x: 0, y: 0 },
					// 发生旋转时不稳定点坐标
					_coord = { x: 0, y: 0 };

				switch( this.resizeBtn ){
					case 'm-r':
						if( this.axis.r >= 0 && this.axis.r < 45 ){
							_axis.w = distance.x/Math.cos(this.axis.r*Math.PI/180);
						} else if( this.axis.r >= 45 && this.axis.r < 90){
							_axis.w = distance.y/Math.sin(this.axis.r*Math.PI/180);
						} else if( this.axis.r >= 90 && this.axis.r < 135 ){
							_axis.w = distance.y/Math.sin(this.axis.r*Math.PI/180);
						} else if( this.axis.r >= 135 && this.axis.r < 180  ){
							_axis.w = distance.x/Math.cos(this.axis.r*Math.PI/180);
						} else if( this.axis.r >= 180 && this.axis.r < 225 ){
							_axis.w = distance.x/Math.cos(this.axis.r*Math.PI/180);
						} else if( this.axis.r >= 225 && this.axis.r < 270 ){
							_axis.w = distance.y/Math.sin(this.axis.r*Math.PI/180);
						} else if( this.axis.r >= 270 && this.axis.r < 315 ){
							_axis.w = distance.y/Math.sin(this.axis.r*Math.PI/180);
						} else if( this.axis.r >= 315 && this.axis.r < 360 ){
							_axis.w = distance.x/Math.cos(this.axis.r*Math.PI/180);
						}

						axis.w = this.axis_bf.w + _axis.w;

						if( axis.w < 0 )
							axis.w = 0;

						if( this.axis.r != 0 ){
							deg_c  = Math.atan(this.axis_bf.h/this.axis_bf.w)  + this.axis.r*Math.PI/180;
							deg_c_ = Math.atan(this.axis.h/this.axis.w) + this.axis.r*Math.PI/180;
							z      = Math.sqrt((Math.pow(this.axis_bf.h, 2) + Math.pow(this.axis_bf.w, 2))/4),
							_z     = Math.sqrt((Math.pow(this.axis.h, 2) + Math.pow(this.axis.w, 2))/4);

							coord = {
									x: this.axis_bf.x + this.axis_bf.w/2 - z*Math.cos(deg_c),
									y: this.axis_bf.y + this.axis_bf.h/2 - z*Math.sin(deg_c),
								},
								_coord = {
									x: this.axis.x + this.axis.w/2 - _z*Math.cos(deg_c_),
									y: this.axis.y + this.axis.h/2 - _z*Math.sin(deg_c_),
								};
							_axis = {
								x: coord.x - _coord.x,
								y: coord.y - _coord.y,
							};
							axis.x = this.axis.x + _axis.x;
							axis.y = this.axis.y + _axis.y;
						}
						break;
				}
				
				axis.x = reTain(axis.x, 2);
				axis.w = reTain(axis.w, 2);
				axis.y = reTain(axis.y, 2);
				axis.h = reTain(axis.h, 2);
				axis.r = this.axis.r;

				this.setAxis(axis);
			},
			resized(event){
				let axis = {
					x: parseInt(this.style.left),
					y: parseInt(this.style.top),
					w: parseInt(this.style.width),
					h: parseInt(this.style.height),
					r: this.axis.r,
				};
				this.changed(axis);
			},
			/* 提供外部调用 */
			setAxis(axis){
				this.axis = axis;
			},
			setStyle(axis){
				this.style = {
					top   : axis.y + 'px',
					left  : axis.x + 'px',
					width : axis.w + 'px',
					height: axis.h + 'px',
					transform: 'rotate(' + axis.r + 'deg)',
				};
			},
		},
	}
</script>

<style lang="sass">
	.xy-drag-container{
		position: absolute;
		top: 0;
		left: 0;
		border: 1px solid #999;
		width: 100px;
		height: 100px;
		box-sizing: border-box;
		cursor: move;
	}
	.xy-drag-resize{
		position: absolute;
		border: 1px solid #999;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		box-sizing: border-box;
		background-color: #fff;
		cursor: pointer;
	}
	.xy-resize-t-l{
		top: -5px;
		left: -5px;
		cursor: nw-resize;
	}
	.xy-resize-t-c{
		top: -5px;
		left: 50%;
		margin-left: -5px;
		cursor: n-resize;
	}
	.xy-resize-t-r{
		top: -5px;
		right: -5px;
		cursor: ne-resize;
	}
	.xy-resize-m-l{
		top: 50%;
		left: -5px;
		margin-top: -5px;
		cursor: e-resize;
	}
	.xy-resize-m-r{
		top: 50%;
		right: -5px;
		margin-top: -5px;
		cursor: e-resize;
	}
	.xy-resize-b-l{
		bottom: -5px;
		left: -5px;
		cursor: sw-resize;
	}
	.xy-resize-b-c{
		bottom: -5px;
		left: 50%;
		margin-left: -5px;
		cursor: n-resize;
	}
	.xy-resize-b-r{
		bottom: -5px;
		right: -5px;
		cursor: se-resize;
	}
	.xy-rotate{
		position: absolute;
		top: -60px;
		left: 50%;
		margin-left: -20px;
		width: 40px;
		height: 40px;
		border: 1px solid #999;
		border-radius: 50%;
		box-sizing: border-box;
		background-color: #fff;
	}
	.box{
		position: absolute;
		top: 300px;
		left: 300px;
		width: 300px;
		height: 300px;
		background-color: #56aaff;
	}
</style>