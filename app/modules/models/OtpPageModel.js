/*global define*/
define(['backbone'], function (Backbone) {
    'use strict';
    var OtpPageModel = Backbone.Model.extend({
        headerTitle : function (lang) {
            return lang ? "OTP" : "ओ.टी.पी";
        },
        pageTitle : function (lang) {
            return lang ? "Please enter one time password that was sent to your mobile" : "कृपया आपके मोबाइल पर भेजा गया ओटीपी पासवर्ड दर्ज करे 'एक बार के उपयोग हेतु'";
        },
        label : function (lang) {
            return lang ? "OTP" : "ओ.टी.पी";
        },
        submit : function (lang) {
            return lang ? "Submit" : "जमा करे";
        },
        resendOtp : function (lang) {
            return lang ? "Resend OTP" : "पुनः ओटीपी भेजे";
        },
        error1 : function (lang) {
            return lang ? "This field is required." : "अनिवार्य क्षेत्र रिक्त नहीं हो सकता ,कृपया दर्ज करे";
        },
        error2 : function (lang) {
            return lang ? "This field is required." : "अनिवार्य क्षेत्र रिक्त नहीं हो सकता ,कृपया दर्ज करे";
        }
    });
    return OtpPageModel;
});