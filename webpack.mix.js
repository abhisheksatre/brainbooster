let mix = require('laravel-mix');

mix.js([
        'src/js/main.js' 
    ], 'dist/js/main.js')
   .sass('src/sass/app.scss', 'dist/css').version()
   .disableNotifications()
   .setPublicPath('dist')
   .browserSync('http://brainbooster.test');
