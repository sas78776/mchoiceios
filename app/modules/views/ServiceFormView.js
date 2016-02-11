/*global define,alert */
/*jslint nomen: true*/

define([
    "jquery",
    "jquery.validate",
    "lodash",
    "backbone",
    "handlebars",
    "modules/views/abstract/BaseView",
    "modules/models/ServiceFormItemModel",
    "modules/views/ServiceFormItemView",
    "text!templates/serviceFormTemplate.html",
    "modules/models/PreviewPageModel",
    "modules/views/PreviewPageItemView",
 "modules/collections/FieldSetPreviewCollection",
 "modules/views/FieldSetPreviewPageView",
    "app",
    "service.validate"
], function ($, jqv, _, Backbone, Handlebars, BaseView, ServiceFormItemModel, ServiceFormItemView, ServiceFormTemplate, PreviewPageModel, PreviewPageItemView, FieldSetPreviewCollection, FieldSetPreviewPageView, App, ServiceValidate) {

    'use strict';
    var ServiceFormView = BaseView.extend({
        flag: false,
        fieldSet: false,
        pageId: 'serviceform',
        previewFlag: false,
        emptymesg: "",
        fieldsetcollection: FieldSetPreviewCollection,
        partialTemplate: ServiceFormTemplate,
        initialize: function () {
            _.bindAll();
            this.emptymesg = App.lang ? "Empty" : "खाली";
            BaseView.prototype.initialize.apply(this, arguments);
            this.listenTo(this, 'addnow', this.addAll);
            this.fetchFormData();
        },
        getHeaderTitle: function () {
            return App.currentServiceName;
        },
        getSpecificTemplateValues: function () {
            return {
                "submit": (function () {
                    return App.lang ? "Submit" : "जमा करें";
                }()),
                "confirmsubmit": App.lang ? "Confirm Submit" : "प्रविष्टि की पुष्टि",
                "edit": App.lang ? "Edit" : "संपादित करें"
            };
        },
        events: function () {
            return _.extend({
                'click #btn-submit-service-data': 'submitServiceForm',
                'click #btn-edit-service-data': 'editServiceForm',
                'click #btn-confirm-submit-service-data': 'confirmsubmitServiceForm'
            }, this.constructor.__super__.events);
        },
        goBackInHistory: function () {
            if (!this.previewFlag) {
                App.Routers.BackboneRouter.back(-1);
            } else {
                this.$('#service-form').show();
                this.$('#preview-data').hide();
                this.previewFlag = false;
            }
        },
        addAll: function () {
            var that = this;
            this.collection.each(function (serviceFormItemModel) {
                var view = new ServiceFormItemView({
                    model: serviceFormItemModel
                });
                that.$('#service-form-field-container').append(view.render().$el).trigger('create');
            });
            $("#service-form").validate({
                focusCleanup: true
            });
            var validateMethod = "service" + App.currentServiceId;
            ServiceValidate.serviceFlag = true;
            ServiceValidate[validateMethod]();

        },
        fetchFormData: function () {
            var envelope,
                serviceFormItemModel,
                response,
                output,
                tempModel,
                that = this,
                jsonResponse;
            this.collection.reset();
            envelope = App.envelopeGenerator({
                "lang": App.retrieveLang(),
                "serviceId": App.currentServiceId
            }, "getAllAttributesOfService");
            output = App.makeAjaxCall1("POST", App.url, envelope);
            output.success(function (data) {
                response = App.getJsonObj(data);
                jsonResponse = $.parseJSON(response.getAllAttributesOfServiceReturn);
               // console.log(jsonResponse);
                _.each(jsonResponse.ATTRIBUTES, function (item) {
                    if (item.SPDV_FIELD_REQUIRED === "Y" || item.SPDV_FIELD_REQUIRED === "y") {
                        item.SPDV_FIELD_REQUIRED = "required";
                    } else {
                        item.SPDV_FIELD_REQUIRED = "";
                    }
                    if (item.SPDV_STATIC_LIST_VALUES) {
                        if (item.SPDV_STATIC_LIST_VALUES === "LANG" || item.SPDV_STATIC_LIST_VALUES === "NOLANG" || item.SPDV_STATIC_LIST_VALUES === "{null}" || item.SPDV_STATIC_LIST_VALUES === "lang") {
                            item.SPDV_STATIC_LIST_VALUES = false;
                        } else {
                            var json = [],
                                to = item.SPDV_STATIC_LIST_VALUES,
                                toSplit = to.split(","),
                                i;
                            for (i = 0; i < toSplit.length; i += 1) {
                                json.push({
                                    "id": toSplit[i]
                                });
                            }
                            item.SPDV_STATIC_LIST_VALUES = json;
                        }
                    } else {
                        item.SPDV_STATIC_LIST_VALUES = false;
                    }
                    item.POSITION = parseInt(item.SPDI_ATTRIBUTE_ROW + item.SPDI_ATTRIBUTE_COL, 10);
                    that.collection.add(item);
                });
                that.collection.sort();
                that.trigger('addnow');
                $.mobile.loading("hide");
                $("body").removeClass('ui-disabled');
            });
            output.error(function () {
                alert((function () {
                    return App.lang ? "Data not available" : "डेटा उपलब्ध नहीं है";
                }()));
                $.mobile.loading("hide");
                $("body").removeClass('ui-disabled');
            });

        },
        submitServiceForm: function () {
            var validateCheckMethod = 'service' + App.currentServiceId + 'CheckValidation';
            if ($("#service-form").valid()) {
                //         if (this.flag) {
                if (App.currentServiceId === 3 || App.currentServiceId === 4 || App.currentServiceId === 5 || App.currentServiceId === 7 || App.currentServiceId === 16 || App.currentServiceId === 18 || App.currentServiceId === 22 || App.currentServiceId === 23 || App.currentServiceId === 25 || App.currentServiceId === 29 || App.currentServiceId === 35) {
                    $('#service-form *').each(function (i) {
                        if ($(this).data('type') === "hiddenfieldsetfield") {
                            $(this).val("");
                        }

                    });
                    var fieldSetObj = {},

                        formObj = {};
                    $('#service-form *').each(function (i) {
                        if (this.tagName === "SELECT" || this.tagName === "INPUT" || this.tagName === "TEXTAREA") {
                            if ($(this).data('type') === "fieldsetfield") {

                            } else if ($(this).data('type') === "hiddenfieldsetrow") {
                                var fieldsetid = ($(this).attr('id')).split("_")[1],
                                    fieldsetvalue = $(this).val();
                                $('#fieldSetMasterValues_' + fieldsetid).val($('#fieldSetMasterValues_' + fieldsetid).val() + "#" + fieldsetvalue);
                            } else if ($(this).data('type') === "hiddenfieldsetfield") {
                                var temp1 = {
                                    "heading": this.title,
                                    "values": this.value,
                                    "fieldSetId": (this.name).split("_")[1],
                                    "fieldSetHeading": (this.name).split("_")[2]
                                };
                                fieldSetObj[i] = temp1;
                            } else {
                                var temp = {
                                    "name": this.name,
                                    "value": this.value
                                };
                                formObj[i] = temp;
                            }
                        }
                    });
                    this.flag = ServiceValidate[validateCheckMethod]();
                    if (this.flag) {
                        App.formItems = formObj;
                        App.fieldSetObj = fieldSetObj;
                        this.fieldSet = true;
                        this.showFieldSetPreviewPageView();
                    } else {
                        alert((function () {
                            return App.lang ? "Please correct errors" : "त्रुटियों को ठीक करें";
                        }()));
                    }

                } else {
                    this.flag = ServiceValidate[validateCheckMethod]();
                    if (this.flag) {
                        var formItems = $('#service-form').serializeArray();
                        App.formItems = formItems;
                        this.showPreviewPageView();
                    } else {
                        alert((function () {
                            return App.lang ? "Please correct errors" : "त्रुटियों को ठीक करें";
                        }()));
                    }
                }
            } else {
                alert((function () {
                    return App.lang ? "Please fill all mandatory fields" : "सभी अनिवार्य क्षेत्रों भरें";
                }()));
            }
        },
        showPreviewPageView: function () {
            var that, x, model, view;
            this.$('#preview-data-list').empty();
            this.$('#preview-data-list').html();
            that = this;
            _.each(App.formItems, function (obj) {
                x = obj.name;
                model = new PreviewPageModel();
                model.set('name', x.split("~")[0]);
                if (obj.value === "") {
                    model.set('value', "(" + that.emptymesg + ")");
                } else {
                    model.set('value', obj.value);
                }
                view = new PreviewPageItemView({
                    model: model
                });
                that.$('#preview-data-list').append(view.render().$el).listview().listview('refresh').trigger('create');
            });
            this.$('#service-form').hide();
            this.$('#preview-data').show();
            this.previewFlag = true;
        },
        editServiceForm: function () {
            this.$('#service-form').show();
            this.$('#preview-data').hide();
            this.previewFlag = false;
        },
        confirmsubmitServiceForm: function () {
            if (this.fieldSet === false) {
                App.formDataXmlGenerator(JSON.parse(JSON.stringify($('#service-form').serializeArray())));
                App.Routers.BackboneRouter.navigate('#fileupload', {
                    trigger: true,
                    replace: false
                });
            } else {
                App.formDataXmlGenerator1(App.formItems);
                App.fieldSetXmlGenerator(App.fieldSetObj);
                App.Routers.BackboneRouter.navigate('#fileupload', {
                    trigger: true,
                    replace: false
                });
            }
        },
        showFieldSetPreviewPageView: function () {
            var that, x, model, view, temp1, temp2, temp3, count = 0,
                prev, i, j;
            this.$('#preview-data-list').empty();
            this.$('#preview-data-list').html();
            that = this;

            _.each(App.fieldSetObj, function (obj, value) {
                temp1 = obj.heading.split("_");
                temp2 = obj.values.split("#");
                var heading = obj.fieldSetHeading;
                var headingflag = true;
                for (i = 1; i < temp2.length; i += 1) {
                    var temp3 = temp2[i].split("_");
                    for (j = 1; j < temp3.length; j++) {
                        model = new PreviewPageModel();
                        model.set('name', temp1[j]);
                        if (obj.value === "") {
                            model.set('value', "(" + that.emptymesg + ")");
                        } else {
                            model.set('value', temp3[j]);
                        }
                        that.fieldsetcollection.add(model);
                    }
                    var popup = new FieldSetPreviewPageView();

                    if (headingflag === true) {
                        headingflag = false;
                        that.$('#preview-data-list').append(popup.$el);
                        popup.render({
                            fieldsetcollection: that.fieldsetcollection.toJSON(),
                            heading: heading,
                            fieldid: (obj.fieldSetId * 1000) + (j * 10) + i
                        });
                        that.fieldsetcollection.reset();
                    } else {
                        heading = "";
                        that.$('#' + prev).append(popup.$el);
                        popup.render({
                            fieldsetcollection: that.fieldsetcollection.toJSON(),
                            heading: heading,
                            fieldid: (obj.fieldSetId * 1000) + (j * 10) + i
                        });
                        that.fieldsetcollection.reset();
                    }
                    prev = (obj.fieldSetId * 1000) + (j * 10) + i;
                }
                count = count + 1;
            });

            _.each(App.formItems, function (obj) {
                x = obj.name;
                model = new PreviewPageModel();
                model.set('name', x.split("~")[0]);
                if (obj.value === "") {
                    model.set('value', "(" + that.emptymesg + ")");
                } else {
                    model.set('value', obj.value);
                }
                view = new PreviewPageItemView({
                    model: model
                });
                that.$('#preview-data-list').append(view.render().$el).listview().listview('refresh').trigger('create');
            });
            this.$('#service-form').hide();
            this.$('#preview-data').show();
            this.previewFlag = true;
        }

    });
    _.extend(ServiceFormView, Backbone.Events);
    return ServiceFormView;
});