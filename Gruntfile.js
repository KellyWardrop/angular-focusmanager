module.exports = function (grunt) {

    var tasks = [
        'jshint',
        'ngmin',
        'uglify'
    ];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*\n' +
            '* <%= pkg.name %> v.<%= pkg.version %>\n' +
            '* (c) ' + new Date().getFullYear() + ', WebUX\n' +
            '* https://github.com/webux/<%= pkg.filename %>\n' +
            '* License: MIT.\n' +
            '*/\n',
        wrapStart: '(function(){\n',
        wrapEnd: '\n}());\n',
        jshint: {
            // define the files to lint
            files: ['js/**/*.js'],
            // configure JSHint (documented at http://www.jshint.com/docs/)
            options: {
                // more options here if you want to override JSHint defaults
                globals: {
                    loopfunc: false
                }
            }
        },
        watch: {
            scripts: {
                files: ['src/**/*'],
                tasks: tasks,
                options: {
                    spawn: false,
                    debounceDelay: 1000,
                    atBegin: true
                }
            }
        },
        ngmin: {
            client: {
                src: [
                    'src/ux.js',
                    'src/consts.js',
                    'src/**/*.js'
                ],
                dest: './build/<%= pkg.filename %>.js'
            }
        },
        uglify: {
            build: {
                options: {
                    mangle: false,
                    compress: false,
                    preserveComments: 'some',
                    beautify: true,
                    exportAll: true,
                    banner: '<%= banner %><%= wrapStart %>',
                    footer: '<%= wrapEnd %>'
                },
                files: {
                    './build/<%= pkg.filename %>.js': ['./build/<%= pkg.filename %>.js']
                }
            },
            build_min: {
                options: {
                    wrap: '<%= pkg.packageName %>',
                    banner: '<%= banner %>'
                },
                files: {
                    './build/<%= pkg.filename %>.min.js': ['./build/<%= pkg.filename %>.js']
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-wrap');
    grunt.loadNpmTasks('grunt-ngmin');

    grunt.registerTask('default', tasks);

};