var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
Backbone.$ = $;

var ContactDetailView = require('./views/contactDetailView');
var AddContactForm = require('./views/addContactFormView');

var Router = Backbone.Router.extend({
	routes: {
		'contact/:contactId': 'showContact',
		'add': 'showAddForm'
	},

	initialize: function (options) {
		this.contactsCollection = options.contactsCollection;
	},

	showContact: function (contactId) {
		var chosen = this.contactsCollection.get(contactId);

		this.detailView = new ContactDetailView({ model: chosen });
		$('[data-contact-detail]').html(this.detailView.render().el);
		
		this.addContactFormView && this.addContactFormView.hide();
	},


	showAddForm: function () {
		this.detailView && this.detailView.hide();

		this.addContactFormView = new AddContactForm({
			collection: this.contactsCollection
		});
	}
});

module.exports = Router;
