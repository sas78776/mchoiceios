/*global define */
/*jslint nomen: true*/

define([
    'lodash',
    'backbone',
    'modules/models/DistrictModel'
], function (_, Backbone, DistrictModel) {
    'use strict';
	var DistrictCollectionHi = Backbone.Collection.extend({
		model: DistrictModel,
		initialize: function () {
		}
	});

	return new DistrictCollectionHi();
});