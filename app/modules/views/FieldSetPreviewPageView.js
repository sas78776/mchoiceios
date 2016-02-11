/*global define */
/*jslint nomen: true*/
define([
    "jquery",
    "lodash",
    "backbone",
    "handlebars",
    "text!templates/fieldsetPreviewPageTemplate.html",
    "app"
], function ($, _, Backbone, Handlebars, FieldsetPreviewPageTemplate, App) {
    
    'use strict';
    var FieldSetPreviewPageView = Backbone.View.extend({
        template : _.template(FieldsetPreviewPageTemplate),
		heading: null,
		tagName : "li",
        events : {
        },
        initialize : function () {
		},
        render : function (params) {
            this.$el.html(this.template({
			params : params,
			})).trigger('create');
            return this;
        }
    });
    return FieldSetPreviewPageView;
});