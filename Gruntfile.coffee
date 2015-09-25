module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    coffee:
      options:
        bare: false
        sourceMap: true
      compile:
        src: 'www/js/index.coffee'
        dest: 'www/js/index.js'
    uglify:
      options:
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("mm-dd-yyyy") %> */'
        sourceMap: true
        sourceMapIn: '<%= coffee.compile.dest %>.map'
      build:
        src: '<%= coffee.compile.dest %>'
        dest: 'www/js/index.min.js'
    watch:
      files: '<%= coffee.compile.src %>'
      tasks: ['coffee', 'uglify']

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'default', ['coffee', 'uglify']
