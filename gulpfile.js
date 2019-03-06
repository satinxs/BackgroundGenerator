const
    gulp = require('gulp'),
    del = require('del'),
    json = require('rollup-plugin-json'),
    resolve = require('rollup-plugin-node-resolve'),
    commonJS = require('rollup-plugin-commonjs'),
    rollup = require('gulp-better-rollup'),
    htmlmin = require('gulp-htmlmin'),
    size = require('gulp-size'),
    visualizer = require('rollup-plugin-visualizer'),
    alias = require('rollup-plugin-alias'),
    minify = require('gulp-babel-minify'),
    babel = require('rollup-plugin-babel');

let isRelease = false;

const destination = 'public';

let tasks = {
    html: {
        src: 'index.html',
        dest: destination,
        min: () => htmlmin({ collapseWhitespace: true, removeComments: true })
    },
    javascript: {
        src: 'src/main.js',
        dest: destination,
        fun: () => rollup({
            plugins: [
                visualizer(),
                alias({ config: isRelease ? 'config.json' : 'config.dev.json' }),
                json({ exclude: ['node_modules/**/*'], preferConst: true }),
                babel({
                    babelrc: false,
                    exclude: 'node_modules/**'
                }),
                resolve(),
                commonJS({ include: 'node_modules/**' }),
            ]
        }, 'cjs').on('error', e => console.log(JSON.stringify(e))),
        min: () => minify()
    }
};

function createTask(title) {
    let task = tasks[title];

    let gulpTask = gulp.src(task.src);

    if (task.fun)
        gulpTask = gulpTask.pipe(task.fun());

    if (isRelease && task.min)
        gulpTask = gulpTask.pipe(task.min());

    gulpTask = gulpTask.pipe(size({ pretty: true, title }));

    return gulpTask.pipe(gulp.dest(task.dest)).on('error', console.log);
}

gulp.task('html', function () {
    return createTask('html');
});

gulp.task('javascript', function () {
    return createTask('javascript');
});

gulp.task('clean', function () {
    return del(destination + '/**/*');
});

gulp.task('build', ['clean'], function () {
    return gulp.start(['html', 'javascript']);
});

gulp.task('release', ['clean'], function () {
    isRelease = true;

    return gulp.start(['build']);
});

gulp.task('dev', ['build'], function () {
    gulp.watch(['src/**/*.js'], ['javascript']);
    gulp.watch('index.html', ['html']);

    startHttpServer();
});

function startHttpServer() {
    const Koa = require('koa');
    const kStatic = require('koa-static');
    const kSend = require('koa-send');

    let app = new Koa();

    app.use(async (ctx, next) => {
        if (ctx.path === '/silentforest/game.js') { //Hack para tener las rutas con "silentforest" como en el server.
            await kSend(ctx, './public/game.js');
        } else
            await next();
    });
    app.use(kStatic('public'));

    app.listen(8080, () => {
        console.log('Listening in http://localhost:8080/');
    });
}

gulp.task('serve', function () {
    startHttpServer();
});

gulp.task('default', ['dev']);

gulp.task('extreme', function () {
    gulp.start(['release'], function () {
        const fs = require('fs'),
            lz = require('lz-string');

        let js = fs.readFileSync('public/main.js', 'utf8'),
            compressed = lz.compressToBase64(js),
            result = require('./bootstrapper')(compressed),
            percentage = ((js.length - result.length) / js.length * 100).toFixed(3);

        console.log(`Source compression: ${js.length}/${result.length} = ${percentage}%`);

        fs.writeFileSync('public/main.js', result);//, { encoding: 'utf16le' });
    })
});