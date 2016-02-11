/*global define */
/*global jQuery */
/*jslint nomen: true*/
define([
    "jquery",
    "lodash",
    "backbone",
    "handlebars",
    "text!templates/languageTemplate.html",
    "app"
], function ($, _, Backbone, Handlebars, LanguageTemplate, App) {
    
    'use strict';
    var LanguageView = Backbone.View.extend({
        el : '#viewport',
        template : Handlebars.compile(LanguageTemplate),
        events : {
            'change input[type="radio"]' : 'setLanguage',
            'click #btn-start' : 'startApplication'
        },
        initialize : function () {
            this.render();
        },
        render : function () {
            this.$el.html(this.template).trigger('create');
         navigator.splashscreen.hide();
            return this;
        },
        setLanguage : function (e) {
            switch (e.currentTarget.value) {
            case "hindi":
                App.updateLang(false);
                break;
            case "english":
                App.updateLang(true);
                break;
            }
        },
        startApplication : function () {
            switch ($('input[type="radio"]:checked').val()) {
            case "hindi":
                App.updateLang(false);
                break;
            case "english":
                App.updateLang(true);
                break;
            }
            jQuery.extend(jQuery.validator.messages, {
                required : ((App.lang) ? "This field is required." : "अनिवार्य क्षेत्र रिक्त नहीं हो सकता, कृपया दर्ज करे")
            });
            //App.Routers.BackboneRouter.navigate('#login', {trigger: true, replace: false});
            window.location.replace('#login');
        }
    });
    return LanguageView;
});