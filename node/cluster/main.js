const cluster = require("cluster");
const os = require("os");

console.log(cluster.isMaster)

if (cluster.isMaster) {
  const cpus = os.cpus().length;//cup内核数量

  console.log(`Forking for ${cpus} CPUs`);
  for (let i = 0; i < cpus; i++) {
    cluster.fork();// 使用 cluster.fork 创建子进程
  }
} else {
  require("./server");
}
