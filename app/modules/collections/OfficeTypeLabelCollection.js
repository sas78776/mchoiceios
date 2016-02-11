/*global define */
/*jslint nomen: true*/

define([
    'lodash',
    'backbone',
    'modules/models/OfficeTypeLabelModel'
], function (_, Backbone, OfficeTypeLabelModel) {
    'use strict';
	var OfficeTypeLabelCollection = Backbone.Collection.extend({
		model: OfficeTypeLabelModel,
		comparator : 'labelId',
		initialize: function () {
			
		}
	});

	return new OfficeTypeLabelCollection();
});