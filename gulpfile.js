//Comandos NPM
//npm install --global gulp-cli //Install the gulp command line utility
//npm install gulp browser-sync gulp sass --save-dev //inatalação dos recursos para rodar o script
//npm install bootstrap jquery popper.js --save
//Estruturas de pasta
//gulpfile.js
//src
//  ->assets
//  ->js
//  ->css
//  ->scss
//Comando para executar o gulp: gulp
//

var gulp = require('gulp');
var browsersync = require('browser-sync').create();
var sass = require('gulp-sass');

//Compilar o Sass
gulp.task('sass',gulp.series( function() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browsersync.stream());

}));

//mover js para src.js
gulp.task('js',gulp.series( function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest("src/js"))
        .pipe(browsersync.stream());

}));


//servidor para olhar os Html /scss
gulp.task('server', gulp.series( ['sass'], function() {
    browsersync.init({
        server: "./src"

    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], gulp.parallel( ['sass']));
    gulp.watch("src/*.html").on('change',gulp.parallel( browsersync.reload));

}));

gulp.task('default', gulp.series( ['js', 'server']));
