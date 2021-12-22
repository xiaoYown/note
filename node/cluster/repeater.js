const net = require("net");
const path = require("path");
const { mkdirSync, writeFileSync } = require("fs");
const constants = require("./constants");
const { flowsCompose } = require("./flow-exec");
const { isFolder, isFile, json2yaml, getRepeaterIpcPath } = require("./utils");

/** 判断中继器服务是否已启动 */
function isRepeaterServiceActive() {
  return new Promise((resolve) => {
    try {
      const client = net
        .createConnection({ path: ipcPath }, () => {
          client.end();
          resolve({ status: constants.TEST_REPEATER_LINK_SUCCESS });
        })
        .on("error", (error) => {
          resolve({
            status: constants.TEST_REPEATER_LINK_FAILED,
            error,
          });
        });
    } catch (error) {
      resolve({
        status: constants.TEST_REPEATER_LINK_FAILED,
        error,
      });
    }
  });
}

/** 判断是否存在通信文件 */
function isSocketPathFileExist(name) {
  return isFile(name);
}

/** 尝试创建中继器服务 */
function tryCreateRepeaterService(ctlPath) {
  return () => isRepeaterServiceActive()
    .then(({ status }) => {
      if (status === TEST_LINK_SUCCESS) {
        console.log("Link is exist.");
        return;
      }
      if (isSocketPathFileExist(ipcPath)) {
        console.log("Delete link file.");
        removeFile(ipcPath);
      }
      const server = net.createServer();
      server.listen({
        path: ctlPath,
        exclusive: true,
        readableAll: true,
        writableAll: true,
      });

      server.on("data", (data) => {
        console.log(data);
      });

      server.on("error", (e) => {
        if (e.code === "EADDRINUSE") {
          console.log("Address in use, retrying...");
          setTimeout(() => {
            server.close();
          }, 1000);
        }
      });
    })
    .catch((error) => {
      console.log("****** Error ******");
      console.log(error);
    });
}

/** 生成配置文件默认内容 */
function createRepeaterSettingFileDefaultContent() {
  const time = new Date().toLocaleString();
  const content = {
    name: "lang-manage-repeater",
    ipcPath: getRepeaterIpcPath(),
    pid: process.pid,
    createTime: time,
    updateTime: time,
  };
  return json2yaml(content);
}

/** 创建客户端配置文件默认内容 */
function createClientsSettingFileDefaultContent() {
  const time = new Date().toLocaleString();
  const content = {
    name: "lang-manage-clients",
    createTime: time,
    updateTime: time,
    clients: [],
  };
  return json2yaml(content);
}

/** 判断配置目录是否存在 */
function isExistSettingFolder() {
  return isFolder(constants.settingFolder);
}

/** 尝试创建配置目录 */
function tryCreateSettingFolder() {
  if (isExistSettingFolder()) return;

  return () => {
    mkdirSync(constants.settingFolder, { recursive: true });
  };
}

/** 尝试创建配置文件 */
function tryCreateSettingFile(name, content) {
  return () => {
    if (isFile(name)) return;

    return () => {
      writeFileSync(name, content, { encoding: "utf8" });
    };
  };
}

/** 尝试生成配置文件 */
function tryCreateSettingFiles() {
  flowsCompose()
    .exec(tryCreateSettingFolder)
    .exec(
      tryCreateSettingFile(
        path.join(constants.settingFolder, constants.repeaterSettingFilename),
        createRepeaterSettingFileDefaultContent()
      )
    )
    .exec(
      tryCreateSettingFile(
        path.join(constants.settingFolder, constants.clientsSettingFilename),
        createClientsSettingFileDefaultContent()
      )
    );
}

/** 执行启动流程 */
function execRepeaterFlows() {
  flowsCompose()
    .exec(tryCreateSettingFiles)
    .exec(tryCreateRepeaterService);
}

function start() {
  execRepeaterFlows();
}

start();
