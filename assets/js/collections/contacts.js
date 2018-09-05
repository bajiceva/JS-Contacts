var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
Backbone.$ = $;

var ContactsListItemModel = require('../models/contact');

var AddressBookCollection = Backbone.Collection.extend({
	model: ContactsListItemModel,

    strategies: {
        firstName: function (person) { return person.get("firstName"); }, 
        lastName: function (person) { return person.get("lastName"); },
        years: function (person) { return person.get("years"); }
    },

    changeSort: function (sortProperty) {
        this.comparator = this.strategies[sortProperty];
        this.sort();
    },

    getGenderCount: function (gender) {
    	return this.filter(function (model) {
    		return model.get('gender') === gender;
    	}).length;
    },

    search: function (value) {
    	this.trigger('filter', new AddressBookCollection(this.filter(function (model) {
    		return model.getFullName().toLowerCase().indexOf(value.toLowerCase()) !== -1;
    	})));
    }
});

module.exports = AddressBookCollection;