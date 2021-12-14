//server.js
const http = require("http")
const pid = process.pid

http
  .createServer((req, res) => {
    // for (let i = 0; i < 1e7; i++) {
    //   //模拟CUP计算任务 
    //   console.log(`i=${i}`)
    // }
    res.end(`Hanlded by process ${pid}`)
  })
  .listen(4000, () => {
    console.log(`Started process ${pid}`)
  })


