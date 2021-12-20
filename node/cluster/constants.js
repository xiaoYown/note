const path = require('path');

const join = name => path.join(__dirname, name);

module.exports.settingFolder = join('.xv-lang-manage');

/** 中继器配置 */
module.exports.repeaterSettingFilename = 'setting.repeater.yml';

/** 各项目配置 */
module.exports.clientsSettingFilename = 'setting.clients.yml';

/** 测试中继服务连接状态 */
module.exports.TEST_REPEATER_LINK_SUCCESS = 'TEST_REPEATER_LINK_SUCCESS';
module.exports.TEST_REPEATER_LINK_FAILED = 'TEST_REPEATER_LINK_FAILED';
