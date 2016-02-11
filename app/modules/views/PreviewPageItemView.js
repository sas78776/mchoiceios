/*global define*/
/*jslint nomen: true*/

define([
    "jquery",
    "jquerymobile",
    "lodash",
    "handlebars",
    "backbone",
    "text!templates/previewPageItemTemplate.html",
    "app"
], function ($, jqm, _, Handlebars, Backbone, PreviewPageItemTemplate, App) {
    'use strict';
    var PreviewPageItemView = Backbone.View.extend({
        tagName: 'li',
        template: Handlebars.compile(PreviewPageItemTemplate),
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
            this.render();
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

    });
    return PreviewPageItemView;
});