/*global define */
/*jslint nomen: true*/

define([
    'lodash',
    'backbone',
    'modules/models/DistrictModel'
], function (_, Backbone, DistrictModel) {
    'use strict';
	var DistrictCollection = Backbone.Collection.extend({
		model: DistrictModel,
		initialize: function () {
		}
	});

	return new DistrictCollection();
});