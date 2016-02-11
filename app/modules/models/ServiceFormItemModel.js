/*global define*/
define(['backbone'], function (Backbone) {
    'use strict';
    var ServiceFormItemModel = Backbone.Model.extend({
        defaults : {
            SPDI_ATTRIBUTE_ID : null,
            SPDV_LANG_CODE : '',
            SPDI_ATTRIBUTE_ROW : null,
            SPDI_ATTRIBUTE_WIDTH : null,
            SPDV_FIELD_REQUIRED : '',
            SPDI_ACTIVE : null,
            SPDI_EDITABLE : null,
            SPDI_ATTRIBUTE_CATEGORY_ID : null,
            SPDI_ATTRIBUTE_DATA_TYPE_ID : null,
            SPDI_ATTRIBUTE_DATA_WIDTH : null,
            SPDV_INPUT_TYPE_NAME : '',
            SPDI_FIELDSET_ID : null,
            SPDV_ATTRIBUTE_LABEL : '',
            QUERY : [{DATA_ID : '', DATA_VALUE : ''}]
        }
    });
    return ServiceFormItemModel;
});