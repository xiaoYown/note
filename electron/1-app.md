#### 1. 窗口周期事件 
```javascript
const { app, BrowserWindow } = require('electron')

// 1.当应用程序完成基础的启动的时候被触发
app.on('will-finish-launching', func)

// 2.Electron 完成初始化时被触发
//    - app.isReady 判断该事件是否已经触发
//    - 进行创建 BrowserWindow 实例
app.on('ready', func)

// 3.当所有的窗口都被关闭时触发
//    - 监听此事件需主动退出程序, app.quit
app.on('window-all-closed', func)

// 4.在应用程序开始关闭窗口之前触发
app.on('before-quit', func)

// 5.当所有窗口都已关闭并且应用程序将退出时发出
app.on('will-quit', func)
```

#### 2.菜单
```javascript
// Menu API 需要在程序 ready 之后调用
const { Menu } = require('electron')

// menu 实例
let menu = new Menu()

// 静态方法
// 1.设置程序菜单(null 会溢出菜单)
// 效果同窗口实例 browserWindow.setMenu(menu)
Menu.setApplicationMenu(menu)


// 2.返回应用程序菜单(无返回 null)
Menu.getApplicationMenu()
Menu.sendActionToFirstResponder(action) // macOS
Menu.buildFromTemplate(template)

// 实例方法

```

