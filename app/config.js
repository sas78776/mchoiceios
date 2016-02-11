/*global require*/
/*jslint nomen:true*/
require.config({
    baseUrl: 'app',
    paths: {
        libs: "../assets/js/libs",
        underscore: "../assets/js/libs/underscore/underscore",
        jquery: "../assets/js/libs/jquery/jquery",
       cordova: "../cordova",
        mobileinit: 'jquerymobile.config',
        jquerymobile: "../assets/js/libs/jquery/jquerymobile",
        'jquery.validate': "../assets/js/libs/jquery/jquery.validate",
        lodash: "../assets/js/libs/lodash/lodash",
        backbone: "../assets/js/libs/backbone/backbone",
        backbone_super: "../assets/js/libs/backbone/backbone-super",
        localstorage: "../assets/js/libs/backbone/backbone.localStorage",
        handlebars: "../assets/js/libs/handlebars/handlebars",
        text: "../assets/js/libs/require/text",
        app: "app",
        'service.validate': 'service.validate',
        'handlebar.helpers': 'handlebar.helpers'
    },

    shim: {
        backbone: {
            deps: ["lodash", "jquery"],
            exports: "Backbone"
        },
        backbone_super: {
            deps: ["backbone"],
            exports: "_super"
        },
        handlebars: {
            exports: "Handlebars"
        },
        'jquerymobile.config': ['jquery'],
        'jquery.validate': {
            deps: ['jquery']
        },
        jquerymobile: {
            deps: ["jquery", 'jquerymobile.config']
        }
    }

});

require(['require', 'underscore', 'backbone', 'jquery', 'cordova'], function (require, _, Backbone, $, cordova) {
//require(['require', 'underscore', 'backbone', 'jquery'], function (require, _, Backbone, $) {
    "use strict";
    var initCordova = {
        // Application Constructor
        initialize: function () {
            this.bindEvents();
        },
        // Bind Event Listeners
        //
        // Bind any events that are required on startup. Common events are:
        // 'load', 'deviceready', 'offline', and 'online'.
        bindEvents: function () {
           document.addEventListener('deviceready', this.onDeviceReady, false);
            $(document).on("mobileinit", this.jqmReady);
           //this.receivedEvent();
        },
        // deviceready Event Handler
        //
        // The scope of 'this' is the event. In order to call the 'receivedEvent'
        // function, we must explicitly call 'app.receivedEvent(...);'
        onDeviceReady: function () {
            initCordova.receivedEvent('deviceready');
        },
        // Update DOM on a Received Event
        receivedEvent: function (id) {
            require(['require', 'jquerymobile'], function (require) {
                //alert('jqm loaded');
            });
        },
        
        jqmReady : function () {
            require(['require', 'main'], function (require) {
                //alert('main loaded');
            });
        }
    };
    initCordova.initialize();
});