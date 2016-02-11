/*global define*/
define(['backbone'], function (Backbone) {
    'use strict';
    var ServiceListModel = Backbone.Model.extend({
        defaults : {
            serviceId : 0,
            serviceName : '',
            icon_location : ''
        }
    });
    return ServiceListModel;
});