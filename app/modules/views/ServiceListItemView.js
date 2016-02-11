/*global define*/
/*global confirm*/
/*jslint nomen: true*/

define([
	"jquery",
	"jquerymobile",
    "lodash",
    "handlebars",
    "backbone",
    "backbone_super",
	"text!templates/serviceListItemTemplate.html",
    "app"
], function ($, jqm, _, Handlebars, Backbone, bbsuperUnused, ServiceListItemTemplate, App) {
    'use strict';
	var ServiceListItemView = Backbone.View.extend({
		tagName : 'li',
		template: Handlebars.compile(ServiceListItemTemplate),
        attributes : function () {
            return {
                "data-icon" : false
            };
        },
		events: {
            'click a' : 'onListItemClick'
		},
		initialize : function () {
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
			this.render();
		},
		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},
        //(function () {return App.lang ? "Suggestion" : "सुझाव"; }())
        onListItemClick : function (e) {
            App.currentServiceId = $(e.currentTarget).data("itemid");
            App.currentServiceName = $(e.currentTarget).data("itemname");
            var r = confirm((function () {return App.lang ? "Apply for " + App.currentServiceName : App.currentServiceName + " के लिए आवेदन"; }()));
            if (r === true) {
                if (App.currentServiceId === 0) {
                    window.location.href = "http://apna.csc.gov.in/";
                } else {
                    App.Routers.BackboneRouter.navigate('#userdata', {trigger: true, replace: false});
                }
                
			}
        }

	});
	return ServiceListItemView;
});