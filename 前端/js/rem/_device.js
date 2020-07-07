function discernDevice () {
  let UA = window.navigator.userAgent

  let device = {
    os: 'others', // 默认安卓
    isWechat: /MicroMessenger/.test(UA),
    isMobile: /AppleWebKit.*Mobile.*/.test(UA)
  }
  if (/Android/.test(UA)) {
    device.os = 'android'
  } else if (/iPhone|iPad|iPod/.test(UA)) {
    device.os = 'ios'
  } else if (/Windows/.test(UA)) {
    device.os = 'windows'
  }
  return device
}