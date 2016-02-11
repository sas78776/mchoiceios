/*global define*/
define(['backbone'], function (Backbone) {
    'use strict';
    var OfficeTypeModel = Backbone.Model.extend({
        defaults : {
            officeTypeId : 0,
            officeTypeName: 'no name'
        }
    });
    return OfficeTypeModel;
});