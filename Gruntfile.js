module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> - version "<%= pkg.version %>" */\n'
      },
      javascript: {
        files: {
          'js/<%= pkg.name %>.min.js': ['js/*.js', '!js/*.min.js']
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
          'css/<%= pkg.name %>.min.css': ['css/normalize.css', 'css/main.css']
        }
      }
    },
    clean: {
      css: [ 'css/*<%= pkg.name %>*' ],
      js: [ 'js/<%= pkg.name %>*' ]
    },
    assets_versioning: {
      options: {
        use: 'hash',
        hashLength: 6
      },
      files: {
        'js/<%= pkg.name %>.js': ['js/*.min.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-assets-versioning');

  grunt.registerTask('default', ['clean','uglify','cssmin','assets_versioning']);

};