function setViewPort(width){

	var scale = Math.floor(window.screen.availWidth*100/width)/100;
	var content = 'initial-scale=' + scale + ', minimum-scale=' + scale + ', maximum-scale=' + scale + ',user-scalable=no,width=device-width';
	viewportEl.setAttribute('name', 'viewport');
	viewportEl.setAttribute('content', content);
}