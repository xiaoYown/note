module.exports = function(grunt) {
	var banner = '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
	var lrPort = 3002;
	var lrMiddleware = function(connect, options) {
    return [
      // 把脚本，注入到静态文件中
      require('connect-livereload')({ port: lrPort }),
      // 静态文件服务器的路径
      connect.static(options.base[0]),
      // 启用目录浏览(相当于IIS中的目录浏览)
      connect.directory(options.base[0])
    ];
  };
	// Project configuration.
  grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			utils: {
				files: [{
					src: ['src/foo/foo.01.js', 'src/bar/bar.01.js'],
					dest: 'dist/utils.js'
				}]
			}
		},
    uglify: {
      options: {
        banner: banner
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.js'
      }
		},
		jshint: {
			all: ['src/*.js', 'src/*/*.js'],
			options: grunt.file.readJSON('./.jshintrc')
		},
		connect: { 
      server: {
        options: {
          open: true,  // 自动打开网页
          port: 3004,   // 在9001端口
					base: './',   // 当前根目录，多个端口可能需要更改,
					keepalive: true
        }
      },
      livereload: {
        options: {
          // 通过LiveReload脚本，让页面重新加载。
          middleware: lrMiddleware
        }
      }
    },
		watch: {
			files: ['src/*.js', 'src/*/*.js'],
			tasks: ['jshint', 'default'],
			options: {
				spawn: false,
				reload: true,
				livereload: lrPort
			}
		}
		// my_src_files: ['src/foo/*.js', 'src/bar/*.js']
  });

  // Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'concat']);
  grunt.registerTask('server', ['connect']);

};