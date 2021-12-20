const net = require('net');
const path = require('path');
const { mkdirSync, writeFileSync } = require('fs');
const constants = require('./constants');

const {
  flowsCompose,
  isFolder,
  isFile,
  json2yaml,
  getRepeaterIpcPath,
} = require('./utils');

function isRepeaterServiceActive () {
  return new Promise((resolve) => {
    try {
      net
        .createConnection({ path: ipcPath }, () => {
          client.close();
          resolve({ status: constants.TEST_REPEATER_LINK_SUCCESS })
        })
        .on('error', error => {
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

function tryCreateRepeaterService (ctlPath) {
  net
    .createServer()
    .listen(ctlPath);
}

function tryCreateRepeaterService() {
}

/** 生成配置文件默认内容 */
function createRepeaterSettingFileDefaultContent () {
  const time = (new Date()).toLocaleString();
  const content = {
    name: 'lang-manage-repeater',
    ipcPath: getRepeaterIpcPath(),
    pid: process.pid,
    createTime: time,
    updateTime: time,
  };
  return json2yaml(content);
};

/** 创建客户端配置 */
function createClientsSettingFileContent () {
  const time = (new Date()).toLocaleString();
  const content = {
    name: 'lang-manage-clients',
    createTime: time,
    updateTime: time,
    clients: [],
  };
  return json2yaml(content);
};

/** 判断配置目录是否存在 */
function isExistSettingFolder () {
  return isFolder(constants.settingFolder);
}

/** 尝试创建配置目录 */
function tryCreateSettingFolder () {
  if (isExistSettingFolder()) return;

  return () => {
    mkdirSync(constants.settingFolder, { recursive: true });
  };
}

/** 尝试创建配置文件 */
function tryCreateSettingFile (name, content) {
  return () => {
    if (isFile(name)) return;
  
    return () => {
      writeFileSync(name, content, { encoding: 'utf8' });
    };
  }
}

function initializeSettings () {
  flowsCompose()
    .exec(tryCreateSettingFolder)
    .exec(
      tryCreateSettingFile(
        path.join(
          constants.settingFolder,
          constants.repeaterSettingFilename
        ),
        createRepeaterSettingFileDefaultContent()
      )
    )
    .exec(
      tryCreateSettingFile(
        path.join(
          constants.settingFolder,
          constants.clientsSettingFilename,
        ),
        createClientsSettingFileContent()
      )
    )
}

/* 中继器是否处于激活状态 */
function isActive () {

}

function startRepeater () {
  if (isActive()) {
    return;
  }
  // return function () {
  //   const server = net.createServer((socket) => {
  //     socket.end('goodbye\n');
  //   }).on('error', (err) => {
  //     // 在这里处理错误。
  //     throw err;
  //   });
    
  //   // 获取任意未使用的端口。
  //   server.listen(4000, () => {
  //     console.log('opened server on', server.address());
  //   });
  // };
}

function execRepeaterFlows () {
  flowsCompose()
    .exec(initializeSettings)
    .exec(startRepeater);
}



function start () {
  execRepeaterFlows();
}

start();

