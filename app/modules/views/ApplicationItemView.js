/*global define*/
/*jslint nomen: true*/

define([
	"jquery",
	"jquerymobile",
    "lodash",
    "handlebars",
    "backbone",
	"text!templates/applicationItemTemplate.html",
    "app"
], function ($, jqm, _, Handlebars, Backbone, ApplicationItemTemplate, App) {
    'use strict';
	var ApplicationItemView = Backbone.View.extend({
		tagName : 'li',
		template: Handlebars.compile(ApplicationItemTemplate),
		events: {
		},
		initialize : function () {
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
			this.render();
		},
		render: function () {
            var templateData = {
                appRegNumberLabel : App.lang ? "Application Registration Number" : "आवेदन पंजीकरण संख्या",
                appDateLabel : App.lang ? "Date of Application" : "आवेदन की तिथि",
                actionDateLabel : App.lang ? "Date of Action" : "कार्रवाई की तारीख",
                remarkLabel : App.lang ? "Remarks" : "टिप्पणियां",
                statusLabel : App.lang ? "Status" : "स्थिति"
            }
            _.extend(templateData, this.model.toJSON());
			this.$el.html(this.template(templateData));
			return this;
		}

	});
	return ApplicationItemView;
});