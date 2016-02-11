/*global define */
/*global alert */
/*jslint nomen: true*/
define([
    "jquery",
    "lodash",
    "backbone",
    "handlebars",
    "modules/models/ServiceListModel",
    "modules/models/DistrictModel",
    "modules/views/ServiceListItemView",
    "text!templates/serviceListTemplate.html",
    "app"
], function ($, _, Backbone, Handlebars, ServiceListModel, DistrictModel, ServiceListItemView, ServiceListTemplate, App) {
    
    'use strict';
    var AllServicesView = Backbone.View.extend({
        template : Handlebars.compile(ServiceListTemplate),
        events : {
        },
        initialize : function () {
            //this.render();
            this.listenTo(this.collection, 'all', this.onNavigated);
            this.listenTo(this.collection, 'add', this.addOne);
            this.listenTo(App.Views.HomeView, 'homerendered', this.onNavigated);
            this.listenTo(this, 'fetchdata', this.fetchdata);
        },
        render : function () {
            this.$el.html(this.template({
                'placeholderText' : App.lang ? "search here" : "यहाँ खोज"
            }));
            return this;
        },
        addOne : function (serviceListModel) {
            var view = new ServiceListItemView({model: serviceListModel});
            this.$('#service-list').append(view.render().$el).listview().listview('refresh').trigger('create');
        },
        onNavigated : function (navigateId, headerTitle) {
            if (navigateId === "allservices") {
                $('#main').html(this.render().el).trigger('create');
                if (this.collection.length === 0) {
                    this.trigger('fetchdata');
                } else {
                    var that = this;
                    _.each(this.collection.models, function (item) {
                        that.addOne(item);
                    });
                }
                
            }
        },
        fetchdata : function () {
            this.collection.reset();
            var envelope,
                envelope1,
                envelope2,
                envelope3,
                output1,
                output2,
                output3,
                item,
                serviceModel,
                distModel,
                response,
                that = this,
                jsonResponse,
                output;
    /*        if (!($.parseJSON(localStorage.getItem("servicesInfoEn")) && $.parseJSON(localStorage.getItem("servicesInfoHi")))) {*/
                
            envelope = App.envelopeGenerator((function () {
                return {
                    "lang" : App.retrieveLang()
                };
            }()), "getAllService");
            envelope1 = App.envelopeGenerator((function () {
                return {
                    "lang" : "hi"
                };
            }()), "getAllService");
            output = App.makeAjaxCall1("POST", App.url, envelope);
           // output1 = App.makeAjaxCall1("POST", App.url, envelope1);

            output.success(function (data) {
                that.getServices(data);
            });
          /*  output1.success(function (data) {
                that.getHiServices(data);
            });*/
            output.error(function () {
                that.displayError();
            });
             /*   output1.error(function () {
                    that.displayError();
                });*/
           /* } else {
                if (localStorage.getItem("userLang")  === "true") {
                    jsonResponse = $.parseJSON(localStorage.getItem("servicesInfoEn"));
                } else {
                    jsonResponse = $.parseJSON(localStorage.getItem("servicesInfoHi"));
                }
                for (item in jsonResponse) {
                    if (jsonResponse.hasOwnProperty(item)) {
                        serviceModel = new ServiceListModel({
                            serviceId : item,
                            serviceName : jsonResponse[item],
                            icon_location : "assets/img/icons/" + item + ".png"
                        });
                        that.collection.add(serviceModel);
                    }
                }
                serviceModel = new ServiceListModel({
                    serviceId : 0,
                    serviceName : (function () {return App.lang ? "CSC Services" : "सीएससी सेवाएं"; }()),
                    icon_location : "assets/img/icons/18.png"
                });
                that.collection.add(serviceModel);
            }*/
         /*   if (!($.parseJSON(localStorage.getItem("districtsEn")) && $.parseJSON(localStorage.getItem("districtsHi")))) {*/
            envelope2 = App.envelopeGenerator((function () {
                return {
                    "lang" : App.retrieveLang()
                };
            }()), "getDistrictList");
            envelope3 = App.envelopeGenerator((function () {
                return {
                    "lang" : "hi"
                };
            }()), "getDistrictList");
            output2 = App.makeAjaxCall1("POST", App.url, envelope2);
            //output3 = App.makeAjaxCall1("POST", App.url, envelope3);
            output2.success(function (data) {
                that.getDistricts(data);
            });
          /*  output3.success(function (data) {
                that.getDistrictsHi(data);
            });*/
            output2.error(function (error) {
                //that.displayError();
            });
            /*    output3.error(function (error) {
                    that.displayError();
                });*/
          /*  } else {
                if (localStorage.getItem("userLang")  === "true") {
                    jsonResponse = $.parseJSON(localStorage.getItem("districtsEn"));
                } else {
                	
                    jsonResponse = $.parseJSON(localStorage.getItem("districtsHi"));
                }
                for (item in jsonResponse) {
                    if (jsonResponse.hasOwnProperty(item)) {
                        distModel = new DistrictModel({
                            distId : item,
                            distName : jsonResponse[item]
                        });
                        if (localStorage.getItem("userLang")  === "true") {
                            App.distCollectionEn.add(distModel);
                        } else {
                            App.distCollectionHi.add(distModel);
                        }
                    }
                }
            
            }*/
            
            
        },
        getServices : function (data) {
            var response,
                jsonResponse,
                serviceModel,
                item,
                that = this;
            response = App.getJsonObj(data);
            jsonResponse = $.parseJSON(response.getAllServiceReturn);
            localStorage.setItem("servicesInfo", JSON.stringify(jsonResponse));
          //  if (App.lang) {
            for (item in jsonResponse) {
                if (jsonResponse.hasOwnProperty(item)) {
                    serviceModel = new ServiceListModel({
                        serviceId : item,
                        serviceName : jsonResponse[item],
                        icon_location : "assets/img/icons/" + item + ".png"
                    });
                    that.collection.add(serviceModel);
                }
            }
            serviceModel = new ServiceListModel({
                serviceId : 0,
                serviceName : (function () {return App.lang ? "CSC Services" : "सीएससी सेवाएं"; }()),
                icon_location : "assets/img/icons/18.png"
            });
            that.collection.add(serviceModel);
      //  }
            $.mobile.loading("hide");
            $("body").removeClass('ui-disabled');
                
        },
       /* getHiServices : function (data) {
            var response,
                jsonResponse,
                serviceModel,
                item,
                that = this;
            response = App.getJsonObj(data);
            jsonResponse = $.parseJSON(response.getAllServiceReturn);
            localStorage.setItem("servicesInfoHi", JSON.stringify(jsonResponse));
            if (!App.lang) {
                for (item in jsonResponse) {
                    if (jsonResponse.hasOwnProperty(item)) {
                        serviceModel = new ServiceListModel({
                            serviceId : item,
                            serviceName : jsonResponse[item],
                            icon_location : "assets/img/icons/" + item + ".png"
                        });
                        that.collection.add(serviceModel);
                    }
                }
                serviceModel = new ServiceListModel({
                    serviceId : 0,
                    serviceName : (function () {return App.lang ? "CSC Services" : "सीएससी सेवाएं"; }()),
                    icon_location : "assets/img/icons/18.png"
                });
                that.collection.add(serviceModel);
            }
            $.mobile.loading("hide");
			$("body").removeClass('ui-disabled');
         
        },*/
        getDistricts : function (data) {
            var response,
                jsonResponse,
                distModel,
                item,
                that = this;
            response = App.getJsonObj(data);
            jsonResponse = $.parseJSON(response.getDistrictListReturn);
            localStorage.setItem("districts", JSON.stringify(jsonResponse));
            for (item in jsonResponse) {
                if (jsonResponse.hasOwnProperty(item)) {
                    distModel = new DistrictModel({
                        distId : item,
                        distName : jsonResponse[item]
                    });
                    App.distCollection.add(distModel);
                }
            }
            $.mobile.loading("hide");
			$("body").removeClass('ui-disabled');
    
        },
     /*   getDistrictsHi : function (data) {
            var response,
                jsonResponse,
                distModel,
                item,
                that = this;
            response = App.getJsonObj(data);
            jsonResponse = $.parseJSON(response.getDistrictListReturn);
            localStorage.setItem("districtsHi", JSON.stringify(jsonResponse));
            for (item in jsonResponse) {
                if (jsonResponse.hasOwnProperty(item)) {
                    distModel = new DistrictModel({
                        distId : item,
                        distName : jsonResponse[item]
                    });
                    App.distCollectionHi.add(distModel);
                }
            }
            $.mobile.loading("hide");
			$("body").removeClass('ui-disabled');
    
        },*/
        displayError : function () {
            $.mobile.loading("hide");
            $("body").removeClass('ui-disabled');
            alert((function () {
                return App.lang ? "error in communication" : "संचार में त्रुटि";
            }()));
        
        }
    });
    _.extend(AllServicesView, Backbone.Events);
    return AllServicesView;
});