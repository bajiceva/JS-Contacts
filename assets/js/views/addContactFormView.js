var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
Backbone.$ = $;


var AddContactForm = Backbone.View.extend({
	el: '[data-add-form]',

	events: {
		'submit': 'submit'
	},

	initialize: function () {
		this.$el.show();
		this.listenTo(this.collection, 'invalid', this.showAlert);
	},

	showAlert: function (model, error) {
		console.log('error');
		alert(error);
	},

	submit: function (e) {
		e.preventDefault();
		console.log('saving');
		this.collection.add({
			firstName: this.$('[name="firstName"]').val(),
			lastName: this.$('[name="lastName"]').val(),
			phoneNumber: this.$('[name="phoneNumber"]').val(),
			address: this.$('[name="address"]').val(),
			gender: this.$('[name="gender"]:checked').val(),
			years: this.$('[name="years"]').val()
		}, { validate:true });

		this.$('[name="firstName"]').val('');
		this.$('[name="lastName"]').val('');
		this.$('[name="phoneNumber"]').val('');
		this.$('[name="address"]').val('');
		this.$('[name="gender"]').val('male');
		this.$('[name="years"]').val('');
		console.log('added');
	},

	hide: function () {
		this.$el.hide();
	}
});

module.exports = AddContactForm;