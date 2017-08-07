//核心模块
const gulp = require('gulp');
//less
const less = require('gulp-less');
//压缩工具
const connect = require('gulp-connect');
//引入html
const contentIncluder = require('gulp-content-includer');
//压缩html
const htmlmin = require('gulp-htmlmin');
//压缩js
const uglify = require('gulp-uglify');
//压缩css
const minifycss = require('gulp-minify-css');
//文件系统
const fs = require('fs');
//颜色输出
const color = require('gulp-color');

//default config
var config = {
    src: 'src',
    dev: 'dev',
    prod: 'prod',
    ignoredir: ['block'],
    connectjs: false,
    connectcss: false,
    deletedcolor: 'RED',
    addedcolor: 'GREEN',
    changedcolor: 'YELLOW'
}

//默认执行开发模式
gulp.task('default', function() {
    tools.start('dev');
});

//执行开发模式
gulp.task('prod', function() {
    tools.start('prod');
});

const tools = {
    start: function(compilemode) {
        var _this = this;
        //读取配置文件
        fs.readFile('config.json', function(err, data) {
            var conf = JSON.parse(data.toString());
            for (var f in conf) {
                config[f] = conf[f];
            }
            //开始编译
            _this.watchfile(compilemode);
        });
    },
    watchfile: function(compilemode) {
        //编译
        var _this = this;
        console.log('gulp starting ' + new Date());
        console.log('Technical support by http://qie.suwis.com');
        tools.walk(config.src, 0, function(path, floor) {
            _this.complie(compilemode, path);

            //判断模式如果是产品打包则不监听
            if (compilemode == 'prod') {
                return;
            }
            //动态监听文件的变化
            //console.log(path);
            fs.stat(path, function(err, stats) {
                if (err) {
                    console.log(err);
                    return;
                }
                if (stats.isDirectory()) return;
                //监听文件
                gulp.watch(path, function(evt) {
                    evt.path = tools.replaceAll(evt.path, '\\', '/');
                    var today = new Date();
                    var h = today.getHours();
                    var m = today.getMinutes();
                    var s = today.getSeconds();
                    today = h + ':' + m + ':' + s;
                    //修改or添加
                    if (evt.type == 'changed' || evt.type == 'added') {
                        _this.complie(compilemode, evt.path);
                        if (evt.type == 'changed') {
                            console.log(color('file ' + evt.type + ' path ' + evt.path + ' ' + today, config.changedcolor));
                        } else {
                            console.log(color('file ' + evt.type + ' path ' + evt.path + ' ' + today, config.addedcolor));
                        }
                    }
                    //如果是删除则不做任何处理
                    if (evt.type == 'deleted') {
                        //找到被删除的文件
                        var targetpath = evt.path.substring((evt.path.indexOf(config.src)), evt.path.length);
                        targetpath = targetpath.replace(config.src, config.dev);
                        console.log(color('file ' + evt.type + ' path ' + evt.path + ' ' + today, config.deletedcolor));
                        //同步删除文件
                        fs.unlink(targetpath, function(err) {
                            if (err) console.log(color(err.error, config.deletedcolor));
                        });
                    }
                });
            });
        });
    },
    complie: function(compilemode, path) {
        //编译
        var _this = this;
        //忽略常规的项目控制文件
        if (path.indexOf('.svn') >= 0 || path.indexOf('.git') >= 0 || path.indexOf('.project') >= 0) {
            return;
        }
        //忽略自定义的文件夹
        var isignore = false;
        for (var f in config.ignoredir) {
            if (path.indexOf('/' + config.ignoredir[f] + '/') >= 0 || path.indexOf(config.ignoredir[f] + '/') >= 0) {
                isignore = true;
                break;
            }
        }
        if (isignore) return;
        var file = path.substring((path.lastIndexOf('/') + 1), path.length);
        var dir = config.src.substring(config.src.lastIndexOf('/'), config.src.length);
        var targetpath = path.substring((path.indexOf(dir) + 1), path.lastIndexOf('/'));
        if (targetpath.indexOf('/') != -1) {
            targetpath = targetpath.substring((targetpath.indexOf('/') + 1), targetpath.length);
        } else {
            targetpath = '';
        }
        //判断是否是文件
        if (file.lastIndexOf('.') == -1) return;
        var suffix = file.substring((file.lastIndexOf('.') + 1), file.length);
        switch (suffix) {
            case 'html':
                _this[compilemode].html(path, targetpath);
                break;
            case 'css':
                _this[compilemode].css(path, targetpath);
                break;
            case 'less':
                _this[compilemode].less(path, targetpath);
                break;
            case 'js':
                _this[compilemode].js(path, targetpath);
                break;
            case 'jpg':
                _this[compilemode].imagemin(path, targetpath);
                break;
            case 'png':
                _this[compilemode].imagemin(path, targetpath);
                break;
            case 'svg':
                _this[compilemode].imagemin(path, targetpath);
                break;
            default:
                if (compilemode == 'dev') {
                    gulp.src(path)
                        .pipe(gulp.dest(config.dev + '/' + targetpath));
                }
                if (compilemode == 'prod') {
                    gulp.src(path)
                        .pipe(gulp.dest(config.prod + '/' + targetpath));
                }
        }
    },
    dev: {
        html: function(path, targetpath) {
            gulp.src(path)
                .pipe(contentIncluder({
                    includerReg: /<!\-\-include\s+"([^"]+)"\-\->/g
                }))
                .pipe(gulp.dest(config.dev + '/' + targetpath));
        },
        css: function(path, targetpath) {
            gulp.src(path)
                .pipe(gulp.dest(config.dev + '/' + targetpath));
        },
        less: function(path, targetpath) {
            gulp.src(path)
                .pipe(less())
                .pipe(gulp.dest(config.dev + '/' + targetpath));
        },
        js: function(path, targetpath) {
            gulp.src(path)
                .pipe(gulp.dest(config.dev + '/' + targetpath));
        },
        imagemin: function(path, targetpath) {
            gulp.src(path)
                .pipe(gulp.dest(config.dev + '/' + targetpath));
        }
    },
    prod: {
        html: function(path, targetpath) {
            gulp.src(path)
                .pipe(contentIncluder({
                    includerReg: /<!\-\-include\s+"([^"]+)"\-\->/g
                }))
                // .pipe(htmlmin({
                //     collapseWhitespace: true
                // })) //压缩html
                .pipe(gulp.dest(config.prod + '/' + targetpath));
        },
        css: function(path, targetpath) {
            gulp.src(path)
                .pipe(minifycss()) //压缩css
                .pipe(gulp.dest(config.prod + '/' + targetpath));
        },
        less: function(path, targetpath) {
            gulp.src(path)
                .pipe(less()) //解析less
                .pipe(minifycss()) //压缩css
                .pipe(gulp.dest(config.dev + '/' + targetpath));
        },
        js: function(path, targetpath) {
            gulp.src(path)
                .pipe(uglify()) //压缩js
                .pipe(gulp.dest(config.prod + '/' + targetpath));
        },
        imagemin: function(path, targetpath) {
            gulp.src(path)
                // .pipe(image({
                //     pngquant: true,
                //     optipng: true,
                //     zopflipng: true,
                //     jpegRecompress: false,
                //     jpegoptim: false,
                //     mozjpeg: true,
                //     gifsicle: true,
                //     svgo: true,
                //     concurrent: 10
                // })) //压缩图片
                .pipe(gulp.dest(config.prod + '/' + targetpath));
        }
    },
    walk: function(path, floor, handleFile) {
        var _this = this;
        if (path.indexOf('.svn') == -1 && path.indexOf('.git') == -1) {
            handleFile(path, floor);
        }
        floor++;
        fs.readdir(path, function(err, files) {
            if (err) {
                console.log('read dir error');
            } else {
                files.forEach(function(item) {
                    var tmpPath = path + '/' + item;
                    fs.stat(tmpPath, function(err1, stats) {
                        if (err1) {
                            console.log('stat error');
                        } else {
                            if (stats.isDirectory()) {
                                _this.walk(tmpPath, floor, handleFile);
                            } else {
                                if (tmpPath.indexOf('.svn') >= 0 || tmpPath.indexOf('.git') >= 0) {
                                    return;
                                }
                                handleFile(tmpPath, floor);
                            }
                        }
                    })
                });
            }
        });
    },
    replaceAll: function(achar, charA, charB) {
        //替换全部
        return achar.replace(/\\/g, charB);
    }
}
