/*global define */
/*jslint nomen: true*/
define([
    "jquery",
    "lodash",
    "backbone",
    "handlebars",
    "text!templates/aboutTemplateEn.html",
    "text!templates/aboutTemplateHi.html",
    "app"
], function ($, _, Backbone, Handlebars, AboutTemplateEn, AboutTemplateHi, App) {
    
    'use strict';
    var AboutView = Backbone.View.extend({
        template : null,
        events : {
        },
        initialize : function () {
            //this.render();
            this.listenTo(App.Views.HomeView, 'homerendered', this.onNavigated);
        },
        render : function () {
            this.$el.html(this.template({
                'version': App.versionName
            }));
            return this;
        },
        onNavigated : function (navigateId) {
           
            if (navigateId === "about") {
                if (App.lang) {
                    this.template = _.template(AboutTemplateEn);
                } else {
                    this.template = _.template(AboutTemplateHi);
                }
                
                $('#main').html(this.render().el).trigger('create');
            }
        }
    });
    return AboutView;
});

