var path                =	require('path'),
	utils               =	require('./utils'),
	webpack             =	require('webpack'),
	merge               =	require('webpack-merge'),
	chunks 				=   require('./chunks'),
	config 				= 	require('../config'),
	baseWebpack         =	require('./webpack.config.js'),
	ExtractTextPlugin   =	require('extract-text-webpack-plugin'),
	HtmlWebpackPlugin   =	require('html-webpack-plugin');

var plugins =  [
	new webpack.DefinePlugin({
		'process.env': config.build.env
	}),
	new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false
		}
	}),
	new webpack.optimize.OccurenceOrderPlugin(),
	new ExtractTextPlugin(utils.assetsPath('css/[name].css?[chunkhash]')), 	//单独使用style标签加载css并设置其路径
];
chunks.forEach(function(item){
	plugins.push(
		new webpack.optimize.CommonsChunkPlugin(item)
	);
});
Object.keys(baseWebpack.entry).forEach(function(name){
	var entryChunks = [ name ];
	chunks.forEach(function(item){
		if( item.chunks == Infinity || !item.chunks || item.chunks.indexOf( name ) != -1 ){
			entryChunks.push( item.name );
		}
	});
	var plugin = new HtmlWebpackPlugin({
		filename: path.resolve(__dirname, `../dist/${name}.html`),
		template: path.resolve(__dirname, `../src/pages/${name}.html`),
		favicon: config.build.favicon,
		inject: true,
		chunks: entryChunks, 		// 多文件打包引入
		minify: {
			removeComments: true,
			collapseWhitespace: true,
			removeAttributeQuotes: true
		},
		chunksSortMode: 'dependency'
	});
	plugins.push(plugin);
});

var newWebpack = merge(baseWebpack, {
	output: {
		filename: utils.assetsPath('js/[name].js?[chunkhash]')
	},
	module: {
		loaders: utils.styleLoaders({ sourceMap: config.build.productionSourceMap, extract: true })
	},
	vue: {
		loaders: utils.cssLoaders({
			sourceMap: 	config.build.productionSourceMap,
			extract: 	true
		})
	},
	plugins: plugins
});

module.exports = newWebpack;