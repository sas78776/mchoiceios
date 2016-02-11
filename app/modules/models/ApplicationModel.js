/*global define*/
define(['backbone'], function (Backbone) {
    'use strict';
    var ApplicationModel = Backbone.Model.extend({
        defaults : {
            appId : 123456789,
            serviceName: 'Income Certificate',
            appDate : '',
            actionDate :'',
            status : 'Approved',
            remarks : '',
            action : 'Initiated'
        }
    });
    return ApplicationModel;
});