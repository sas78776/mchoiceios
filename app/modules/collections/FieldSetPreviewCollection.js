/*global define */
/*jslint nomen: true*/

define([
    'lodash',
    'backbone',
], function (_, Backbone) {
    'use strict';
	var FieldSetPreviewCollection = Backbone.Collection.extend({
		initialize: function () {
		}
	});

	return new FieldSetPreviewCollection();
});