/*global define */
/*global alert */
/*jslint nomen: true*/
define([
    "jquery",
    "lodash",
    "backbone",
    "handlebars",
    "text!templates/myProfileTemplate.html",
    "app"
], function ($, _, Backbone, Handlebars, MyProfileTemplate, App) {
    
    'use strict';
    var MyProfileView = Backbone.View.extend({
        template : Handlebars.compile(MyProfileTemplate),
        events : {
            'click #sync-btn' : "onserverSync"
        },
        initialize : function () {
            //this.render();
            this.listenTo(App.Views.HomeView, 'homerendered', this.onNavigated);
        },
        render : function () {
            _.bindAll();
            var temp = {
                "greeting" : App.lang ? "Hello" : "नमस्कार",
                "lang" : App.lang ? "English" : "हिन्दी",
                "syncText" : App.lang ? "Synchronize With Server" : "सर्वर के साथ सिंक्रनाइज़ करें",
                "passwordChange" : App.lang ? "Request Password Change" : "अनुरोध पासवर्ड परिवर्तन"
            };
            _.extend(temp, App.user);
            this.$el.html(this.template(temp));
            this.delegateEvents();
            return this;
        },
        onNavigated : function (navigateId) {
            if (navigateId === "profile") {
                $('#main').html(this.render().el).trigger('create');
            }
        },
        onserverSync : function () {
            var envelope,
                envelope1,
                response,
                output,
                output1,
                response1,
                jsonResponse,
                jsonResponse1;
            envelope = App.envelopeGenerator((function () {
                return {
                    "lang" : "en"
                };
            }()), "getAllService");
            envelope1 = App.envelopeGenerator((function () {
                return {
                    "lang" : "hi"
                };
            }()), "getAllService");
            output = App.makeAjaxCall1("POST", App.url, envelope);
            output1 = App.makeAjaxCall1("POST", App.url, envelope1);
            output.success(function (data) {
                response = App.getJsonObj(data);
                jsonResponse = $.parseJSON(response.getAllServiceReturn);
                localStorage.setItem("servicesInfoEn", JSON.stringify(jsonResponse));
                $.mobile.loading("hide");
				$("body").removeClass('ui-disabled');
            });
            output.error(function (error) {
                App.displayErrorMsg();
            });
            output1.success(function (data) {
                response1 = App.getJsonObj(data);
                jsonResponse1 = $.parseJSON(response1.getAllServiceReturn);
                localStorage.setItem("servicesInfoHi", JSON.stringify(jsonResponse1));
                $.mobile.loading("hide");
				$("body").removeClass('ui-disabled');
                alert((function () {
                    return App.lang ? "all services are now ready" : "सभी सेवाओं अब तैयार हैं";
                }()));
            });
            output1.error(function (error) {
                App.displayErrorMsg();
            });
        }
    });
    return MyProfileView;
});