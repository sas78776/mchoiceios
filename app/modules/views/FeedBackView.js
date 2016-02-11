/*global define */
/*global alert*/
/*jslint nomen: true*/
define([
    "jquery",
	"jquery.validate",
    "lodash",
    "backbone",
    "handlebars",
    "text!templates/feedbackTemplate.html",
    "app"
], function ($, jqv, _, Backbone, Handlebars, FeedbackTemplate, App) {
    
    'use strict';
    var FeedBackView = Backbone.View.extend({
        template : _.template(FeedbackTemplate),
        events : {
            'click #btn-feedback-submit' : 'submitFeedback'
        },
        initialize : function () {
            //this.render();
            this.listenTo(App.Views.HomeView, 'homerendered', this.onNavigated);
        },
        render : function () {
            this.$el.html(this.template({
                'selectLabel' : (function () {return App.lang ? "Select" : "चयन"; }()),
                'suggestion' : (function () {return App.lang ? "Suggestion" : "सुझाव"; }()),
                'complaint' : (function () {return App.lang ? "Complaint" : "शिकायत"; }()),
                'others' : (function () {return App.lang ? "Others" : "दूसरे"; }()),
                'feedbackdetails' : (function () {return App.lang ? "Feedback Details" : "प्रतिक्रिया विवरण"; }()),
                'feedbacktype' : (function () {return App.lang ? "Feedback Type" : "प्रतिक्रिया प्रकार"; }()),
                'submit' : (function () {return App.lang ? "Submit" : "जमा करें"; }())
            
            }));
            return this;
        },
        onNavigated : function (navigateId) {
            if (navigateId === "taxservices") {
                $('#main').html(this.render().el).trigger('create');
            }
        },
        submitFeedback : function () {
            var envelope,
                output,
                response,
                jsonResponse;
			if (this.validatefunction()){
            envelope = App.envelopeGenerator({
                'type' : $('#feedbackform-type').val(),
                'comment' : $('#feedbackform-comment').val(),
                'mobile' : App.user.mobileNo
            }, "feedback");
            output = App.makeAjaxCall1("POST", App.url, envelope);
            output.success(function (data) {
                $.mobile.loading("hide");
				$("body").removeClass('ui-disabled');
                alert((function () {return App.lang ? "Submitted successfully" : "सफलतापूर्वक सबमिट कर दिया गया है"; }()));
            });
            output.error(function () {
                $.mobile.loading("hide");
				$("body").removeClass('ui-disabled');
                alert((function () {return App.lang ? "Submission failed" : "प्रस्तुत करने में विफल रहा है"; }()));
            });
			}
        },
		validatefunction : function () {
			var msg = App.lang ? "Please fill the Feedback details"  :"प्रतिक्रिया के विवरण भरें";
			var letters = /\S/gi;
			if (!($('#feedbackform-comment').val()).match(letters) || $('#feedbackform-type').val() ==="0"){
				alert(msg);
			    return false;
			}
	 		return true;
		}
    });
    return FeedBackView;
});