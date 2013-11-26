var buster = require('buster-assertions');
var assert = buster.assert;
var refute = buster.refute;


var cssHOOK = require('../../lib/hook/css.js');

describe('CSS hook', function () {

    it('it should collect styles and filter', function(){

        var result = {};
        var list = ['ignore {}', 'me{}', 'validate {}'];
        var api = {
            'getResultObject' : function(){
                return result;
            },
            'evaluate' : function(fn){
                return fn();
            },
            'switchToIframe' : function(){

            }
        };


        function dom(content){
            return {
                innerHTML: content
            };
        }

        global.document = {
            querySelectorAll: function () {
                return [dom('ignore {}'), dom('me{}'), dom('validate {}')];
            }
        };

        cssHOOK.onBeforeExit(api);

        global.document = null;

        assert.isArray(result.frameStyles);
        assert.equals(result.frameStyles.length, 1);


    });

});

var cssValidator = require('../../lib/validator/css.js');
var help = require('../lib/validateHelpers.js');

describe('CSS validator', function(){

    it('should fail on tag styling', function(done){
        var harvest = {
            frameStyles: ['body {padding: 0}', 'p{background: red;}html{margin: 10px;}'],
            har: {}
        };

        var reporter = help.createReporter.call(this);

        cssValidator.validate(harvest, reporter, function(){

            var result = reporter.getResult();

            assert.equals(result.error.length, 2);

            done();
        });
    });

});