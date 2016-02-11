/*global define*/
define(['backbone'], function (Backbone) {
    'use strict';
    var SignupPageModel = Backbone.Model.extend({
        headerTitle : function (lang) {
            return lang ? "Signup" : "साइन अप";
        },
        pageTitle : function (lang) {
            return lang ? "Sign Up" : "खाता रजिस्टर करें";
        },
        firstLabel : function (lang) {
            return lang ? "First Name" : "प्रथम नाम";
        },
        secondLabel : function (lang) {
            return lang ? "Last Name" : "अंतिम नाम";
        },
        thirdLabel : function (lang) {
            return lang ? "E-mail Address" : "ई-मेल का पता";
        },
        fourthLabel : function (lang) {
            return lang ? "Mobile Number" : "मोबाइल नम्बर";
        },
        fifthLabel : function (lang) {
            return lang ? "Password" : "पासवर्ड";
        },
        sixthLabel : function (lang) {
            return lang ? "Confirm Password" : "पासवर्ड पुनः दर्ज कर पुष्टि करे";
        },
        submit : function (lang) {
            return lang ? "Submit" : "जमा करें";
        },
        error1 : function (lang) {
            return lang ? "This field is required." : "अनिवार्य क्षेत्र रिक्त नहीं हो सकता, कृपया दर्ज करे";
        },
        error2 : function (lang) {
            return lang ? "Please enter a valid email address." : "कृपया वैध ई-मेल का पता दर्ज करे जैसे कि (sun@gmail.com)";
        },
        error3 : function (lang) {
            return lang ? "Please enter same password" : "एक ही पासवर्ड दर्ज करें";
        },
        error4 : function (lang) {
            return lang ? "Please, enter 10 digit mobile number without 0 or +91." : "कृपया 10 अंको का वैध मोबाइल नम्बर दर्ज करे , 0 या +91 न लगाये";
        },
        error5 : function (lang) {
            return lang ? "Please enter a valid number." : "एक मान्य नंबर दर्ज करें।";
        },
         error6 : function (lang) {
            return lang ? "Please use only(A-Z Alphabets)" : "कृपया (अ-अ: या क-ज्ञ) अक्षर दर्ज करें।";
        },
        error7 : function (lang) {
            return lang ? "Mobile number should start with 7,8,9 only" : "मोबाइल नंबर 7,8,9 के साथ शुरू करना चाहिए ही।";
        }
    });
    return SignupPageModel;
});