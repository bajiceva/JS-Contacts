var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
Backbone.$ = $;

var SortCollectionView = Backbone.View.extend({
	el: '[data-sort-collection]',

	events: {
		'change': 'sortCollection'
	},

	sortCollection: function (e) {
		var value = $(e.currentTarget).val();	
		this.collection.changeSort(value);
	},
});

module.exports = SortCollectionView;