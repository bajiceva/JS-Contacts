var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
Backbone.$ = $;

var ContactsListItemModel = Backbone.Model.extend({

	getFullName: function () {
		return this.get('firstName') + ' ' + this.get('lastName');
	},

	validate: function (attrs) {
		console.log('validating...');
		if (!attrs.firstName) {
			console.log('invalid first name');
			return 'Person must have a first name!';
		}

		if (!attrs.lastName) {
			console.log('invalid last name');
			return 'Person must have a last name!';
		}

		if (!attrs.phoneNumber || !attrs.phoneNumber.match(/^\d+$/)) {
			console.log('invalid number');
			return 'Person must have a valid phone number!';
		}
	}
});

module.exports = ContactsListItemModel;