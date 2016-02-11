/*global define */
/*jslint nomen: true*/

define([
    'lodash',
    'backbone',
    'modules/models/OfficeTypeModel'
], function (_, Backbone, OfficeTypeModel) {
    'use strict';
	var OfficeTypeCollection = Backbone.Collection.extend({
		model: OfficeTypeModel,
		initialize: function () {
		}
	});

	return new OfficeTypeCollection();
});