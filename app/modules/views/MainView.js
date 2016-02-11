/*global define */
/*jslint nomen: true*/
define([
    "jquery",
    "lodash",
    "backbone",
    "handlebars",
    "text!templates/mainTemplate.html",
    "app"
], function ($, _, Backbone, Handlebars, MainTemplate, App) {
    
    'use strict';
    var MainView = Backbone.View.extend({
        template : Handlebars.compile(MainTemplate),
        events : {
        },
        initialize : function () {
            //this.render();
            this.listenTo(App.Views.SlideMenu, 'navigateTo', this.onNavigated);
        },
        render : function () {
            this.$el.html(this.template);
            return this;
        },
        onNavigated : function (navigateId, headerTitle) {
            if (navigateId === "myservices") {
                $('#main').html(this.render().el).trigger('create');
            }
        }
    });
    return MainView;
});