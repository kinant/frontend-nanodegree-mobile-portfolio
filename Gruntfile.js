'use strict';

module.exports = function(grunt) {

  var mozjpeg = require('imagemin-mozjpeg');
  var pngquant = require('imagemin-pngquant');
  var jpegoptim = require('imagemin-jpegoptim');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            'dist/*',
            '!dist/.git*'
          ]
        }]
      }
    },
    copy: {
      dist: {
        cwd: 'src/', expand: true, src: '**', dest: 'dist/'
      }
    },
    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          removeEmptyAttributes: true,
          removeComments: true,
          collapseWhitespace: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          minifyCSS: true
        },
        files: [{
          expand: true,
          cwd: '',
          src: ['src/index.html','src/views/pizza.html'],
          dest: 'dist/'
        }]
      }
    },

    uglify: {
      options: {
        mangle: false
      },
      part1: {
        files: {
          'dist/js/perfmatters.min.js': ['src/js/perfmatters.js']
        }
      },
      part2: {
        files: {
          'dist/views/js/main.min.js': ['src/views/js/main.js']
        }
      }
    },
    imagemin: {
        png: {
          options: {
            optimizationLevel: 7
          },
          files: [
            {
              // Set to true to enable the following options…
              expand: true,
              // cwd is 'current working directory'
              cwd: 'dist/img/',
              src: ['**/*.png'],
              // Could also match cwd line above. i.e. project-directory/img/
              dest: 'dist/img/',
              ext: '.png'
            }
          ]
        },
        jpg: {
          options: {
            fastcrush: true,
            use: [pngquant()]
          },
          files: [
            {
              // Set to true to enable the following options…
              expand: true,
              // cwd is 'current working directory'
              cwd: 'dist/',
              src: ['**/*.jpg'],
              // Could also match cwd. i.e. project-directory/img/
              dest: 'dist/',
              ext: '.jpg'
            }
          ]
        }
      },
    cssmin: {
      options: {
        report:'min',
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: [{
          expand: true,
          cwd: 'dist/',
          src: ['css/style.min.css','views/css/combined.min.css'],
          dest: 'dist/',
          ext: '.css'
        }]
      }
    },
    uncss: {
       dist: {
          files: {
             'dist/css/style.min.css': 'src/index.html'
          }
       },
       dist2: {
          files: {
             'dist/views/css/combined.min.css': 'src/views/pizza.html'
          }
       }

    },
    processhtml: {
      options: {
      },
      dist: {
        files: {
          'dist/index.html': ['dist/index.html']
        }
      },
      dist2: {
        files: {
          'dist/views/pizza.html': ['dist/views/pizza.html']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-processhtml');

  grunt.registerTask('default', ['clean','copy', 'uglify','imagemin','uncss','cssmin','processhtml','htmlmin']);
};