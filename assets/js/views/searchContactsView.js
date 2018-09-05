var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
Backbone.$ = $;

var SearchContactsView = Backbone.View.extend({
	el: '[data-search-contacts]',

	events: {
		'keyup': 'search'
	},

	search: function (e) {
		var value = $(e.currentTarget).val();
		this.collection.search(value);
	},
});

module.exports = SearchContactsView;