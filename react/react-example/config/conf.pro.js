var path                =	require('path'),
	utils               =	require('./utils'),
	webpack             =	require('webpack'),
	merge               =	require('webpack-merge'),
	chunks 				=   require('./chunks'),
	baseWebpack         =	require('./webpack.config.js'),
	ExtractTextPlugin   =	require('extract-text-webpack-plugin'),
	HtmlWebpackPlugin   =	require('html-webpack-plugin');

var plugins = [];
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
		filename: path.resolve(__dirname, '../dist/' + name + '.html'),
		template: path.resolve(__dirname, '../src/pages/' + name + '.html'),
		inject: true,
		chunks: entryChunks, 	
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
	// devtool: true ? '#source-map' : false,
	output: {
		path: 			path.resolve(__dirname, '../dist'),
		filename: 		utils.assetsPath('js/[name].js?[chunkhash]')
		/*,chunkFilename: 	utils.assetsPath('js/[id].js')*/
	},
	module: {
		loaders: utils.styleLoaders({ sourceMap: true, extract: true })
	},
	vue: {
		loaders: utils.cssLoaders({
			sourceMap: 	false,
			extract: 	true
		})
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.DedupePlugin(),
		new ExtractTextPlugin(utils.assetsPath('css/[name].css?[chunkhash]')), 	//单独使用style标签加载css并设置其路径
	].concat(plugins)
});

module.exports = newWebpack;