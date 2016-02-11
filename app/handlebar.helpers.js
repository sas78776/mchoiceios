/*global define,console*/
define(['handlebars'], function (Handlebars) {
    "use strict";
    return (function () {
        Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
            switch (operator) {
            case '==':
                return (v1 === v2) ? options.fn(this) : options.inverse(this);
            case '===':
                return (v1 === v2) ? options.fn(this) : options.inverse(this);
            case '<':
                return (v1 < v2) ? options.fn(this) : options.inverse(this);
            case '<=':
                return (v1 <= v2) ? options.fn(this) : options.inverse(this);
            case '>':
                return (v1 > v2) ? options.fn(this) : options.inverse(this);
            case '>=':
                return (v1 >= v2) ? options.fn(this) : options.inverse(this);
            case '&&':
                return (v1 && v2) ? options.fn(this) : options.inverse(this);
            case '||':
                return (v1 || v2) ? options.fn(this) : options.inverse(this);
            default:
                return options.inverse(this);
            }
        });
        Handlebars.registerHelper("log", function (something) {
            console.log(something);
        });
    }());
});