/*global define */
/*jslint nomen: true*/
define([
    "jquery",
    "lodash",
    "backbone",
    "handlebars",
    "text!templates/innerTemplate.html",
    "app"
], function ($, _, Backbone, Handlebars, InnerTemplate, App) {
    
    'use strict';
    var InnerView = Backbone.View.extend({
        template : _.template(InnerTemplate),
        events : {
        },
        initialize : function () {
           // this.render();
        },
        render : function (offTypeCollection) {
            this.$el.html(this.template({
                offTypeCollection : offTypeCollection,
                'selectLabel' : (function () {return App.lang ? "Select" : "चयन"; }()),
                'label1' : (function () {return App.lang ? "Office Type" : "कार्यालय प्रकार"; }())
            })).trigger('create');
            return this;
        }
    });
    return InnerView;
});