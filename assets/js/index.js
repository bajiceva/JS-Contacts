var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Chart = require('chart.js');
Backbone.$ = $;

var AddressBookCollection = require('./collections/contacts');
var ContactsListView = require('./views/contactsListView');
var PieChartView = require('./views/pieChartView');
var SearchContactsView = require('./views/searchContactsView');
var SortCollectionView = require('./views/sortCollection');
var Router = require('./router');
var fakeData = require('./fakeData.json');

var contactsCollection = new AddressBookCollection(fakeData);

new ContactsListView({
	collection: contactsCollection
}).render();

new SortCollectionView({
	collection: contactsCollection
});

new SearchContactsView({
	collection: contactsCollection
});

new PieChartView({
	collection: contactsCollection,
	element: 'chart',
	colors: ["#3e95cd", "#ff69b4"],
	labels: ['Male', 'Female']
}).render();

window.router = new Router({
	contactsCollection: contactsCollection
});
Backbone.history.start();