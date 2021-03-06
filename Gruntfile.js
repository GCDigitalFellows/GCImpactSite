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
    temp: '.tmp',
    test: 'test',
    out: '.tmp'
  };


  // Define the configuration for all the tasks
  grunt.initConfig({
      bower: {
        target: {
          rjsConfig: 'app/config.js'
        }
      },

    // Project settings
    config: config,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['<%= config.app %>/scripts/{,*/}*.js'],
        tasks: ['newer:copy:js'],
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
      sass: {
        files: ['<%= config.app %>/styles/{,*/}*.scss'],
        tasks: ['sass','autoprefixer'],
        options: {
          livereload: true
        }
      },
      images: {
        files: ['<%= config.app %>/images/{,*/}*'],
        tasks: ['newer:copy:images'],
        options: {
          livereload: true
        }
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.app %>/{,*/}*.html',
          '<%= config.app %>/styles/{,*/}*.css'
        ],
        tasks: ['includes:all']
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
            config.out = config.temp;
            return [
              connect.static('.tmp'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.app)
            ];
          }
        }
      },
      test: {
        options: {
          open: false,
          port: 9001,
          middleware: function(connect) {
            config.out = config.test;
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
          base: '<%= config.out %>',
          livereload: false
        }
      }
    },

    // Empties folders to start fresh
    clean: {
      all: {
        files: [{
          dot: false,
          src: [
            '<%= config.test %>/*',
            '<%= config.temp %>/*',
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git/'
          ]
        }]
      },
      dist: {
        files: [{
          dot: false,
          src: [
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git/'
          ]
        }]
      },
      server: {
        files: [{
          dot: true,
          src: [
            '<%= config.temp %>/*'
          ]
        }]
      },
      test: {
        files: [{
          dot: true,
          src: [
            '<%= config.test %>/*'
          ]
        }]
      },
    },


    sass: {
      options: {
        lineNumbers: true,
        loadPath: 'bower_components/'
      },
      all: {
        files: {
	        '<%= config.temp %>/styles/main.css': '<%= config.app %>/styles/main.scss'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish'),
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

    // Build the site using grunt-includes
    includes: {
      all: {
        cwd: '<%= config.app %>',
        dest: '<%= config.out %>',
        src: [ '*.html', 'pages/*.html' ],
        options: {
          //flatten: true,
          includePath: '<%= config.app %>/include'
        }
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      all: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.out %>',
          src: [
            '*.{ico,png,txt}',
            //'{,*/}*.html', /* handled by includes */
            '!include/',
            'font/{,*/}*.*'
          ]
        }, {
          src: 'node_modules/apache-server-configs/dist/.htaccess',
          dest: '<%= config.out %>/.htaccess'
        }, {
          src: '.gitignore',
          dest: '<%= config.out %>/.gitignore' // for buildcontrol
        }, {
          expand: true,
          dot: true,
          cwd: 'bower_components/materialize/',
          src: 'font/{,*/}*.*',
          dest: '<%= config.out %>'
        }]
      },
      images: {
        expand: true,
        dot: true,
        cwd:  '<%= config.app %>/images',
        dest: '<%= config.out %>/images/',
        src:  '{,*/}*.{webp,jpg,jpeg,png,gif,svg}'
      },
      svgs: { // because svgmin breaks stuff
        expand: true,
        dot: true,
        cwd:  '<%= config.app %>/images',
        dest: '<%= config.out %>/images/',
        src:  '{,*/}*.svg'
      },
      js: {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>/scripts',
        dest: '<%= config.out %>/scripts/',
        src: '{,*/}*.js'
      },
      vendor: {
        expand: true,
        flatten: true,
        src: [
          'bower_components/fullpage.js/jquery.fullPage.min.js',
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/lazyloadxt/dist/*.min.js',
          'bower_components/materialize/bin/materialize.js'
        ],
        dest: '<%= config.out %>/scripts/vendor/'
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
      },
      all: {
        files: [{
          expand: true,
          cwd: '<%= config.temp %>/styles/',
          src: '{,*/}*.css',
          dest: '<%= config.out %>/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the HTML file
    wiredep: {
      app: {
        ignorePath: /^\/|\.\.\//,
        src: ['<%= config.app %>/index.html'],
        //exclude: ['bower_components/bootstrap/dist/js/bootstrap.js']
      }
    },

    // Renames files for browser caching purposes
    /*rev: {
      dist: {
        files: {
          src: [*/
//            '<%= config.out %>/scripts/{,*/}*.js',
//            '<%= config.out %>/styles/{,*/}*.css',
//            '<%= config.out %>/images/{,*/}*.*',
//            '<%= config.out %>/fonts/{,*/}*.*',
//            '<%= config.out %>/*.{ico,png}'
/*          ]
        }
      }
    },*/

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: '<%= config.out %>',
/*        staging: '<%= config.out %>',
        steps: {
          js: ['concat'],
          css: ['concat', 'cssmin']
        }, */
      },
      html: '<%= config.app %>/index.html'
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: [
          '<%= config.out %>',
          '<%= config.out %>/images',
          '<%= config.out %>/styles'
        ]
      },
      html: ['<%= config.out %>/{,*/}*.html'],
      css: ['<%= config.out %>/styles/*.css']
    },

    // The following *-min tasks produce minified files in the dist folder
    cssmin: {
      all: {
        files: [{
          expand: true,
          cwd: '<%= config.out %>/styles',
          src: ['*.css', '!*.min.css'],
          dest: '<%= config.out %>/styles',
          ext: '.min.css'
        }]
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= config.out %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= config.out %>/images'
        }]
      }
    },

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
          cwd: '<%= config.out %>',
          src: '{,*/}*.html',
          dest: '<%= config.out %>'
        }]
      }
    },

    uglify: {
      all: {
        options: {
          compress: true,
          mangle: false,
          quoteStyle: 3,
          report: 'gzip',
          sourceMap: true,
          sourceMapIn: '<%= config.out %>/scripts/main.js.map',
        },
        files: {
          '<%= config.out %>/scripts/main.min.js': ['<%= config.out %>/scripts/main.js'],
          '<%= config.out %>/scripts/vendor.min.js': ['<%= config.out %>/scripts/vendor.js']
        }
      }
    },


    // Generates a custom Modernizr build that includes only the tests you
    // reference in your app
    modernizr: {
      all: {
        cache: true,
        dest : '<%= config.out %>/scripts/vendor/modernizr-custom.js',
        devFile: false,
        //devFile: 'bower_components/modernizr/modernizr.js',
        //outputFile: '<%= config.out %>/scripts/vendor/modernizr.js',
        files: {
          src: [
            '<%= config.out %>/scripts/{,*/}*.js',
            '<%= config.out %>/styles/{,*/}*.css',
            '!<%= config.out %>/scripts/vendor/*'
          ]
        },
        uglify: true
      },
    },

    // Build control to push dist code to github
    buildcontrol: {
      options: {
        commit: true,
        dir: 'dist',
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%',
        push: true,
        shallowFetch: true
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
      config.out = config.dist;
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    } else {
      config.out = config.temp;
      grunt.log.warn('out dir: ' + config.out);
      return grunt.task.run([
        'clean:server',
        'jshint',
        'includes',
        'sass',
        'copy:all',
        'copy:js',
        'copy:svgs',
        'copy:images',
        'autoprefixer',
        //'modernizr',
        'connect:livereload',
        'watch'
      ]);
    }
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('test', function (target) {
    if (target !== 'watch') {
      config.out = config.test;
      grunt.task.run([
        'clean:test',
        'jshint',
        'sass',
        'includes',
        'copy:all',
        'copy:js',
        'copy:images',
        'autoprefixer'
      ]);
    }

    grunt.task.run([
      'connect:test',
      'mocha'
    ]);
  });

  grunt.registerTask('build', 'build your app and output to dist folder',
    function(target) {
      if (target === 'temp') {
        config.out = config.temp;
      } else {
        config.out = config.dist;
      }
      grunt.log.warn('Using config.out=' + config.out);
      return grunt.task.run([
        'clean:dist',
        'jshint',
        'includes',
        'sass',
        'copy:all',
        'copy:svgs',
        'imagemin',
        'autoprefixer',
        'useminPrepare',
        'concat:generated',
        'cssmin:generated',
        'uglify:generated',
        'usemin',
        //'modernizr',
      ]);
    }
  );

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
