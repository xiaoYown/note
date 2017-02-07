// 颜色格式转换 rgba
	/** 
	 * @param String bgColor ---- 输入的颜色,格式 #000/#000000/rgba(0,0,0,.5)/rgba(0,0,0,0.5)/rgb(0,0,0)
	 */
	function toRgba(bgColor){
		let _rgba = { r: null, g: null, b: null, a: 1 };
		if( /\#/.test(bgColor) ){ 										// 格式 #000
			let _bgColor = '';
			if( bgColor.length == 4 ){
				for( let i = 1; i < 4; i++ ){
					_bgColor += (bgColor[i] + bgColor[i]);
				}
			} else if(bgColor.length == 7) {
				_bgColor = bgColor;
			} else {
				return null
			}
			let calRgb = { 
				r: _bgColor.substring( 0, 2), 
				g: _bgColor.substring( 2, 4), 
				b: _bgColor.substring( 4, 6) 
			};
			for( let key in calRgb ){
				let _result = 0;
				for( let i = 0, len = calRgb[key].length; i < len; i++ ){
					let _num = 0;
					if( !/\d/.test(calRgb[key][i]) ){
						_num = calRgb[key][i].charCodeAt();
						if( _num < 97 ){
							_num += 32;
						}
						_num -= 87;
					} else {
						_num = parseInt( calRgb[key][i], 10 );
					}
					_num = _num*Math.pow(16, len - i - 1);  // 转进制
					_result += _num;
				}
				_rgba[key] = _result;
			}
		} else if ( /rgba/.test(bgColor) ){ 							// 格式 rgba
			let _result = bgColor.match(/\d+/g);
			_rgba.r = parseInt( _result[0], 10 );
			_rgba.g = parseInt( _result[1], 10 );
			_rgba.b = parseInt( _result[2], 10 );

			if( _result.length == 4 ){
				var _a = _result[3];
			} else if ( _result.length == 5 ){
				var _a = _result[4];
			}
			_rgba.a = parseInt(_a, 10)/(_a.length == 2 ? 100 : 10);
		} else if ( /rgb/.test(bgColor) ){  							// 格式 rgb
			let _result = bgColor.match(/\d+/g);
			_rgba.r = parseInt( _result[0], 10 );
			_rgba.g = parseInt( _result[1], 10 );
			_rgba.b = parseInt( _result[2], 10 );
		} else {
			return null
		}
		return _rgba
	}