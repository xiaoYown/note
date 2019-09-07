> event.clipboardData

				methods :
					---- setData( format, data )
						 * 设置剪切板中指定格式的数据
						 * 只能在 copy / cut 时进行设置
					---- getData( format )
						 * 获取剪切板中指定格式的数据
						 * 只能在 paste 时获取
					---- clearData( format )
						 * 删除剪切板中指定格式的数据
```javascript
var events = {
	copy: function(event){
		event.clipboardData.setData('text/plain','Hello, copy!');
		event.preventDefault();
	},
	cut: function(event){
		console.log(event.clipboardData.getData('text'));
		event.clipboardData.setData('text/plain','Hello, cut!');
		event.preventDefault();
	},
	paste: function(event){
		// 图片读取
		function imgReader( item ){
			var file = item.getAsFile();
		}
		var clipboardData = event.clipboardData,
			i = 0,
			items, item, types;

		if( clipboardData ){
			items = clipboardData.items;

			if( !items ){
				return;
			}

			item = items[0];
			types = clipboardData.types || [];

			for( ; i < types.length; i++ ){
				if( types[i] === 'Files' ){
					item = items[i];
					break;
				}
			}
			if( item && item.kind === 'file' && item.type.match(/^image\//i) ){
				// 图片对象
				imgReader( item );
			} else if ( item && item.kind === 'file' && item.type === 'text/plain' ){
				// 文本对象
				var text = clipboardData.getData('text');
			}
		}
	}
}

document.addEventListener('paste', events.paste);
document.addEventListener('copy' , events.copy );
document.addEventListener('cut'  , events.cut  );

document.getElementById('remove_copy').onclick = function(){
	document.removeEventListener('paste', events.paste)
	document.removeEventListener('copy' , events.copy)
	document.removeEventListener('cut'  , events.cut)
}
```