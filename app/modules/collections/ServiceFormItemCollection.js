/*global define */
/*jslint nomen: true*/

define([
    'lodash',
    'backbone',
    'localstorage',
    'modules/models/ServiceFormItemModel'
], function (_, Backbone, Store, ServiceFormItemModel) {
    'use strict';
	var ServiceFormItemCollection = Backbone.Collection.extend({

		model: ServiceFormItemModel,
        comparator : "POSITION",
		initialize: function () {
			
		}
	});

	return new ServiceFormItemCollection();
});