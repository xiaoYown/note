var config = require('./lintconfig');

var cmd = new ActiveXObject("WScript.Shell");

var files = config.path;

for (var i = 0, len = files.length; i < len; i++) {
	fs.watch(files[i], { encoding: 'buffer' }, (eventType, filename) => {
		cmd.run(`eslint ${files[i]}`);
	});
}

// task
// all files
// watch and show warn change file