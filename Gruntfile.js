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
          cwd: 'dist/',
          src: 'index.html',
          dest: 'dist/'
        }]
      }
    },

    uglify: {
      options: {
        mangle: false
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
          cwd: 'dist/css/',
          src: ['style.min.css'],
          dest: 'dist/css/',
          ext: '.css'
        }]
      }
    },
    uncss: {
       dist: {
          files: {
             'dist/css/style.min.css': 'src/index.html'
          }
       }
    },
    staticinline: {
      main: {
        files: {
            'dist/index.html': 'src/index.html',
        }
      }
    },
    inlinecss: {
        main: {
            options: {
            },
            files: {
                'dist/index.html': 'dist/index.html'
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
  grunt.loadNpmTasks('grunt-static-inline');
  grunt.loadNpmTasks('grunt-inline-css');
  grunt.loadNpmTasks('grunt-processhtml');

  grunt.registerTask('default', ['clean','copy', 'uglify','imagemin','uncss','cssmin','processhtml','htmlmin']);
};