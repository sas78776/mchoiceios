/*global define*/
define(['backbone'], function (Backbone) {
    'use strict';
    var CSCOperatorModel = Backbone.Model.extend({
        defaults : {
            Name : 0,
            MobileNo : 'no name',
            Address : '',
            EmailID : ''
        }
    });
    return CSCOperatorModel;
});