/*jslint nomen: true*/
/*global require */

require([
	'jquery',
    'jquery.validate',
    'jquerymobile',
    'lodash',
    'backbone',
    'handlebars',
    'initialize.config',
    'modules/views/LanguageView',
    'modules/views/LoginView',
    'modules/views/HomeView',
    'modules/views/SignupView',
    'modules/views/OtpView',
    'modules/views/UserDataView',
    'modules/views/ServiceFormView',
    'modules/views/FileUploadView',
    'modules/views/ConfirmationView',
    'modules/views/ForgotPasswordView',
    "modules/collections/ServiceFormItemCollection",
    'handlebar.helpers',
    "modules/collections/FileUploadCollection",
    'app'
], function ($,jqv, jqm, _, Backbone, Handlebars, initializeSettings, LanguageView, LoginView, HomeView, SignupView, OtpView, UserDataView, ServiceFormView, FileUploadView, ConfirmationView, ForgotPasswordView, ServiceFormItemCollection, Handlebarhelpers, FileUploadCollection, App) {
    'use strict';
    initializeSettings.init();

    var Router = Backbone.Router.extend({
        routes: {
            '' : 'language1',
            //'' : 'language',
            'login' : 'checkLogin1',
            //'login' : 'checkLogin',
            'main' : 'showMain',
            'signup' : 'checkSignup',
            'otp' : 'showOtp',
            'userdata' : 'showUserForm',
            'serviceform' : 'showServiceForm',
            'fileupload' : 'showFileUpload',
            'confirmation' : 'showConfirmation',
            'forgotpwd' : 'showForgotPassword'
        },
        language1 : function () {
            return App.Views.LanguageView = new LanguageView();
        },
        language : function () {
            return App.showLanguage ? this.showLanguagePage() : App.Routers.BackboneRouter.back(-1);
        },
        showLanguagePage : function () {
            return !App.Views.LanguageView ? App.Views.LanguageView = new LanguageView() : App.Views.LanguageView.render();
        },
        checkLogin1 : function () {
            return !App.loginExist ? this.login1() : window.location.replace("#main");
        },
        checkLogin : function () {
            return !App.loginExist ? this.login() : App.Routers.BackboneRouter.navigate('main', {trigger : true, replace: false});
        },
        login1 : function () {
            return this.showLogin1();
        },
        login : function () {
            return App.showLogin ? this.showLogin() : App.Routers.BackboneRouter.back(-1);
        },
        showLogin1: function () {
            return !App.Views.LoginView ? App.Views.LoginView = new LoginView() : App.Views.LoginView.render();
        },
        showLogin: function () {
            App.showLanguage = false;
            App.languageExist = false;
            return !App.Views.LoginView ? App.Views.LoginView = new LoginView() : App.Views.LoginView.render();
        },
        showMain : function () {
            return App.showMain ? this.main() : '';
        },
        main : function () {
            App.loginExist = false;
            App.showLogin = false;
            App.showLanguage = false;
//                if (App.Views.HomeView) {
//                    App.Views.HomeView.remove();
//                }
            
            if (!App.Views.HomeView) {
                App.Views.HomeView = new HomeView();
            } else {
                App.Views.HomeView.remove();
                App.Views.HomeView = new HomeView();
            }
            
            if (App.LastSelected) {
                App.Views.SlideMenu.trigger('navigateTo', App.LastSelected.data("itemid"), App.LastSelected.data("headertitle"));
            } else {
                App.Views.SlideMenu.trigger('navigateTo', "allservices", "All Services");
            }
        },
        checkSignup : function () {
            return App.showSignup ? this.showSignup() : App.Routers.BackboneRouter.back(-1);
        },
        showSignup : function () {
            App.loginExist = false;
            App.showLogin = true;
            App.showLanguage = false;
            return !App.Views.SignupView ? App.Views.SignupView = new SignupView() : App.Views.SignupView.render();
        },
        showOtp : function () {
            return !App.Views.OtpView ? App.Views.OtpView = new OtpView() : App.Views.OtpView.render();
        },
        showConfirmation : function () {
            App.Views.ConfirmationView = new ConfirmationView();
        },
        showUserForm : function () {
            App.showMain = true;
            if (!App.Views.UserDataView) {
                App.Views.UserDataView = new UserDataView();
            } else {
                App.Views.UserDataView.remove();
                App.Views.UserDataView = new UserDataView();
            }
            //return !App.Views.UserDataView ? App.Views.UserDataView = new UserDataView() : App.Views.UserDataView.render();
        },
        showServiceForm : function () {
            App.Views.ServiceFormView = new ServiceFormView({collection : ServiceFormItemCollection});
        },
        showFileUpload : function () {
            App.Views.FileUploadView = new FileUploadView({collection : FileUploadCollection});
        },
        showForgotPassword : function () {
            if (!App.Views.ForgotPasswordView) {
                App.Views.ForgotPasswordView = new ForgotPasswordView();
            } else {
                App.Views.ForgotPasswordView.remove();
                App.Views.ForgotPasswordView = new ForgotPasswordView();
            }
        }
    });
    $(function () {
         $.validator.addMethod("alpha", function(value, element) {
        return this.optional(element) || value == value.match(App.lang ? /^[a-zA-Z\s]+$/ : /^[a-zA-Z\u0900-\u097F ]+$/);
        });
         $.validator.addMethod("mobile", function(value, element) {
            return this.optional(element) || value == value.match(/^[7-9][0-9]*$/);
         });
        $.validator.addMethod("adhaar", function(value, element) {
            return this.optional(element) || value == (value.match(/^[0-9]*[1-9][0-9]*$/));
         });
		$.validator.addMethod("specialcharacters", function(value, element) {
            return this.optional(element) || value == (value.match(App.lang ? /^[0-9a-zA-Z,(/)-\s]*$/ : /^[0-9a-zA-Z\u0900-\u097F,(/)-\s]*$/));
         });
        App.user = JSON.parse(localStorage.getItem("userInfo"));
        var temp = localStorage.getItem("loginFlag");
        if (temp === null) {
            App.loginExist = false;
            App.showLogin = true;
        } else if (temp === "true") {
            App.loginExist = true;
            App.showLogin = false;
        } else {
            App.loginExist = false;
            App.showLogin = true;
        }
        App.Routers.BackboneRouter = new Router();
        App.Routers.BackboneRouter.on('route', function (route, params) {
            App.urlChangeCount = App.urlChangeCount + 1;
        });
        App.Routers.BackboneRouter.back = function (a) {
            App.urlChangeCount -= 2;
            window.history.back(a);
        };
        Backbone.history.start({ pushState : false });
    });
});