	/** 
	 * @param String color ---- 输入的颜色,格式 #000/#000000/rgba(0,0,0,.5)/rgba(0,0,0,0.5)/rgb(0,0,0)
	 */

	function Hex(){}

	Hex.s_t = function (ten){

		if( ten.constructor != String ) {
			console.log('param need string');
			return null
		}
		let _result = 0;

		for( let i = 0, len = ten.length; i < len; i++ ){
			let _num = 0;
			if( !/\d/.test(ten[i]) ){
				_num = ten[i].charCodeAt();
				if( _num < 97 ){
					_num += 32;
				}
				_num -= 87;
			} else {
				_num = parseInt( ten[i], 10 );
			}
			_num = _num*Math.pow(16, len - i - 1);  // 转进制
			_result += _num;
		}
		return _result
	}

	Hex.t_s = function (sixteen){

		if( sixteen.constructor != String && sixteen.constructor != Number ) {
			console.log('param need string or number');
			return null
		}

		if( sixteen.constructor == String )
			sixteen  = parseInt( sixteen, 10 );

		let remainder = sixteen%16,
			merchant  = Math.floor(sixteen/16);

		if( remainder < 10 ){
			remainder = remainder.toString();
		} else {
			remainder = String.fromCharCode(remainder + 87);
		}

		if( merchant == 0 ){
			return remainder
		}else if( merchant < 10 ){
			return merchant.toString() + remainder
		}else if( merchant < 16 ){
			return String.fromCharCode(merchant + 87) + remainder
		} else {
			return Hex.t_s(merchant) + remainder
		}

	}

	function colorFormat(color){
		"use strict";

		let 
			_hex    = '#fff',
			_rgba   = { r: null, g: null, b: null, a: 1 },

			__color = {
				rgba: null,
				hex:  null,
			};

		if( /\#/.test(color) ){ 										// 格式 #000

			let _color = '';

			if( color.length == 4 ){
				for( let i = 1; i < 4; i++ ){
					_color += (color[i] + color[i]);
				}
			} else if(color.length == 7) {
				_color = color.substring( 1, 7 );
			} else {
				console.warn('format error');
				return null
			}
			let calRgb = { 
				r: _color.substring( 0, 2), 
				g: _color.substring( 2, 4), 
				b: _color.substring( 4, 6) 
			};
			for( let key in calRgb ){
				_rgba[key] = Hex.s_t(calRgb[key]);
			}
			_hex = color;
		} else if ( /rgba/.test(color) ){ 							// 格式 rgba
			let _result = color.match(/\d+/g);
			
			_rgba.r = parseInt( _result[0], 10 );
			_rgba.g = parseInt( _result[1], 10 );
			_rgba.b = parseInt( _result[2], 10 );
			
			if( _result.length == 4 ){
				var _a = _result[3];
			} else if ( _result.length == 5 ){
				var _a = _result[4];
			}
			_rgba.a = parseInt(_a, 10)/(_a.length == 2 ? 100 : 10);
			_hex = '#' + 
					(Hex.t_s(_rgba.r).length == 2 ? '' : '0') + Hex.t_s(_rgba.r) + 
					(Hex.t_s(_rgba.g).length == 2 ? '' : '0') + Hex.t_s(_rgba.g) + 
					(Hex.t_s(_rgba.b).length == 2 ? '' : '0') + Hex.t_s(_rgba.b);

		} else if ( /rgb/.test(color) ){  							// 格式 rgb
			let _result = color.match(/\d+/g);
			_rgba.r = parseInt( _result[0], 10 );
			_rgba.g = parseInt( _result[1], 10 );
			_rgba.b = parseInt( _result[2], 10 );

			_hex = '#' + 
					(Hex.t_s(_rgba.r).length == 2 ? '' : '0') + Hex.t_s(_rgba.r) + 
					(Hex.t_s(_rgba.g).length == 2 ? '' : '0') + Hex.t_s(_rgba.g) + 
					(Hex.t_s(_rgba.b).length == 2 ? '' : '0') + Hex.t_s(_rgba.b);
		} else {
			console.warn('format error');
			return null
		}

		__color.rgba = _rgba;
		__color.hex  = _hex;
		return __color
	}