require('shelljs/global'); // can replace unix shell scripts on nodejs

var path    =	require('path'),
	ora     =	require('ora'),
	webpack =	require('webpack');


var webpackMerge = require('./conf.pro');

console.log([
	'  Tip:\n' ,
	'  Built files are meant to be served over an HTTP server.\n' ,
	'  Opening index.html over file:// won\'t work.\n'
].join(''));

var spinner = ora('building for production...');
spinner.start();

var assetsPath = path.join(path.resolve(__dirname, '../dist'), 'static');
rm('-rf', assetsPath);
mkdir('-p', assetsPath);
cp('-R', 'static/', assetsPath);

webpack(webpackMerge, function (err, stats) {
	spinner.stop()
	if (err) throw err;
	process.stdout.write(stats.toString({
		colors: true,
		modules: false,
		children: false,
		chunks: false,
		chunkModules: false
	}) + '\n')
});