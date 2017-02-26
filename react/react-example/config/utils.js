var path 				= require('path'),
	ExtractTextPlugin 	= require('extract-text-webpack-plugin');

exports.assetsPath = function (_path) {
	var assetsSubDirectory = process.env.NODE_ENV === 'production'
		? 'static'
		: 'static'
	return path.posix.join(assetsSubDirectory, _path)
};

exports.cssLoaders = function (options) {
	options = options || {}
	function generateLoaders (loaders) {
		var sourceLoader = loaders.map(function (loader) {
			var extraParamChar;
			if (/\?/.test(loader)) {
				loader = loader.replace(/\?/, '-loader?')
				extraParamChar = '&'
			} else {
				loader = loader + '-loader'
				extraParamChar = '?'
			}
			return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
		}).join('!')

		if (options.extract) {
			return ExtractTextPlugin.extract('style-loader', sourceLoader)
		} else {
			return ['style-loader', sourceLoader].join('!')
		}
	}

	return {
		css:      generateLoaders(['css']),
		postcss:  generateLoaders(['css', 'postcss']),
		less:     generateLoaders(['css', 'less']),
		sass:     generateLoaders(['css', 'sass']), // ?indentedSyntax
		scss:     generateLoaders(['css', 'sass']),
		stylus:   generateLoaders(['css', 'stylus']),
		styl:     generateLoaders(['css', 'stylus'])
	}
};

exports.styleLoaders = function (options) {
	var output  = [],
		loaders = exports.cssLoaders(options);
	for (var extension in loaders) {
		var loader = loaders[extension]
		output.push({
			test: new RegExp('\\.' + extension + '$'),
			loader: loader
		})
	}
	return output
};