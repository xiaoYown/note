https://drafts.csswg.org/css-font-loading/

var font = new FontFace('newfont', 'url(/static/font-test-2.woff)', {})

font.load().then(function (loadedFace) {
    document.fonts.add(loadedFace);
    _this.font = 'newfont'
})