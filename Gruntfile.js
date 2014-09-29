module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> - version "<%= pkg.version %>" */\n'
      },
      javascript: {
        files: {
          'dist/js/<%= pkg.name %>.min.js': ['js/map.js', 'js/main.js']
        }
      }
    },
    cssmin: {
      css: {
        options: {
          report: 'gzip',
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> - version "<%= pkg.version %>" */\n'
        },
        files: {
          'dist/styles/<%= pkg.name %>.min.css': ['css/normalize.css', 'css/map.css', 'css/main.css']
        }
      }
    },
    clean: {
      dist: [ './dist' ]
    },
    assets_versioning: {
      options: {
        use: 'hash',
        hashLength: 6
      },
      files: {
        'dist/<%= pkg.name %>.min.js': ['dist/*.min.js']
      }
    },
    copy: {
      main: {
        files: [
          {src: ['js/vendor/*'], dest: 'dist/', filter: 'isFile'},
          {src: ['./*.html'], dest: 'dist/'},
          {src: ['*.png','favicon.ico', 'robots.txt'], dest: 'dist/'},
          {src: ['img/IMG_6354.jpeg'], dest: 'dist/img/picture.jpeg'}
        ]
      }
    },
    watch: {
      grunt: {
        tasks: ['build' ], 
        files: ['js/**','css/**', 'index.html'],
        options: {
          livereload: true
        }
      }
    },
    connect: {
      server: {
        options: {
          keepalive: true,
          port: 8080,
          base: './dist'
        }
      }
    },
    concurrent: {
      server: ['connect', 'watch']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-assets-versioning');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('serve-files', ['concurrent']);
  grunt.registerTask('build', ['uglify','cssmin','assets_versioning','copy']);
  grunt.registerTask('default', ['clean','build', 'serve-files']);

};