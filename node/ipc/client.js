const net = require("net");
const path = require("path");

function sendMessage(ctlPath, content) {
  const client = net.createConnection({ path: ctlPath }, () => {
    // 'connect' 监听器。
    console.log("connected to server!");
    client.write(content);
    client.end();
  });
  // client.on("data", (data) => {
  //   console.log(data.toString());
  //   // client.end();
  // });
  // client.on("end", () => {
  //   console.log("disconnected from server");
  // });
}

function createClient(ctlPath) {
  process.stdin.setEncoding("utf-8");

  process.stdin.on("readable", () => {
    let input;

    while ((input = process.stdin.read()) !== null) {
      const command = input.trim();

      if (command === "exit") process.exit();

      process.stdout.write(`input -> ${command}\n`);

      sendMessage(
        ctlPath,
        JSON.stringify({
          pid: process.pid,
          content: command,
        })
      );
    }
  });

  // 从标准输入开始读取，因此进程不会退出。
  // process.stdin.resume();

  // process.on("SIGINT", () => {
  //   console.log("Received SIGINT.");
  //   process.exit(0);
  // });

  // // 使用单个函数处理多个信号
  // function handle(signal) {
  //   console.log(`Received ${signal}`);
  // }

  // process.on("SIGINT", handle);
  // process.on("SIGTERM", handle);
}

createClient(path.resolve("ctl.sock"));
