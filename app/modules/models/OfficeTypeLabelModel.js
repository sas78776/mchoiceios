/*global define*/
define(['backbone'], function (Backbone) {
	'use strict';
	var OfficeTypeLabelModel = Backbone.Model.extend({
		defaults : {
			labelId : 0,
			labelName : 'no name'
		}
	});
	return OfficeTypeLabelModel;
});