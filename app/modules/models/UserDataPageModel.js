/*global define*/
define(['backbone'], function (Backbone) {
    'use strict';
    var UserDataPageModel = Backbone.Model.extend({
        headerTitle : function (lang) {
            return lang ? "User Data" : "आवेदक की जानकारी";
        },
        pageTitle : function (lang) {
            return lang ? "Applicants Basic Information" : "आवेदक की बुनियादी जानकारी";
        },
        label1 : function (lang) {
            return lang ? "Name Of Applicant" : "आवेदक का नाम";
        },
        label2 : function (lang) {
            return lang ? "Name of Beneficiary" : "हितग्राही का नाम";
        },
        label3 : function (lang) {
            return lang ? "Beneficiary same as Applicant" : "क्या हितग्राही और आवेदक एक ही है?";
        },
        label4 : function (lang) {
            return lang ? "Date of Application" : "आवेदन दिनांक";
        },
        label5 : function (lang) {
            return lang ? "Address Of Applicant" : "आवेदक का पता";
        },
        label6 : function (lang) {
            return lang ? "Mobile Number" : "मोबाइल नंबर";
        },
        label7 : function (lang) {
            return lang ? "Email" : "ई मेल";
        },
        label8 : function (lang) {
            return lang ? "Aadhar Card Number" : "आधार कार्ड नंबर";
        },
        label9 : function (lang) {
            return lang ? "District" : "जिला";
        },
        submit : function (lang) {
            return lang ? "Submit" : "जमा करें";
        },
        selectLabel : function (lang) {
            return lang ? "Select" : "चयन";
        },
        placeOfEvent : function (lang) {
            return lang ? "Place Of Event" : "कार्यालय का चयन";
        },
        error1 : function (lang) {
            return lang ? "This field is required." : "अनिवार्य क्षेत्र रिक्त नहीं हो सकता, कृपया दर्ज करे";
        },
        error2 : function (lang) {
            return lang ? "Please enter a valid email address." : "कृपया वैध ई-मेल का पता दर्ज करे जैसे कि (sun@gmail.com)";
        },
        error3 : function (lang) {
            return lang ? "Please enter a valid number." : "एक मान्य नंबर दर्ज करें।";
        },
        error4 : function (lang) {
            return lang ? "Please, enter 10 digit mobile number without 0 or +91." : "कृपया 10 अंको का वैध मोबाइल नम्बर दर्ज करे , 0 या +91 न लगाये";
        },
          error5 : function (lang) {
            return lang ? "Please, enter 12 digit Unique Addhar number." : "कृपया 12 अंको का वैध आधार नम्बर दर्ज करे";
        },
           error6 : function (lang) {
            return lang ? "Please use only(A-Z Alphabets)" : "कृपया (अ-अ: या क-ज्ञ) अक्षर दर्ज करें।";
        },
         error7 : function (lang) {
            return lang ? "Mobile number should start with 7,8,9 only" : "मोबाइल नंबर 7,8,9 के साथ शुरू करना चाहिए ही।";
        }
        
    });
    return UserDataPageModel;
});