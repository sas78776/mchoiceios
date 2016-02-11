/*global define */
/*jslint nomen: true*/
define([
    "jquery",
    "lodash",
    "backbone",
    "handlebars",
    "text!templates/serviceFormItemTemplates/serviceFormInputTemplate.html",
    "text!templates/serviceFormItemTemplates/serviceFormLabelTemplate.html",
    "text!templates/serviceFormItemTemplates/serviceFormTextAreaTemplate.html",
    "text!templates/serviceFormItemTemplates/serviceFormSelectTemplate.html",
    "text!templates/serviceFormItemTemplates/serviceFormDataListTemplate.html",
    "text!templates/serviceFormItemTemplates/serviceFormFileUploadTemplate.html",
    "text!templates/serviceFormItemTemplates/serviceFormFieldsetTemplate.html",
    "app",
    "service.validate"
], function ($, _, Backbone, Handlebars, ServiceFormInputTemplate, ServiceFormLabelTemplate, ServiceFormTextAreaTemplate, ServiceFormSelectTemplate, ServiceFormDataListTemplate, ServiceFormFileUploadTemplate, ServiceFormFieldsetTemplate, App, ServiceValidate) {

    'use strict';
    var ServiceFormItemView = Backbone.View.extend({
        template: null,
        tagName: 'div',
        attributes: function () {
            return {
                id: "div-" + this.model.get('SPDI_ATTRIBUTE_ID')
            };
        },
        events: {
            'click .append-fieldset-data': 'addFieldSetItem',
            'click .delete-fieldset-item': 'deleteFieldSetItem',
            'change .file-upload' : 'disableFileUpload'
        },
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
            this.render();
        },
        render: function (offTypeCollection) {
            var temp,
                div_id,
                temp1;
            if (this.model.get("SPDV_INPUT_TYPE_NAME") === "text" ||
                    this.model.get("SPDV_INPUT_TYPE_NAME") === "number" ||
                    this.model.get("SPDV_INPUT_TYPE_NAME") === "date") {
                this.template = _.template(ServiceFormInputTemplate);
                temp1 = this.model.toJSON();
                if (this.model.get("SPDV_FIELD_REQUIRED") === "required") {
                    div_id = this.model.get("SPDI_ATTRIBUTE_ID") + "_div_Y";
                } else {
                    div_id = this.model.get("SPDI_ATTRIBUTE_ID") + "_div_N";
                }
                temp = {
                    'DIV_ID': div_id
                };
                _.extend(temp1, temp);
                this.$el.html(this.template(temp1)).trigger('create');
            } else if (this.model.get("SPDV_INPUT_TYPE_NAME") === "section lebel") {
                this.template = _.template(ServiceFormLabelTemplate);
                temp1 = this.model.toJSON();
                if (this.model.get("SPDV_FIELD_REQUIRED") === "required") {
                    div_id = this.model.get("SPDI_ATTRIBUTE_ID") + "_div_Y";
                } else {
                    div_id = this.model.get("SPDI_ATTRIBUTE_ID") + "_div_N";
                }
                temp = {
                    'DIV_ID': div_id
                };
                _.extend(temp1, temp);
                this.$el.html(this.template(temp1)).trigger('create');
            } else if (this.model.get("SPDV_INPUT_TYPE_NAME") === "textarea") {
                this.template = _.template(ServiceFormTextAreaTemplate);
                temp1 = this.model.toJSON();
                if (this.model.get("SPDV_FIELD_REQUIRED") === "required") {
                    div_id = this.model.get("SPDI_ATTRIBUTE_ID") + "_div_Y";
                } else {
                    div_id = this.model.get("SPDI_ATTRIBUTE_ID") + "_div_N";
                }
                temp = {
                    'DIV_ID': div_id
                };
                _.extend(temp1, temp);
                this.$el.html(this.template(temp1)).trigger('create');
            } else if (this.model.get("SPDV_INPUT_TYPE_NAME") === "search" ||
                    this.model.get("SPDV_INPUT_TYPE_NAME") === "drop down") {
                this.template = _.template(ServiceFormSelectTemplate);
                if (this.model.get("SPDV_FIELD_REQUIRED") === "required") {
                    div_id = this.model.get("SPDI_ATTRIBUTE_ID") + "_div_Y";
                } else {
                    div_id = this.model.get("SPDI_ATTRIBUTE_ID") + "_div_N";
                }
                temp = {
                    'selectlabel': App.lang ? "Select" : "चयन",
                    'DIV_ID': div_id
                };
                temp1 = this.model.toJSON();
                _.extend(temp1, temp);
                this.$el.html(this.template(temp1)).trigger('create');
            } else if (this.model.get("SPDV_INPUT_TYPE_NAME") === "Data List") {
                this.template = _.template(ServiceFormDataListTemplate);
                if (this.model.get("SPDV_FIELD_REQUIRED") === "required") {
                    div_id = this.model.get("SPDI_ATTRIBUTE_ID") + "_div_Y";
                } else {
                    div_id = this.model.get("SPDI_ATTRIBUTE_ID") + "_div_N";
                }
                temp = {
                    'selectlabel': App.lang ? "Select" : "चयन",
                    'DIV_ID': div_id
                };
                temp1 = this.model.toJSON();
                _.extend(temp1, temp);
                this.$el.html(this.template(temp1));
            } else if (!(this.model.get("SPDV_INPUT_TYPE_NAME"))) {
                this.template = _.template(ServiceFormFileUploadTemplate);
                temp1 = this.model.toJSON();
                if (this.model.get("SPDV_FIELD_REQUIRED") === "required") {
                    div_id = this.model.get("SPDI_ATTRIBUTE_ID") + "_div_Y";
                } else {
                    div_id = this.model.get("SPDI_ATTRIBUTE_ID") + "_div_N";
                }
                temp = {
                    'DIV_ID': div_id,
                    'documentNo': App.lang ? "Document No" : "दस्तावेज़ संख्या",
                    'enclosureType': App.lang ? "Enclosure Type" : "संलग्नक प्रकार",
                    'document': App.lang ? "Document" : "दस्तावेज़",
                    'uploadFile': App.lang ? "Upload File" : "फ़ाइल अपलोड",
                    'upload': App.lang ? "Upload" : "अपलोड",
                    'manualSubmission': App.lang ? "Manual Submission" : "मैनुअल प्रस्तुत",
                    'referenceNumber': App.lang ? "Reference No" : "संदर्भ संख्या"
                };
                _.extend(temp1, temp);
                this.$el.html(this.template(temp1)).trigger('create');
            } else if (this.model.get("SPDV_INPUT_TYPE_NAME") === "fieldset") {
                var that = this,
                    fieldSetOutput,
                    jsonResponse,
                    jsonArray,
                    jsonArray1,
                    item,
                    item1,
                    btnId,
                    fieldSetId,
                    envelope;
                envelope = App.envelopeGenerator({
                    'fieldSetId': this.model.get("SPDI_FIELDSET_ID"),
                    'lang': App.retrieveLang()
                }, "getFieldSetData");
                fieldSetOutput = App.makeAjaxCall1("POST", App.url, envelope);
                App.fieldSetCount += 1;
                fieldSetOutput.success(function (data) {
                    var response = App.getJsonObj(data);
                    if (response) {
                        jsonResponse = $.parseJSON(response.getFieldSetDataReturn);
                        jsonArray = [];
                        jsonArray1 = [];
                        btnId = that.model.get("SPDI_FIELDSET_ID");
                        fieldSetId = that.model.get("SPDI_FIELDSET_ID");
                        if (typeof App.fieldSetItemTitle[fieldSetId] === 'undefined') {
                            App.fieldSetItemTitle[fieldSetId] = [];
                        }
                        for (item in jsonResponse) {
                            jsonArray.push(jsonResponse[item]);
                        }
                        for (item1 in jsonArray[0]) {
                            if (jsonArray[0].hasOwnProperty(item1)) {
                                App.fieldSetItemTitle[fieldSetId].push(jsonArray[0][item1].A_Nm);
                                if (jsonArray[0][item1].Mandatory === "Y" || jsonArray[0][item1].Mandatory === "y") {
                                    jsonArray[0][item1].Mandatory = "required";
                                } else {
                                    jsonArray[0][item1].Mandatory = "";
                                }
                                if (jsonArray[0][item1].SPDV_STATIC_LIST_VALUES) {
                                    if (jsonArray[0][item1].SPDV_STATIC_LIST_VALUES === "LANG" || jsonArray[0][item1].SPDV_STATIC_LIST_VALUES === "NOLANG") {
                                        jsonArray[0][item1].SPDV_STATIC_LIST_VALUES = false;
                                    } else {
                                        var json = [],
                                            to = jsonArray[0][item1].SPDV_STATIC_LIST_VALUES,
                                            toSplit = to.split(","),
                                            i;
                                        for (i = 0; i < toSplit.length; i += 1) {
                                            json.push({
                                                "id": toSplit[i]
                                            });
                                        }
                                        jsonArray[0][item1].SPDV_STATIC_LIST_VALUES = json;
                                    }
                                } else {
                                    jsonArray[0][item1].SPDV_STATIC_LIST_VALUES = false;
                                }
                                jsonArray1.push(jsonArray[0][item1]);
                                var tempString = jsonArray[0][item1].A_Id + "~" + jsonArray[0][item1].A_Nm;
                                btnId = btnId + "_" + tempString;
                            }
                        }
                        that.template = _.template(ServiceFormFieldsetTemplate);
                        temp1 = that.model.toJSON();
                        temp = {
                            itemCollection: jsonArray1,
                            'selectlabel': App.lang ? "Select" : "चयन",
                            'submit': App.lang ? "Add" : "जमा करें",
                            'btnId': btnId
                        };
                        _.extend(temp1, temp);
                        that.$el.html(that.template(temp1)).trigger('create');
                        var validateMethod = "service" + App.currentServiceId;
                        ServiceValidate[validateMethod]();
                    }
                });
                fieldSetOutput.error(function (error) {
                    App.displayErrorMsg();
                });
            }
            return this;
        },

        addFieldSetItem: function (e) {
            var i, j, str1 = "",
                str2 = "",
                divId = "",
                temp = $(e.currentTarget).data('itemid'),
                fieldsetvalue = '',
                fieldsettitles = '',
                str = temp.split('_'),
                fieldSetId = str[0],
                fieldSetValidationMethod = "service" + App.currentServiceId + "FieldSetValidation";
            for (j = 0; j < App.fieldSetItemTitle[fieldSetId].length / 2; j += 1) {
                fieldsettitles = fieldsettitles + "_" + App.fieldSetItemTitle[fieldSetId][j];
            }
            if (ServiceValidate[fieldSetValidationMethod](fieldSetId)) {
                for (i = 1; i < str.length; i += 1) {
                    str1 = str[i].split('~');
                    fieldsetvalue = fieldsetvalue + '_' + this.$('#' + str1[0]).val();
                    str2 = str2 + "<div style='word-wrap:break-word; white-space: normal;'>" + str1[1] + "&nbsp;&nbsp;: " + "</div><div style='word-wrap:break-word; white-space: normal;'>" + this.$('#' + str1[0]).val() + "</div>";
                }
                //            this.$('#fieldSetMasterValues_' + fieldSetId).val(this.$('#fieldSetMasterValues_' + fieldSetId).val() + "#" + fieldsetvalue);
                this.$('#fieldSetMasterValues_' + fieldSetId).prop('title', fieldsettitles);
                divId = fieldSetId + '-' + App.randomId;
                App.updateRandomeId();
                this.$('#fieldsetdatacontainer-' + fieldSetId).append("<div id='" + divId + "' style='padding:10px 5px 5px 5px; box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.50); background: #E88C2D;'><i id='deleteBtn_" + divId + "' class='delete-fieldset-item fa fa-times' style='float:right;' data-itemid='deleteBtn_" + divId + "'></i>" + str2 + "<input type='hidden' data-type='hiddenfieldsetrow' id='abc_" + fieldSetId + "' value='" + fieldsetvalue + "' ></div>");
            }
        },

        deleteFieldSetItem: function (e) {
            var temp = $(e.currentTarget).data('itemid');
            var str = temp.split('_');
            this.$('#' + str[1]).remove();
        },
        disableFileUpload: function (e) {
          var temp = this.model.get('POSITION');
			if($('#manual-select_'+temp).val() === '1')
				document.getElementById(this.model.get('POSITION')).disabled = false;
			else
				document.getElementById(this.model.get('POSITION')).disabled = true;
			}
    });
    return ServiceFormItemView;
});