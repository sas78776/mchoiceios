/*global define*/
define(['backbone'], function (Backbone) {
    'use strict';
    var FileUloadModel = Backbone.Model.extend({
        defaults : {
            ENC_NAME : 'no name',
            ENC_ID : 0,
            MANDATORY : 0
        }
    });
    return FileUloadModel;
});