var path				=	require('path'),
	webpack 			=	require('webpack'),
	merge 				=	require('webpack-merge'),
	HtmlWebpackPlugin 	=	require('html-webpack-plugin'),
	utils				=	require('./utils'),
	baseWebpack			=	require('./webpack.config');

var plugins = [
	// new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify('development')
		}
	}),
	new webpack.ProvidePlugin({
		$: "jquery",
		jQuery: "jquery",
		"window.jQuery": "jquery"
	}),
	new webpack.NoErrorsPlugin(),
	new webpack.HotModuleReplacementPlugin()
];

Object.keys(baseWebpack.entry).forEach(function(name){

	baseWebpack.entry[name] = ['./config/dev-client'].concat(baseWebpack.entry[name]);

	var plugin = new HtmlWebpackPlugin({
		filename: name + '.html',
		template: path.resolve(__dirname, '../src/pages/' + name + '.html'), // page entries 
		inject: true,
		chunks: [name]
	});
	plugins.push(plugin);
});

var newWebpack = merge(baseWebpack, {
	module: {
		loaders: utils.styleLoaders({ sourceMap: false })
	},
	devtool: '#eval-source-map',
  	plugins: plugins
});

module.exports = newWebpack;

