/*global define */
/*global alert */
/*jslint nomen: true*/
define([
    "jquery",
    "lodash",
    "backbone",
    "handlebars",
    "modules/models/CSCOperatorModel",
    "modules/views/SearchCSCItemView",
    "text!templates/searchCSCTemplate.html",
    "app"
], function ($, _, Backbone, Handlebars, CSCOperatorModel, SearchCSCItemView, SearchCSCTemplate, App) {

    'use strict';
    var SearchCSCView = Backbone.View.extend({
        template: _.template(SearchCSCTemplate),
        events: {
            'click #btn-search-csc': 'onSearch',
            'change #csc-distId': 'onSelectChange'
        },
        initialize: function () {
            //this.render();
            this.undelegateEvents();
            this.listenTo(App.Views.HomeView, 'homerendered', this.onNavigated);
        },
        render: function () {
            this.$el.html(this.template({
                'selectLabel': (function () {
                    return App.lang ? "Select" : "चयन";
                }()),
                'district': (function () {
                    return App.lang ? "District" : "जिला";
                }()),
                'block': (function () {
                    return App.lang ? "Block" : "ब्लॉक";
                }()),
                'search': (function () {
                    return App.lang ? "Search" : "खोजें";
                }())
            }));
            return this;
        },
        onNavigated: function (navigateId) {
            var envelope,
                response,
                output,
                jsonResponse;
            if (navigateId === "searchcsc") {
                $('#main').html(this.render().el).trigger('create');
                envelope = App.envelopeGenerator((function () {
                    return {
                        "lang": App.retrieveLang()
                    };
                }()), "getDistrictList");
                output = App.makeAjaxCall1("POST", App.url, envelope);
                output.success(function (data) {
                    var item;
                    response = App.getJsonObj(data);
                    jsonResponse = $.parseJSON(response.getDistrictListReturn);
                    for (item in jsonResponse) {
                        if (jsonResponse.hasOwnProperty(item)) {
                            $('<option>').val(item).text(jsonResponse[item]).appendTo('#csc-distId');
                        }
                    }
                    $.mobile.loading("hide");
					$("body").removeClass('ui-disabled');
                });
                output.error(function (error) {
                    App.displayErrorMsg();
                });
                
            }
        },
        onSearch: function () {
            this.collection.reset();
            var envelope,
                response,
                jsonResponse,
                output,
                listItem,
                cscoperatormodel,
                distId = parseInt($('#csc-distId').val(), 10),
                blkId = parseInt($('#csc-blockId').val(), 10),
                that = this,
                view;
            if (distId !== 0 && blkId !== 0) {
                envelope = App.envelopeGenerator((function () {
                    return {
                        "districtId": distId,
                        "blockId": blkId,
                        "lang": App.retrieveLang()

                    };
                }()), "findNearestCSC");
                output = App.makeAjaxCall1('POST', App.url, envelope);
                output.success(function (data) {
                    var item;
                    response = App.getJsonObj(data);
                    jsonResponse = $.parseJSON(response.findNearestCSCReturn);
                    if (jsonResponse.CSC.length) {

                        for (item in jsonResponse.CSC) {
                            if (jsonResponse.CSC.hasOwnProperty(item)) {
                                $("#operator-list").empty();
                                cscoperatormodel = new CSCOperatorModel({
                                    Name: jsonResponse.CSC[item].Name,
                                    MobileNo: jsonResponse.CSC[item].MobileNo,
                                    Address: jsonResponse.CSC[item].Address,
                                    EmailId: jsonResponse.CSC[item].Address
                                });

                                that.collection.add(cscoperatormodel);

                            }
                        }
                        _.each(that.collection.models, function (cscoperatormodel) {
                            view = new SearchCSCItemView({
                                model: cscoperatormodel
                            });
                            that.$('#operator-list').html();
                            that.$('#operator-list').append(view.render().$el).listview().listview('refresh').trigger('create');
                        });
                    } else {
                        $("#operator-list").empty();
                        listItem = "<li>" + (function () {
                            return App.lang ? "no search results found" : "कोई खोज परिणाम नहीं मिले";
                        }()) + "</li>";
                        $("#operator-list").append(listItem);
                    }
                    $.mobile.loading("hide");
					$("body").removeClass('ui-disabled');
                });
                output.error(function (error) {
                    App.displayErrorMsg();
                });
                
            } else {
                $("#operator-list").empty();
                alert((function () {
                    return App.lang ? "both district and block cannot be empty" : "जिला और ब्लॉक दोनों खाली नहीं हो सकता";
                }()));
            }
        },
        onSelectChange: function (e) {
            var envelope,
                response,
                output,
                jsonResponse;
            if (parseInt(e.currentTarget.value, 10)) {
                envelope = App.envelopeGenerator((function () {
                    return {
                        "districtId": e.currentTarget.value,
                        "lang": App.retrieveLang()
                    };
                }()), "getBlockList");
                output = App.makeAjaxCall1("POST", App.url, envelope);
                output.success(function (data) {
                    var item;
                    response = App.getJsonObj(data);
                    jsonResponse = $.parseJSON(response.getBlockListReturn);
                    $('#csc-blockId').empty();
                    for (item in jsonResponse.BLOCK) {
                        if (jsonResponse.BLOCK.hasOwnProperty(item)) {
                            $('<option>').val(jsonResponse.BLOCK[item].Id).text(jsonResponse.BLOCK[item].Name).appendTo('#csc-blockId');
                        }
                    }
                    $('#csc-blockId').trigger('change');
                    $.mobile.loading("hide");
					$("body").removeClass('ui-disabled');
                });
                output.error(function (error) {
                    App.displayErrorMsg();
                });
   
            } else {
                $("#csc-blockId").empty();
                alert((function () {
                    return App.lang ? "Please Select a District" : "एक जिला कृपया चुनें";
                }()));
            }
        }

    });
    return SearchCSCView;
});