var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
Backbone.$ = $;

var ContactListItem = require('./contactsListItemView');

var ContactsList = Backbone.View.extend({
	el: '[data-contacts-list]',

	initialize: function () {
		this.listenTo(this.collection, 'sort', this.render);
		this.listenTo(this.collection, 'add', this.addOne);
		this.listenTo(this.collection, 'destroy', this.render);
		this.listenTo(this.collection, 'change', this.render);
		this.listenTo(this.collection, 'filter', this.showFiltered);
	},

	render: function (collection) {
		this.$el.empty();

		this.collection.each(function (model) {
			this.addOne(model);
		}, this);
	},

	showFiltered: function (collection) {
		this.$el.empty();

		collection.each(function (model) {
			this.addOne(model);
		}, this);
	},

	addOne: function (model) {
		this.$el.append(new ContactListItem({ model: model }).render().$el);
	},

});

module.exports = ContactsList;