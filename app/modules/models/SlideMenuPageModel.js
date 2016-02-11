/*global define*/
define(['backbone'], function (Backbone) {
    'use strict';
    var SlideMenuPageModel = Backbone.Model.extend({
        listItem1 : function (lang) {
            return lang ? "My Services" : "मेरी सेवाएं";
        },
        listItem2 : function (lang) {
            return lang ? "All Services" : "सभी सेवाएं देखें";
        },
        listItem3 : function (lang) {
            return lang ? "My Applications" : "मेरे आवेदन";
        },
        listItem4 : function (lang) {
            return lang ? "My Stats" : "मेरे आंकड़े";
        },
        listItem5 : function (lang) {
            return lang ? "Feedback" : "प्रतिक्रिया";
        },
        listItem6 : function (lang) {
            return lang ? "My Profile" : "मेरा प्रोफाइल";
        },
        listItem7 : function (lang) {
            return lang ? "About" : "हमारे बारे में";
        },
        listItem8 : function (lang) {
            return lang ? "Search a CSC/LSK" : "सीएससी / LSK खोजें";
        }
    });
    return SlideMenuPageModel;
});