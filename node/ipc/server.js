const net = require("net");
const path = require("path");
const fs = require("fs");

const ipcPath = path.resolve("ctl.sock");

const TEST_LINK_SUCCESS = "TEST_LINK_SUCCESS";
const TEST_LINK_FAILED = "TEST_LINK_FAILED";

const isFile = (name) => {
  try {
    const stats = fs.statSync(name);
    return !stats.isDirectory();
  } catch (_error) {
    return false;
  }
};

const removeFile = (name) => {
  fs.unlinkSync(name);
};

function isServerActive() {
  return new Promise((resolve) => {
    try {
      const client = net
        .createConnection({ path: ipcPath }, () => {
          client.end();
          resolve({ status: TEST_LINK_SUCCESS });
        })
        .on("error", (error) => {
          resolve({
            status: TEST_LINK_FAILED,
            error,
          });
        });
    } catch (error) {
      resolve({
        status: TEST_LINK_FAILED,
        error,
      });
    }
  });
}

function isSocketPathFileExist(name) {
  return isFile(name);
}

function createServer(ctlPath) {
  isServerActive()
    .then(({ status }) => {
      if (status === TEST_LINK_SUCCESS) {
        console.log("Link is exist.");
        return;
      }
      if (isSocketPathFileExist(ipcPath)) {
        console.log("Delete link file.");
        removeFile(ipcPath);
      }
      const server = net.createServer((connection) => {
        console.log("client connected");
        connection.on("end", () => {
          console.log("client disconnected");
        });
        connection.on("data", (data) => {
          console.log(JSON.stringify(JSON.parse(data.toString()), null, 2));
        });
        connection.pipe(connection);
      });

      server.on("data", (data) => {
        console.log(data);
      });

      // server.on("connection", (e) => {
      //   console.log(e);
      // });

      server.on("error", (e) => {
        if (e.code === "EADDRINUSE") {
          console.log("Address in use, retrying...");
          setTimeout(() => {
            server.close();
          }, 1000);
        }
      });

      server.listen({
        path: ctlPath,
        exclusive: true,
        readableAll: true,
        writableAll: true,
      });
    })
    .catch((error) => {
      console.log("****** Error ******");
      console.log(error);
    });
}

createServer(ipcPath);
