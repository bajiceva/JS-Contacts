var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
Backbone.$ = $;

var ContactDetail = Backbone.View.extend({
	tagName: 'tbody',

	template: _.template($('#detailTemplate').html()),

	events: {
		'click .delete' : 'destroy',
		'click .edit' : 'edit',
		'click .saveChanges' : 'saveChanges',
		'click .cancel' : 'cancel'
	},

	labels: {
		'firstName': 'First name',
		'lastName': 'Last name',
		'phoneNumber': 'Phone number',
		'address': 'Address',
		'gender': 'Gender',
		'years': 'Years'
	},

	initialize: function () {
		this.listenTo(this.model, 'destroy', this.remove);
		this.listenTo(this.model, 'invalid', this.showAlert);
	},

	render: function () {
		this.$el.append(this.template({ labels: this.labels, fields: this.model.toJSON() }));
		//$(".contact-details-form").show();

		return this;
	},

	hide: function () {
		this.$el.hide();
	},

	showAlert: function (model, error) {
		alert(error);
	},

	destroy: function () {
		var response = confirm ("Delete " + this.model.get('firstName') + "?");
		if (response == true){
			this.model.destroy();
		} else {
			return;	
		}
	},

	remove: function () {
		this.$el.remove();
	},

	edit: function () {
		this.$('.value').hide();
		this.$('.editable').show();
		this.$(".controlButtons").hide();
		this.$(".editButtons").show();
	},

	saveChanges: function () {
		var success = this.model.set({
			firstName: this.$('[name="firstName"]').val(),
			lastName: this.$('[name="lastName"]').val(),
			phoneNumber: this.$('[name="phoneNumber"]').val(),
			address: this.$('[name="address"]').val(),
			gender: this.$('[name="gender"]:checked').val(),
			years: this.$('[name="years"]').val()
		}, { validate: true });

		if (success) {
			this.$('.value').show();
			this.$('.editable').hide();
			this.$(".controlButtons").show();
			this.$(".editButtons").hide();
			this.$el.empty();
			this.render();
		}
	},

	cancel: function () {
		this.$el.empty();
		this.render();
	},

});

module.exports = ContactDetail;