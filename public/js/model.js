'use strict';

var model = {
	
	init: function(){

		if (!localStorage.selections) {
            localStorage.selections = JSON.stringify([]);
        }

        this.getRecipes();
	},

	getJson: function(type,url,data){
		$.ajax({            
		    type: type,   
		    url: url,
		    data: data,
		    success: function (res){    
               view.render(res)
		    }
        });
	},

	filterByIngredients: function(data) {

		var url = '/filtered_recipes';   
        this.getJson('POST',url,data)
	},

    getRecipes: function() {
		
   		var url = '/all_recipes';
        this.getJson('GET',url);
	},

	getIngredients: function(data) {
    	
	    var url = '/selections';
	 
        $.ajax({            
		    type: 'POST',   
		    url: url,
		    data: data,
		    success: function (res){    
               view.addIngredients(res);
               model.storeSelection(res);
		    }
        });
	},

	storeSelection: function(obj){

        var data = JSON.parse(localStorage.selections);
        data.push(obj.name);
        localStorage.selections = JSON.stringify(data);
    },

	deleteSelections: function(name){

		var data = JSON.parse(localStorage.selections);

        var filtered = data.filter(function(value) {
           return value != name;
        });

		localStorage.selections = JSON.stringify(filtered);
	},

    getData: function() {
        return JSON.parse(localStorage.selections);
    }
};