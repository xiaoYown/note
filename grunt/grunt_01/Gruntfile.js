module.exports = function(grunt) {
	var banner = '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
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
		watch: {
			scripts: {
				files: ['src/*.js', 'src/*/*.js'],
				tasks: ['jshint', 'default'],
				options: {
					spawn: false,
					reload: true
				}
			}
		}
		// my_src_files: ['src/foo/*.js', 'src/bar/*.js']
  });

  // Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'concat']);

};