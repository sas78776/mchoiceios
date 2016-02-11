/*global define,alert */
/*jslint nomen: true*/

define([
    "jquery",
    "jquery.validate",
    "lodash",
    "backbone",
    "handlebars",
    "modules/views/abstract/BaseView",
    "modules/models/OtpPageModel",
    "text!templates/otpTemplate.html",
    "app"
], function ($, jqv, _, Backbone, Handlebars, BaseView, OtpPageModel, OtpTemplate, App) {
    
    'use strict';
    var otpView = BaseView.extend({
        pageId : 'otp',
        partialTemplate : OtpTemplate,
        model : new OtpPageModel(),
        initialize : function () {
            BaseView.prototype.initialize.apply(this, arguments);
            $("#otpform").validate({
                focusCleanup: true,
                rules : {
                    otpinput : {
                        required : true,
                        minlength : 5,
                        maxlength : 5
                    }
                },
                messages : {
                    otpinput : {
                        required : App.lang ? "This field is required." : "अनिवार्य क्षेत्र रिक्त नहीं हो सकता, कृपया दर्ज करे",
                        minlength : App.lang ?  "Please, enter 5 character OTP." : "कृपया 5 अंको का वैध OTP दर्ज करे ",
                        maxlength : App.lang ?  "Please, enter 5 character OTP." : "कृपया 5 अंको का वैध OTP दर्ज करे "
                    }
                }
            });
        },
        getHeaderTitle : function () {
            return this.model.headerTitle(App.lang);
        },
        getSpecificTemplateValues : function () {
            return {
                'pageTitle' : this.model.pageTitle(App.lang),
                'label' : this.model.label(App.lang),
                'submit' : this.model.submit(App.lang),
                'resendOtp' : this.model.resendOtp(App.lang)
            };
        },
        events : function () {
            return _.extend({
                'click #btn-otpsubmit' : 'submitOtp'
            }, this.constructor.__super__.events);
        },
        submitOtp : function () {
            var envelope,
                output,
                otpoutput,
                response,
                jsonResponse;
            if ($("#otpform").valid()) {
                App.showSignup = false;
                App.showLogin = false;
                App.showMain = true;
                envelope = App.envelopeGenerator({
                    'mobileNo' : App.user.mobileNo,
                    'otp' : $('#txt-enter-otp').val()
                }, "validateUser");
                otpoutput = App.makeAjaxCall1("POST", App.url, envelope);
                otpoutput.success(function (data) {
                    response = App.getJsonObj(data);
                
                    if (response) {
                        if (response.validateUserReturn === "OTP Verified") {
                            window.location.replace("#main");
                            localStorage.setItem("userInfo", JSON.stringify(App.user));
                        } else {
                            alert((function () {
								return App.lang ? "Invalid OTP" : "अमान्य ओटीपी पासवर्ड";
							}()));
                        }
                    } else {
                        alert((function () {
							return App.lang ? "No internet connection" : "इंटरनेट कनेक्शन नहीं है";
						}()));
                    }
                    $.mobile.loading("hide");
					$("body").removeClass('ui-disabled');
                });
                otpoutput.error(function () {
                    $.mobile.loading("hide");
					$("body").removeClass('ui-disabled');
                    alert((function () {
                        return App.lang ? "error in communication" : "संचार में त्रुटि";
                    }()));
                });
            }
            return false;
            //BackboneRouter.navigate('main',{trigger:false, replace: false});
        }
    });
    return otpView;
});