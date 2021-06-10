const http = require('http');

const server = http.createServer();

server.listen(3000, () => {
  process.title = 'Node 进程测试';
  console.log('进程id', process.pid)
});


