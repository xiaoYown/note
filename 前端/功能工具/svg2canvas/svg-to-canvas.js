/**
 * img_h  生成 img 宽高
 * img_w
 * el_h   元素宽高
 * el_w
 */
/* example
    convert(option, function(canvas) {
        _this.postStyle.call(_this, {
            img: canvas.toDataURL(), 
            name, 
            data, 
            type, 
            typeSub
        });
    });
*/

function convert(option, cb) {
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  var image = new Image();

  image.onload = function load() {
    canvas.width = option.width;
    canvas.height = option.height;

    ctx.drawImage(image, 0, 0, option.width, option.height);
    cb(canvas);
  };
  image.src =
    "data:image/svg+xml;charset-utf-8," +
    encodeURIComponent(option.svg.outerHTML);
}
