/*global define */
/*jslint nomen: true*/

define([
    'lodash',
    'backbone',
    'modules/models/ApplicationModel'
], function (_, Backbone, ApplicationModel) {
    'use strict';
	var ApplicationCollection = Backbone.Collection.extend({
		model: ApplicationModel,
		initialize: function () {
		}
	});

	return new ApplicationCollection();
});