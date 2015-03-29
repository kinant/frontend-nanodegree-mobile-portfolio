'use strict';

module.exports = function(grunt) {

  var mozjpeg = require('imagemin-mozjpeg');

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
          removeEmptyAttributes: true
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
            progressive: true
          },
          files: [
            {
              // Set to true to enable the following options…
              expand: true,
              // cwd is 'current working directory'
              cwd: 'dist/img/',
              src: ['**/*.jpg'],
              // Could also match cwd. i.e. project-directory/img/
              dest: 'dist/img/',
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
          src: ['**/*.css'],
          dest: 'dist/css/',
          ext: '.css'
        }]
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['clean','copy', 'htmlmin', 'uglify','imagemin','cssmin']);
};