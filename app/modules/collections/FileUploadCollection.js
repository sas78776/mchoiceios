/*global define */
/*jslint nomen: true*/

define([
    'lodash',
    'backbone',
    'localstorage',
    'modules/models/FileUploadPageModel'
], function (_, Backbone, Store, FileUploadModel) {
    'use strict';
	var FileUploadCollection = Backbone.Collection.extend({

		model: FileUploadModel,
		initialize: function () {
			
		}
	});

	return new FileUploadCollection();
});