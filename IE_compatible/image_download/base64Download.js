function base64Img2Blob(base64Data) {
  let format = "image/png"
  let base64 = base64Data
  let code = window.atob(base64.split(",")[1])
  let aBuffer = new window.ArrayBuffer(code.length)
  let uBuffer = new window.Uint8Array(aBuffer)
  let blob = null;
  for (let i = 0; i < code.length; i++) {
    uBuffer[i] = code.charCodeAt(i) & 0xff
  }
  try {
    blob = new Blob([uBuffer], {type : format})
  } catch(e){
    window.BlobBuilder = window.BlobBuilder ||
      window.WebKitBlobBuilder ||
      window.MozBlobBuilder ||
      window.MSBlobBuilder
    if (e.name == 'TypeError' && window.BlobBuilder) {
      let bb = new window.BlobBuilder()
      bb.append(uBuffer.buffer)
      blob = bb.getBlob("image/png")
    } else if (e.name == "InvalidStateError") {
      blob = new Blob([aBuffer], {type : format})
    } else{
    }
  }
  return blob
} 

/**
 * @param {string} fileName - 下载文件名.
 * @param {string} base64Data - base64 数据.
 */
function downloadFile (fileName, base64Data) {
  let blob = base64Img2Blob(base64Data)
  window.navigator.msSaveBlob(blob, fileName + '.png')
}

export default downloadFile
