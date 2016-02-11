/*global define*/

define(['backbone'], function (Backbone) {
    'use strict';
    var PreviewPageModel = Backbone.Model.extend({
        defaults: {
            name: "",
            value: ""
        }
    });
    return PreviewPageModel;
});