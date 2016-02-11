/*global define */
/*jslint nomen: true*/

define([
    'lodash',
    'backbone',
    'modules/models/CSCOperatorModel'
], function (_, Backbone, CSCOperatorModel) {
    'use strict';
	var CSCOperatorCollection = Backbone.Collection.extend({
		model: CSCOperatorModel,
		initialize: function () {
		}
	});

	return new CSCOperatorCollection();
});