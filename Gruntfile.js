// Generated on 2014-10-19 using
// generator-webapp 0.5.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Configurable paths
  var config = {
    app: 'app',
    dist: 'dist',
    temp: '.tmp'
  };

  grunt.loadNpmTasks('grunt-contrib-less');

  // Grunt includes to allow inline includes of source files
  grunt.loadNpmTasks('grunt-includes');

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['<%= config.app %>/scripts/{,*/}*.js'],
        tasks: ['jshint','newer:copy:js'],
        options: {
          livereload: true
        }
      },
      jstest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['test:watch']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      less: {
        files: ['<%= config.app %>/styles/{,*/}*.less'],
        tasks: ['newer:less']
      },
      styles: {
        files: ['<%= config.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= config.app %>/images/{,*/}*'
        ],
        tasks: ['includes:temp']
      }
    },

    less: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/styles',
          src: ['*.less'],
          dest: '<%= config.dist %>/styles/',
          ext: '.css'
        }]
      },
      temp: {
        // options: {
        //   paths: ['styles']
        // },
        // files: {
        //   '<%= config.temp %>/styles/main.css': '<%= config.app %>/styles/main.less'
        // }
        files: [
        {
          expand: true,
          cwd: '<%= config.app %>/styles',
          src: ['*.less'],
          dest: '<%= config.temp %>/styles/',
          ext: '.css'
        }
      ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        open: true,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect().use('/bower_components', connect.static('./bower_components'))//,
              //connect.static(config.app)
            ];
          }
        }
      },
      test: {
        options: {
          open: false,
          port: 9001,
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.app)
            ];
          }
        }
      },
      dist: {
        options: {
          base: '<%= config.dist %>',
          livereload: false
        }
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.dist %>/*'
            //'!<%= config.dist %>/.git*'
          ]
        }]
      },
      temp: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.temp %>/*'//,
            //'!<%= config.temp %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Build the site using grunt-includes
    includes: {
      dist: {
        cwd: '<%= config.app %>',
        dest: '<%= config.dist %>',
        src: [ '*.html', 'pages/*.html', 'includes*.html' ],
        options: {
          //flatten: true,
          includePath: '<%= config.app %>/include'
        }
      },
      temp: {
        cwd: '<%= config.app %>',
        dest: '<%= config.temp %>',
        src: [ '*.html', 'pages/*.html', 'includes*.html' ],
        options: {
          //flatten: true,
          includePath: '<%= config.app %>/include'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= config.app %>/scripts/{,*/}*.js',
        '!<%= config.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },

    // Mocha testing framework configuration options
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
        }
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '<%= config.dist %>/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the HTML file
    wiredep: {
      app: {
        ignorePath: /^\/|\.\.\//,
        src: ['<%= config.app %>/index.html'],
        exclude: ['bower_components/bootstrap/dist/js/bootstrap.js']
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= config.dist %>/scripts/{,*/}*.js',
            '<%= config.dist %>/styles/{,*/}*.css',
            '<%= config.dist %>/images/{,*/}*.*',
            '<%= config.dist %>/fonts/{,*/}*.*',
            '<%= config.dist %>/*.{ico,png}'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: '<%= config.dist %>'
      },
      html: '<%= config.app %>/index.html'
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: [
          '<%= config.dist %>',
          '<%= config.dist %>/images',
          '<%= config.dist %>/styles'
        ]
      },
      html: ['<%= config.dist %>/{,*/}*.html'],
      css: ['<%= config.dist %>/styles/{,*/}*.css']
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    // svgmin: {
    //   dist: {
    //     files: [{
    //       expand: true,
    //       cwd: '<%= config.app %>/images',
    //       src: '{,*/}*.svg',
    //       dest: '<%= config.dist %>/images'
    //     }]
    //   }
    // },

    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.dist %>',
          src: '{,*/}*.html',
          dest: '<%= config.dist %>'
        }]
      }
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care
    // of minification. These next options are pre-configured if you do not
    // wish to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= config.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         '<%= config.app %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= config.dist %>/scripts/scripts.js': [
    //         '<%= config.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: [
            '*.{ico,png,txt}',
            'images/{,*/}*.{webp,svg}',
            '!include/',
            //'{,*/}*.html', /* handled by includes */
            'fonts/{,*/}*.*'
          ]
        }, {
          src: 'node_modules/apache-server-configs/dist/.htaccess',
          dest: '<%= config.dist %>/.htaccess'
        }, {
          expand: true,
          dot: true,
          cwd: 'bower_components/fontawesome',
          src: 'fonts/{,*/}*.*',
          dest: '<%= config.dist %>'
        }, {
          expand: true,
          dot: true,
          cwd: 'bower_components/bootstrap/dist',
          src: 'fonts/*',
          dest: '<%= config.dist %>'
        }]
      },
      temp: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.temp %>',
          src: [
            '*.{ico,png,txt}',
            'images/{,*/}*.{webp,jpg,jpeg,png,gif,svg}',
            //'{,*/}*.html', /* handled by includes */
            '!include/',
            'fonts/{,*/}*.*',
            '{,*}*.js'
          ]
        }, {
          src: 'node_modules/apache-server-configs/dist/.htaccess',
          dest: '<%= config.temp %>/.htaccess'
        }, {
          expand: true,
          dot: true,
          cwd: 'bower_components/fontawesome',
          src: 'fonts/{,*/}*.*',
          dest: '<%= config.temp %>'
        }, {
          expand: true,
          dot: true,
          cwd: 'bower_components/bootstrap/dist',
          src: 'fonts/{,*/}*.*',
          dest: '<%= config.temp %>'
        }]
      },
      js: {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>/scripts',
        dest: '.tmp/scripts/',
        src: '{,*/}*.js'
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Generates a custom Modernizr build that includes only the tests you
    // reference in your app
    modernizr: {
      dist: {
        devFile: 'bower_components/modernizr/modernizr.js',
        outputFile: '<%= config.dist %>/scripts/vendor/modernizr.js',
        files: {
          src: [
            '<%= config.dist %>/scripts/{,*/}*.js',
            '<%= config.dist %>/styles/{,*/}*.css',
            '!<%= config.dist %>/scripts/vendor/*'
          ]
        },
        uglify: true
      },
      temp: {
        devFile: 'bower_components/modernizr/modernizr.js',
        outputFile: '<%= config.temp %>/scripts/vendor/modernizr.js',
        files: {
          src: [
            '<%= config.temp %>/scripts/{,*/}*.js',
            '<%= config.temp %>/styles/{,*/}*.css',
            '!<%= config.temp %>/scripts/vendor/*'
          ]
        },
        uglify: true
      }
    },

    // Run some tasks in parallel to speed up build process
    concurrent: {
      server: [
        'copy:styles',
        'copy:js',
        'copy:temp'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        'copy:dist',
        'imagemin',
        // 'svgmin'
      ]
    },

    // Build control to push dist code to github
    buildcontrol: {
      options: {
        dir: 'dist',
        commit: true,
        push: true,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      pages: {
        options: {
          remote: 'git@github.com:GCDigitalFellows/GCImpactSite.git',
          branch: 'gh-pages'
        }
      },
      local: {
        options: {
          remote: '../',
          branch: 'build'
        }
      }
    }
  });


  grunt.registerTask('serve', 'start the server and preview your app, --allow-remote for remote access', function (target) {
    if (grunt.option('allow-remote')) {
      grunt.config.set('connect.options.hostname', '0.0.0.0');
    }
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'less',
      'includes:temp',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('test', function (target) {
    if (target !== 'watch') {
      grunt.task.run([
        'clean:server',
        'concurrent:test',
        'autoprefixer'
      ]);
    }

    grunt.task.run([
      'connect:test',
      'mocha'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'less',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'includes:dist',
    'cssmin',
    'uglify',
    'modernizr',
    'rev',
    'usemin',
    //'htmlmin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
