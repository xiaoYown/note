const path = require("path");

const settingFolder = path.join(__dirname, ".xv-lang-manage");

const join = (name) => path.join(settingFolder, name);

/** socket path */
module.exports.repeaterSocket = join("repeater.sock");

module.exports.settingFolder = settingFolder;

/** 中继器配置 */
module.exports.repeaterSettingFilename = "setting.repeater.yml";

/** 各项目配置 */
module.exports.clientsSettingFilename = "setting.clients.yml";

/** 测试中继服务连接状态 */
module.exports.TEST_REPEATER_LINK_SUCCESS = "TEST_REPEATER_LINK_SUCCESS";
module.exports.TEST_REPEATER_LINK_FAILED = "TEST_REPEATER_LINK_FAILED";
