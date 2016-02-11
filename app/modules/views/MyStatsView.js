/*global define */
/*jslint nomen: true*/
define([
    "jquery",
    "lodash",
    "backbone",
    "handlebars",
    "text!templates/myStatsTemplate.html",
    "app"
], function ($, _, Backbone, Handlebars, MyStatsTemplate, App) {
    
    'use strict';
    var MyStatsView = Backbone.View.extend({
        template : Handlebars.compile(MyStatsTemplate),
        events : {
        },
        initialize : function () {
            //this.render();
            this.listenTo(App.Views.HomeView, 'homerendered', this.onNavigated);
        },
        render : function () {
            this.$el.html(this.template);
            return this;
        },
        onNavigated : function (navigateId) {
            if (navigateId === "mystats") {
                $('#main').html(this.render().el).trigger('create');
            }
        }
    });
    return MyStatsView;
});