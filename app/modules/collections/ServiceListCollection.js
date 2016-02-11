/*global define */
/*jslint nomen: true*/

define([
    'lodash',
    'backbone',
    'localstorage',
    'modules/models/ServiceListModel'
], function (_, Backbone, Store, ServiceListModel) {
    'use strict';
	var ServiceListCollection = Backbone.Collection.extend({

		model: ServiceListModel,
		initialize: function () {
			
		}
	});

	return new ServiceListCollection();
});