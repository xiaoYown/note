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
		watch: {
			scripts: {
				files: ['src/*.js', 'src/*/*.js'],
				tasks: ['uglify', 'concat']
			},
			options: {
				spawn: true
			}
		}
		// my_src_files: ['src/foo/*.js', 'src/bar/*.js']
  });

  // Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'concat']);
  grunt.registerTask('watch', ['watch']);

};