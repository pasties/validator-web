var log = require('../logger.js');
var pathLib = require('path');
var Hoek = require('hoek');
var spawnValidator = require('pasties-validator');
var os = require('os');

function resolve(url) {
    var args = [__dirname, '..', '..'].concat(url.split('/'));
    var result = pathLib.join.apply(null, args);
    return pathLib.resolve(result);
}

var options = {
    hooks: {
        errors: true,
        har: true,
        log: true,
        actions: resolve('lib/report/hook/actions.js'),
        css: resolve('lib/report/hook/css.js'),
        script: resolve('lib/report/hook/script.js'),
        images: resolve('lib/report/hook/images.js'),
        timers: resolve('lib/report/hook/timers.js'),
        jquery: resolve('lib/report/hook/jquery.js'),
        pasties: resolve('lib/report/hook/pasties.js')
    },
    validators: {
        errors: true,
        har: true,
        log: true,
        css: resolve('lib/report/validator/css.js'),
        images: resolve('lib/report/validator/images.js'),
        timers: resolve('lib/report/validator/timers.js'),
        jquery: resolve('lib/report/validator/jquery.js'),
        pasties: resolve('lib/report/validator/pasties.js'),
        sizes: resolve('lib/report/validator/sizes.js')
    },
    pageRunTime: 10000
};

var resolveFilepathsToOptions = {
    parentUrl: 'lib/report/resources/parent.html',
    managerScriptPath: 'node_modules/pasties-js/target/pasties-js/js/pasties/mobile.js',
    iframeUrl: 'node_modules/pasties-js/target/pasties-js/html/pasties/mobile.htm',
    managerInitPath: 'lib/report/resources/manager.js'
};

Object.keys(resolveFilepathsToOptions).forEach(function (key) {
    options[key] = resolve(resolveFilepathsToOptions[key]);
});

module.exports = function (data, callback) {
    if (!data || !data.url) {
        if (callback){
            return callback({message: 'Missing phantom url'}, null);
        } else {
            throw new Error('Missing callback');
        }
    }
    var opts = Hoek.clone(options);

    opts.id         = data.id;
    opts.scriptUrl  = data.url;
    opts.target     = data.target;

    opts.outputDirectory = pathLib.resolve(pathLib.join(os.tmpdir(), opts.id));

    log.info('validator processing', opts.id, 'output to', opts.outputDirectory);
    spawnValidator(opts, callback);
};