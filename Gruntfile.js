module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> - version "<%= pkg.version %>" */\n'
      },
      javascript: {
        files: {
          'dist/js/<%= pkg.name %>.min.js': ['js/*.js']
        }
      }
    },
    compass: {
      dist: {
        options: {
          sassDir: 'css/sass',
          environment: 'production',
          cssDir: 'css',
          outputStyle: 'compressed'
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
          'dist/styles/<%= pkg.name %>.min.css': ['css/partials/*.css', 'css/*.css']
        }
      }
    },
    clean: {
      dist: [ './dist', './css/panke&meer.css' ]
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
          {src: ['js/vendor/**'], dest: 'dist/', filter: 'isFile'},
          {expand: true, src: ['./html/*.html', './html/.htaccess'], dot: true, dest: 'dist/', flatten: true},
          {src: ['*.png','favicon.ico', 'robots.txt'], dest: 'dist/'},
          {src: ['img/*.png'], dest: 'dist/'}
        ]
      }
    },
    sitemap: {
      dist: {
        siteRoot: './dist/'
      }
    },
    responsive_images: {
      dist: {
        options: {
          engine: 'im',
          sizes: [{
            rename: false,
            quality: 100,
            width: 960
          }]
        },
        files: [{
          expand: true,
          src: ['./img/**/*.{jpg,gif}'],
          dest: './dist/'
        }]
      }
    },
    watch: {
      grunt: {
        tasks: ['build' ], 
        files: ['js/**','css/**', 'html/**', 'img/**'],
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
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-sitemap');
  grunt.loadNpmTasks('grunt-responsive-images');

  grunt.registerTask('serve-files', ['concurrent']);
  grunt.registerTask('build', ['uglify','compass','cssmin','assets_versioning','copy','sitemap', 'responsive_images']);
  grunt.registerTask('default', ['clean','build', 'serve-files']);

};