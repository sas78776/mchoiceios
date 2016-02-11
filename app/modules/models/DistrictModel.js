/*global define*/
define(['backbone'], function (Backbone) {
    'use strict';
    var DistrictModel = Backbone.Model.extend({
        defaults : {
            distId : 0,
            distName: 'no name'
        }
    });
    return DistrictModel;
});