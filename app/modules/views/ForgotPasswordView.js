/*global define,alert */
/*jslint nomen: true*/

define([
    "jquery",
    "jquery.validate",
    "lodash",
    "backbone",
    "handlebars",
    "modules/views/abstract/BaseView",
    "text!templates/forgotPasswordTemplate.html",
    "app"
], function ($, jqv, _, Backbone, Handlebars, BaseView, ForgotPasswordTemplate, App) {
    
    'use strict';
    var ForgotpasswordView = BaseView.extend({
        pageId : 'otp',
        partialTemplate : ForgotPasswordTemplate,
        initialize : function () {
            BaseView.prototype.initialize.apply(this, arguments);
            $("#forgot-password").validate({
                focusCleanup: true,
                rules : {
                    mobileNo : {
                        minlength : 10,
                        maxlength : 10,
                        mobile : true
                    }
                },
           
                messages : {
                    mobileNo : {
                        mobile: App.lang ? "Mobile number should start with 7,8,9 only" : "मोबाइल नंबर 7,8,9 के साथ शुरू करना चाहिए ही।",
                        required : App.lang ? "This field is required." : "अनिवार्य क्षेत्र रिक्त नहीं हो सकता, कृपया दर्ज करे",
                        number : App.lang ? "Please enter a valid number." : "एक मान्य नंबर दर्ज करें।",
                        minlength : App.lang ? "Please, enter 10 digit mobile number without 0 or +91." : "कृपया 10 अंको का वैध मोबाइल नम्बर दर्ज करे , 0 या +91 न लगाये",
                        maxlength : App.lang ? "Please, enter 10 digit mobile number without 0 or +91." : "कृपया 10 अंको का वैध मोबाइल नम्बर दर्ज करे , 0 या +91 न लगाये"
                    }
                  
                }
            });
            $("#forgot-password1").validate({
                focusCleanup: true,
                rules : {
                    otp : {
                        minlength : 5,
                        maxlength : 5
                    },
                    mobileNo : {
                        minlength : 10,
                        maxlength : 10
                    },
                    pswd_confirm : {
                        equalTo : "#pwd-forgot"
                    }
                },
           
                messages : {
                    pswrd : {
                        required : App.lang ? "This field is required." : "अनिवार्य क्षेत्र रिक्त नहीं हो सकता, कृपया दर्ज करे"
                    },
                    mobileNo : {
                        required : App.lang ? "This field is required." : "अनिवार्य क्षेत्र रिक्त नहीं हो सकता, कृपया दर्ज करे",
                        number : App.lang ? "Please enter a valid number." : "एक मान्य नंबर दर्ज करें।",
                        minlength : App.lang ? "Please, enter 10 digit mobile number without 0 or +91." : "कृपया 10 अंको का वैध मोबाइल नम्बर दर्ज करे , 0 या +91 न लगाये",
                        maxlength : App.lang ? "Please, enter 10 digit mobile number without 0 or +91." : "कृपया 10 अंको का वैध मोबाइल नम्बर दर्ज करे , 0 या +91 न लगाये"
                    },
                    otp : {
                        required : App.lang ? "This field is required." : "अनिवार्य क्षेत्र रिक्त नहीं हो सकता, कृपया दर्ज करे",
                        minlength : App.lang ?  "Please, enter 5 character OTP." : "कृपया 5 अंको का वैध OTP दर्ज करे ",
                        maxlength : App.lang ?  "Please, enter 5 character OTP." : "कृपया 5 अंको का वैध OTP दर्ज करे "
                    },
                    pswd_confirm : {
                        required : App.lang ? "This field is required." : "अनिवार्य क्षेत्र रिक्त नहीं हो सकता, कृपया दर्ज करे",
                        equalTo: App.lang ? "Please, enter the same password." : "कृपया एक ही पासवर्ड दर्ज करें।"
                    }
                }
            });

            $('#pwd-forgot').attr('disabled', true);
            $('#otp-forgot').attr('disabled', true);
            $('#btn-submit-pass').prop("disabled", true);
           // $('#btn-submit-pass').attr('disabled',true);
            //$("#mobile-forgot").val();
        },
        getHeaderTitle : function () {
            return App.lang ? 'Forgot Password' : "पासवर्ड भूल गए";
        },
        getSpecificTemplateValues : function () {
            return {
                'mobile' : App.lang ? "Mobile Number" : "मोबाइल न. दर्ज करें",
                'submit' : App.lang ? "Validate Yourself" : "जमा करें",
                'reset'  : App.lang ? "Reset Password" : "नया पासवर्ड दर्ज करें",
                'otp' : App.lang ? "OTP" : "ओटीपी",
                'pwdchange' : App.lang ? "Change Password" : "पासवर्ड बदलें",
                'confirm' : App.lang ? "Confirm Password" : "नया पासवर्ड पुनः दर्ज करें"
            };
        },
        events : function () {
            return _.extend({
                'click #btn-submit-mobile' : 'submitMobileNo',
                'click #btn-submit-pass' : 'resetPassword'
                
            }, this.constructor.__super__.events);
        },
        submitMobileNo : function () {
            var output,
                response,
                jsonResponse,
                envelope,
                that = this;
            if ($("#forgot-password").valid()) {
                envelope = App.envelopeGenerator({
                    'mobileNo' : $("#mobile-forgot").val()
                }, "forgotPassword");
                output = App.makeAjaxCall1("POST", App.url, envelope);
                output.success(function (data) {
                    response =  App.getJsonObj(data);
                    alert((function () {
                        return App.lang ? "An OTP has been sent to " + $("#mobile-forgot").val() : "एक समय पासवर्ड " + $("#mobile-forgot").val() + " को भेज दिया गया है";
                    }()));
                    $("#pwd-forgot").removeAttr('disabled');
                    $("#otp-forgot").removeAttr('disabled');
                    $('#btn-submit-pass').prop("disabled", false);
                    $.mobile.loading("hide");
                    $("body").removeClass('ui-disabled');
                });
                output.error(function (error) {
                    App.displayErrorMsg();
                });
        
            }
        },
        resetPassword : function () {
            var output,
                response,
                jsonResponse,
                envelope,
                that = this,
             
                fmobile = $("#mobile-forgot").val(),
                fotp = $("#otp-forgot").val(),
                pass = $("#pwd-forgot").val();
            if ($("#forgot-password1").valid()) {
                envelope = App.envelopeGenerator({
                    'mobileNo' : fmobile,
                    'otp' :  fotp,
                    'password' : pass
                }, "changePassword");
      
                
                output = App.makeAjaxCall1("POST", App.url, envelope);
                output.success(function (data) {
                    response =  App.getJsonObj(data);
                    if (response.changePasswordReturn === "OTP Incorrect") {
                        alert((function () {
							return App.lang ? "Incorrect OTP" : "ओटीपी  पासवर्ड गलत है";
						}()));
                    } else {
                        alert(response.changePasswordReturn);
                        /*App.Routers.BackboneRouter.navigate('#login', {
                        trigger: true,
                        replace: false
                    });*/
                        App.Routers.BackboneRouter.back(-1);
                    }
                    
                    $.mobile.loading("hide");
                    $("body").removeClass('ui-disabled');
                });
                output.error(function (error) {
                    App.displayErrorMsg();
                });
            
            
            
            }
        }
    });
    return ForgotpasswordView;
});