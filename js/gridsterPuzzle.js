(function(f) {
	f(window, window.jQuery);
}(function(window, $) {
	var gridsterPuzzle;
	
	var options = {
		background_width: 1000,
		background_height: 800,
		cols: 5,
		rows: 4, 
		size_x: 1,
		size_y: 1,
		widget_margin_x: 0,
		widget_margin_y: 0
	};	


	$(document).ready(function() {
		gridsterPuzzle = new GridsterPuzzle(options);
		gridsterPuzzle.init();
	});


	function GridsterPuzzle(options) {
		this.options = options;
		this.gridster = $(".gridster > ul").gridster({
			widget_margins: [this.options.widget_margin_x, this.options.widget_margin_y],
			widget_base_dimensions: [(this.options.background_width / this.options.cols), (this.options.background_height / this.options.rows)],
			min_cols: this.options.cols,
			max_cols: this.options.cols,
			min_rows: this.options.rows,
			draggable: {
				start: this.moveWidget
			},
		}).data('gridster');
	}


	GridsterPuzzle.prototype = {
	    constructor: GridsterPuzzle,
	
	    init: function() {
			var widgets = this.generateWidgets();
			this.shuffle(widgets);			
			this.addWidgets(widgets);
		},

		generateWidgets: function() {
			var widgets = [];
			
			for (var i = 0; i < this.options.rows; i++) {
				for (var j = 0; j < this.options.cols; j++) {
					var posX = (this.options.cols - j) * (this.options.background_width / this.options.cols);
					var posY = (this.options.rows - i) * (this.options.background_height / this.options.rows);
					var widget = $('<li></li>').css('background-position', posX + 'px ' + posY + 'px');
					widgets.push([widget, this.options.size_x, this.options.size_y]);
				}
			}
			
			return widgets;
		},
		
		addWidgets: function(widgets) {
			var self = this;
			$.each(widgets, function(i, widget){
				self.gridster.add_widget.apply(self.gridster, widget);
			});
		},
		
		moveWidget: function(even, obj, $widget) {
			var wgd = $widget.coords().grid;

			var new_grid_data = {
				col: new_col,
				row: new_row,
				size_x: wgd.size_x,
				size_y: wgd.size_y
			};

			this.gridster.mutate_widget_in_gridmap($widget, wgd, new_grid_data);
		},

		/*
		 * Shuffel an array.
		 * Borrowed from https://github.com/coolaj86/knuth-shuffle
		 */
		shuffle: function(array) {
			var currentIndex = array.length, 
				temporaryValue,
				randomIndex;

			while (0 !== currentIndex) {
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;

				temporaryValue = array[currentIndex];
				array[currentIndex] = array[randomIndex];
				array[randomIndex] = temporaryValue;
			}

			return array;
		}
	};
}));