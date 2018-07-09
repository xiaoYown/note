function saveImg (e) {
  e.preventDefault();
  var imageUrl = 'http://...'
  var oPop = window.open(imageUrl, "qrcode", "width=1,height=1,top=5000,left=5000");
  for (; oPop.document.readyState != "complete";) {
    if (oPop.document.readyState == "complete") {
      break;
    }
  }
  oPop.document.execCommand("SaveAs");
  oPop.close();
}
