/*global define,alert */
/*jslint nomen: true*/

define([
    "jquery",
    "backbone",
    "handlebars",
    "modules/views/abstract/BaseView",
    "modules/models/LoginPageModel",
    "text!templates/loginTemplate.html",
    "app"
], function ($, Backbone, Handlebars, BaseView, LoginPageModel, LoginTemplate, App) {
    
    'use strict';
    var LoginView = BaseView.extend({
        pageId : 'login',
        partialTemplate : LoginTemplate,
        model : new LoginPageModel(),
        initialize : function () {
            BaseView.prototype.initialize.apply(this, arguments);
            $("#loginform").validate({
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
                        mobile : this.model.error6(App.lang),
                        required : this.model.error1(App.lang),
                        number : this.model.error5(App.lang),
                        minlength : this.model.error4(App.lang),
                        maxlength : this.model.error4(App.lang)
                    },
                    pswrd : {
                        required : this.model.error1(App.lang)
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
                'pageHeader' : this.model.pageHeader(App.lang),
                'firstLabel' : this.model.firstLabel(App.lang),
                'secondLabel' : this.model.secondLabel(App.lang),
                'thirdLabel' : this.model.thirdLabel(App.lang),
                'submit' : this.model.submit(App.lang),
                'fourthLabel' : this.model.fourthLabel(App.lang),
                'signup' : this.model.signup(App.lang),
                'forgot' : this.model.forgot(App.lang)
            };
        },
        events : {
            'click #btn-submit' : 'submitLogin',
            'click #btn-signup' : 'signup',
            'click #btn-forgot-pwd' : 'forgorpassword'
        },
        submitLogin : function () {
            var temp,
                envelope,
                loginoutput,
                output,
                response,
                jsonResponse,
                rememberflag,
                obj = {},
                that = this;
            App.showMain = true;
            if ($("#loginform").valid()) {
                
                temp = JSON.parse(JSON.stringify($('#loginform').serializeArray()));
                $.each(temp, function () {
                    if (obj[this.name] !== undefined) {
                        if (!obj[this.name].push) {
                            obj[this.name] = [obj[this.name]];
                        }
                        obj[this.name].push(this.value || '');
                    } else {
                        obj[this.name] = this.value || '';
                    }
                });
                rememberflag = obj["chck-remember-me"];
                delete obj["chck-remember-me"];
                
                envelope = App.envelopeGenerator(obj, "authenticateUser");
                loginoutput = App.makeAjaxCall1("POST", App.url, envelope);
                loginoutput.success(function (data) {
                    response = App.getJsonObj(data);
                
               
                    if (response) {
                        
                        if (response.authenticateUserReturn === "Invalid User") {
                            alert((function () {
								return App.lang ? "Invalid User" : "अमान्य उपयोगकर्ता";
							}()));
                        } else {
                            if (rememberflag) {
                                localStorage.setItem("loginFlag", true);
                            } else {
                                localStorage.setItem("loginFlag", false);
                            }
                            localStorage.setItem("userInfo", response.authenticateUserReturn);
                            App.user = JSON.parse(localStorage.getItem("userInfo"));
                       // App.Routers.BackboneRouter.navigate('#main', {trigger: true, replace: false});
                            
                            window.location.replace("#main");
                        }
                    } else {
                        alert((function () {
                            return App.lang ? "Error in communication" : "संचार में त्रुटि";
                        }()));
                    }
                    $.mobile.loading("hide");
					$("body").removeClass('ui-disabled');
                });
                loginoutput.error(function () {
                    $.mobile.loading("hide");
				    $("body").removeClass('ui-disabled');
                    alert((function () {
                        return App.lang ? "Error in communication" : "संचार में त्रुटि";
                    }()));
                });
            }
        },
        signup : function () {
            App.showSignup = true;
        },
        forgorpassword : function () {
            App.Routers.BackboneRouter.navigate('#forgotpwd', {trigger: true, replace: false});
        }
       
    });
    
    return LoginView;
    
});