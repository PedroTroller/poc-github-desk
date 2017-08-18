var Encore = require('@symfony/webpack-encore');

var outputPath = process.env.OUTPUT_PATH || 'web/build';
var publicPath = process.env.PUBLIC_PATH || '/build';

Encore
    .setOutputPath(outputPath)
    .setPublicPath(publicPath)
    .cleanupOutputBeforeBuild()
    .addEntry('app', './src/js/main.js')
    .addStyleEntry('global', ['./src/css/global.less', './src/css/app.less', './node_modules/normalize.css/normalize.css'])
    .autoProvidejQuery()
    .enableLessLoader()
    .enableSassLoader()
    .enableVueLoader()
    .enableSourceMaps(!Encore.isProduction())
;

let configuration = Encore.getWebpackConfig();

configuration.devServer.host = '0.0.0.0';
configuration.devServer.disableHostCheck = true;

module.exports = configuration;
