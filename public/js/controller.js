'use strict';

var controller = {

	filterByIngredients: function(input) {
	    var data = {input: input};
	    model.filterByIngredients(data);
	},

	getIngredients: function(selection){	
    	var data = {selection: selection};
    	model.getIngredients(data);
    },

	removeIngredients: function(selection){
		view.removeIngredients(selection);
        model.deleteSelections(selection);
	},

    init: function() {
        model.init();
        view.init();
    }
};

controller.init();