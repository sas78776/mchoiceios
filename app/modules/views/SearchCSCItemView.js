/*global define*/
/*jslint nomen: true*/

define([
	"jquery",
	"jquerymobile",
    "lodash",
    "handlebars",
    "backbone",
	"text!templates/cscSearchItemTemplate.html",
    "app"
], function ($, jqm, _, Handlebars, Backbone, CscSearchItemTemplate, App) {
    'use strict';
	var SearchCSCItemView = Backbone.View.extend({
		tagName : 'li',
		template: Handlebars.compile(CscSearchItemTemplate),
		events: {
		},
		initialize : function () {
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
			this.render();
		},
		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}

	});
	return SearchCSCItemView;
});