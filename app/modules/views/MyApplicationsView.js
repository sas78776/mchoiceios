/*global define */
/*jslint nomen: true*/
define([
    "jquery",
    "lodash",
    "backbone",
    "handlebars",
    "modules/models/ApplicationModel",
    "modules/views/ApplicationItemView",
    "text!templates/myApplicationsTemplate.html",
    "app"
], function ($, _, Backbone, Handlebars, ApplicationModel, ApplicationItemView, MyApplicationsTemplate, App) {
    
    'use strict';
    var MyApplicationsView = Backbone.View.extend({
        template : Handlebars.compile(MyApplicationsTemplate),
        events : {
        },
        initialize : function () {
            //this.render();
            this.listenTo(this.collection, 'all', this.onNavigated);
            this.listenTo(this.collection, 'add', this.addOne);
            this.listenTo(App.Views.HomeView, 'homerendered', this.onNavigated);
            this.listenTo(this, 'fetchdata', this.fetchData);
        },
        render : function () {
            this.$el.html(this.template);
            return this;
        },
        addOne : function (applicationModel) {
            var view = new ApplicationItemView({model: applicationModel});
            this.$('#my-application-list').html();
            this.$('#my-application-list').append(view.render().$el).listview().listview('refresh').trigger('create');
        },
        onNavigated : function (navigateId) {
            if (navigateId === "myapplications") {
                $('#main').html(this.render().el).trigger('create');
                this.trigger('fetchdata');
            }
        },
        fetchData : function () {
            this.collection.reset();
            var envelope,
                response,
                output,
                applicationmodel,
                that = this,
                listItem,
                jsonResponse;
            envelope = App.envelopeGenerator((function () {
                return {
                    "mobileNo" : App.user.mobileNo,
                    "lang" : App.lang ? "en" : "hi"
                };
            }()), "getApplicationList");
            output = App.makeAjaxCall1("POST", App.url, envelope);
            output.success(function (data) {
                var item;
                response = App.getJsonObj(data);
                jsonResponse = $.parseJSON(response.getApplicationListReturn);
                if (!App.isEmpty(jsonResponse)) {
                    $("#my-application-list").empty();
                    for (item in jsonResponse.APPL) {
                        if (jsonResponse.APPL.hasOwnProperty(item)) {
                            console.log(jsonResponse.APPL[item].ACTION_DT);
                            console.log(jsonResponse.APPL[item].SPDV_REMARKS);
                            applicationmodel = new ApplicationModel({
                                appId : jsonResponse.APPL[item].REF_NO,
                                serviceName: jsonResponse.APPL[item].S_NM,
                                appDate : jsonResponse.APPL[item].START_DATE,
                                actionDate : function (){
                                    if(App.lang) {
                                        return App.isEmpty(jsonResponse.APPL[item].ACTION_DT) ? "Not Available" : jsonResponse.APPL[item].ACTION_DT;
                                    } else {
                                        return App.isEmpty(jsonResponse.APPL[item].ACTION_DT) ? "उपलब्ध नहीं है" : jsonResponse.APPL[item].ACTION_DT;
                                    }
                                }(),
                                action : jsonResponse.APPL[item].ACTION,
                                remarks : function (){
                                    if(App.lang) {
                                        return App.isEmpty(jsonResponse.APPL[item].SPDV_REMARKS) ? "Not Available" : jsonResponse.APPL[item].SPDV_REMARKS;
                                    } else {
                                        return App.isEmpty(jsonResponse.APPL[item].SPDV_REMARKS) ? "उपलब्ध नहीं है" : jsonResponse.APPL[item].SPDV_REMARKS;
                                    }
                                }(),
                                status : jsonResponse.APPL[item].STATUS
                            });

                            that.collection.add(applicationmodel);
                        }
                    }
                }
                $.mobile.loading("hide");
                $("body").removeClass('ui-disabled');
            });
            output.error(function (error) {
                App.displayErrorMsg();
            });
            
        }
    });
    _.extend(MyApplicationsView, Backbone.Events);
    return MyApplicationsView;
});