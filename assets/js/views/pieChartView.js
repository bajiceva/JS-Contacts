var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
Backbone.$ = $;

var PieChartView = Backbone.View.extend({
	initialize: function (options) {
		this.options = options;
		this.listenTo(this.collection, 'change',this.render);
		this.listenTo(this.collection, 'add', this.render);
		this.listenTo(this.collection, 'destroy', this.render);
	},

	render: function () {
		var ctx = document.getElementById(this.options.element).getContext('2d');
		var myChart = new Chart(ctx, {
		    type: 'pie',
		    data: {
			    datasets: [{
			    	backgroundColor: this.options.colors,
			        data: [this.collection.getGenderCount('male'), this.collection.getGenderCount('female')]
			    }],
			    labels: this.options.labels
			}
		});
	}
});

module.exports = PieChartView;