/*global define */
/*jslint nomen: true*/

define([
    "jquery",
    "jquery.validate",
    "lodash",
    "backbone",
    "handlebars",
    "modules/views/abstract/BaseView",
    "text!templates/confirmationTemplate.html",
    "app"
], function ($, jqv, _, Backbone, Handlebars, BaseView, ConfirmationTemplate, App) {
    
    'use strict';
    var ConfirmationView = BaseView.extend({
        pageId : 'confirmation',
        partialTemplate : ConfirmationTemplate,
        initialize : function () {
            BaseView.prototype.initialize.apply(this, arguments);
            $.mobile.loading("show", {
                text: "loading",
                textVisible: true,
                theme: "",
                textonly: "",
                html: ""
            });
            var xml = App.submissionXmlGenerator(App.anxObject),
                response,
                obj,
                key,
                dd,
                mm,
                yyyy,
                output,
                envelope = App.envelopeGenerator({
                    'Xml' : xml
                }, "parseXml");
            output = App.makeAjaxCall1("POST", App.url, envelope);
            output.success(function (data) {
                response = App.getJsonObj(data);
                dd = response.parseXmlReturn.split(",")[2].split("-")[2].split(" ")[0];
                mm = response.parseXmlReturn.split(",")[2].split("-")[1];
                yyyy = response.parseXmlReturn.split(",")[2].split("-")[0];
                $("#ap-ref-num").text(response.parseXmlReturn.split(",")[0]);
                $("#ap-due-date").text(dd + "-" + mm + "-" + yyyy);
                $("#ap-off-name").text(response.parseXmlReturn.split(",")[1]);
                $.mobile.loading("hide");
				$("body").removeClass('ui-disabled');
                $("#btn-save").attr('type', 'visible');
                $("#btn-save").css('text-align', 'center');
                $.mobile.loading("hide");
				$("body").removeClass('ui-disabled');
            });
            output.error(function (error) {
                App.displayErrorMsg();
            });
            
            //alert("your application reference number : " + response.parseXmlReturn);
        },
        getHeaderTitle : function () {
            return App.lang ? "Confirmation" : "पुष्टीकरण";
        },
        events : function () {
            return _.extend({
                'click #btn-save' : 'onSavetap'
            }, this.constructor.__super__.events);
        },
        getSpecificTemplateValues : function () {
            return {
                'refno' : "",
                'appRegNo' : App.lang ? "Application Registration Number" : "आवेदन पंजीकरण संख्या",
                'dueDate' : App.lang ? "Application Due Date" : "आवेदन नियत दिनांक",
                'officeName' : App.lang ? "Office Name" : "कार्यालय का नाम",
                'save' : App.lang ? "Save" : "रक्षित करें"
            };
        },
        onSavetap : function () {
            App.Routers.BackboneRouter.navigate('#main', {trigger: true, replace: true});
        }
    });
    return ConfirmationView;
});