/*global define,alert */
/*jslint nomen: true*/

define([
    "jquery",
    "jquery.validate",
    "lodash",
    "backbone",
    "handlebars",
    "modules/views/abstract/BaseView",
    "modules/models/SignupPageModel",
    "text!templates/signupTemplate.html",
    "app"
], function ($, jqv, _, Backbone, Handlebars, BaseView, SignupPageModel, SignupTemplate, App) {
    
    'use strict';
    var SignupView = BaseView.extend({
        pageId : 'signup',
        partialTemplate : SignupTemplate,
        model : new SignupPageModel(),
        
        initialize : function () {
            
            this.on('languageChanged', this.render());
            BaseView.prototype.initialize.apply(this, arguments);
            $("#signupform").validate({
                focusCleanup : true,
                rules : {
                    fName: {
                        required : true,
                        alpha : true
                    },
                    lName : {
                        alpha : true
                    },
                    mobileNo : {
                        minlength : 10,
                        maxlength : 10,
                        mobile: true
                    }
                },
                messages : {

                    fName : {
                        required : this.model.error1(App.lang),
                        alpha:  this.model.error6(App.lang)
                    },
                    lName : {
                        required : this.model.error1(App.lang),
                        alpha:  this.model.error6(App.lang)
                    },
                    emailId : {
                        required : this.model.error1(App.lang),
                        email : this.model.error2(App.lang)
                    },
                    mobileNo : {
                        mobile: this.model.error7(App.lang),
                        required : this.model.error1(App.lang),
                        number : this.model.error5(App.lang),
                        minlength : this.model.error4(App.lang),
                        maxlength : this.model.error4(App.lang)
                    },
                    pswrd : {
                        required : this.model.error1(App.lang)
                    },
                    passwordConfirm : {
                        required : this.model.error1(App.lang)
                    }
                }
            });
            $("#txt-password-confirm").rules("add", {
                equalTo : "#txt-password",
                messages : {
                    equalTo : this.model.error3(App.lang)
                }
            });
        },
        getHeaderTitle : function () {
            return this.model.headerTitle(App.lang);
        },
        getSpecificTemplateValues : function () {
            return {
                'pageTitle' : this.model.pageTitle(App.lang),
                'firstLabel' : this.model.firstLabel(App.lang),
                'secondLabel' : this.model.secondLabel(App.lang),
                'thirdLabel' : this.model.thirdLabel(App.lang),
                'fourthLabel' : this.model.fourthLabel(App.lang),
                'fifthLabel' : this.model.fifthLabel(App.lang),
                'sixthLabel' : this.model.sixthLabel(App.lang),
                'submit' : this.model.submit(App.lang)
            };
        },
        events : function () {
            return _.extend({
                'click #btn-register' : 'register'
            }, this.constructor.__super__.events);
        },
        register : function () {
            var temp,
                envelope,
                response,
                item,
                output,
                jsonResponse,
                obj = {};
            if ($("#signupform").valid()) {
                
                temp = JSON.parse(JSON.stringify($('#signupform').serializeArray()));
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
                delete obj.passwordConfirm;
                App.user = obj;
                delete App.user.password;
                envelope = App.envelopeGenerator(obj, "signUp");
                output = App.makeAjaxCall1("POST", App.url, envelope);
                output.success(function (data) {
                    $.mobile.loading("hide");
					$("body").removeClass('ui-disabled');
                    response = App.getJsonObj(data);
                    if (response) {
                        if (response.signUpReturn === "Mobile Number Already Registered") {
                            alert((function () {
								return App.lang ? "Mobile Number Already Registered" : "मोबाइल नंबर पहले से पंजीकृत है";
							}()));
                        } else {
                            window.location.replace("#otp");
                        }
                        
                    } else {
                        alert((function () {
				            return App.lang ? "No internet connection" : "इंटरनेट कनेक्शन नहीं है";
						}()));
                    }
                });
                output.error(function () {
                    App.displayErrorMsg();
                });
            }
            return false;
        }
    });
    return SignupView;
});