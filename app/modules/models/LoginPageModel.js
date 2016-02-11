/*global define*/
define(['backbone'], function (Backbone) {
    'use strict';
    var LoginPageModel = Backbone.Model.extend({
        headerTitle : function (lang) {
            return lang ? "Login" : "लॉग इन";
        },
        pageTitle : function (lang) {
            return lang ? "Welcome" : "नमस्कार";
        },
        pageHeader : function (lang) {
            return lang ? "Sign in" : "साइन इन करें";
        },
        firstLabel : function (lang) {
            return lang ? "User Name" : "उपयोगकर्ता";
        },
        secondLabel : function (lang) {
            return lang ? "Password" : "पासवर्ड";
        },
        thirdLabel : function (lang) {
            return lang ? "Remember me" : "मुझे याद रखें";
        },
        submit : function (lang) {
            return lang ? "Submit" : "जमा करें";
        },
        forgot : function (lang) {
            return lang ? "Forgot Password" : "पासवर्ड भूल गए";
        },
        fourthLabel : function (lang) {
            return lang ? "Don't have an account yet ?" : "खाता नहीं है?";
        },
        signup : function (lang) {
            return lang ? "Signup" : "खाता रजिस्टर करें";
        },
          error1 : function (lang) {
            return lang ? "This field is required." : "अनिवार्य क्षेत्र रिक्त नहीं हो सकता, कृपया दर्ज करे";
        },
         error4 : function (lang) {
            return lang ? "Please, enter 10 digit mobile number without 0 or +91." : "कृपया 10 अंको का वैध मोबाइल नम्बर दर्ज करे , 0 या +91 न लगाये";
        },
        error5 : function (lang) {
            return lang ? "Please enter a valid number." : "एक मान्य नंबर दर्ज करें।";
        },
        error6 : function (lang) {
            return lang ? "Mobile number should start with 7,8,9 only" : "मोबाइल नंबर 7,8,9 के साथ शुरू करना चाहिए ही।";
        }
    });
    return LoginPageModel;
});