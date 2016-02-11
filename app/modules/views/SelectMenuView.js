/*global define */
/*jslint nomen: true*/
define([
    "jquery",
    "lodash",
    "backbone",
    "handlebars",
    "text!templates/selectMenuTemplate.html",
    "app"
], function ($, _, Backbone, Handlebars, SelectMenuTemplate, App) {
    
    'use strict';
    var InnerView = Backbone.View.extend({
        template : _.template(SelectMenuTemplate),
        events : {
        },
        initialize : function () {
           // this.render();
        },
        render : function (offTypeLabelCollection, obj) {
            this.$el.html(this.template({
                offTypeLabelCollection : offTypeLabelCollection,
                'selectLabel' : (function () {return App.lang ? "Select" : "चयन"; }())
            })).trigger('create');
            return this;
        }
    });
    return InnerView;
});