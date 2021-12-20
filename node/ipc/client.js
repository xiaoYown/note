const net = require("net");
const path = require('path');

function createClient(ctlPath) {
  const client = net.createConnection({ path: ctlPath }, () => {
    // 'connect' 监听器。
    console.log("connected to server!");
    client.write("world!\r\n");
  });
  client.on("data", (data) => {
    console.log(data.toString());
    client.end();
  });
  client.on("end", () => {
    console.log("disconnected from server");
  });
}

createClient(path.resolve("ctl.sock"));
