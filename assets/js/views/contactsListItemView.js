var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
Backbone.$ = $;

var ContactsListItem = Backbone.View.extend({
	tagName: 'li',

	events: {
		'click': 'openContactDetails'
	},

	render: function () {
		this.$el.html(this.model.getFullName());
		return this;
	},

	openContactDetails: function (e) {
		e.preventDefault();

		window.router.navigate('#contact/' + this.model.cid, { trigger: true });
	},
});

module.exports = ContactsListItem;