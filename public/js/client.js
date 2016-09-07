'use strict';

var model = {

	postRequest: function(url,data,callback) {
    	$.ajax({            
		    type: 'POST',   
		    url: url,
		    data: data,
		    success: function (res){  
	           callback(res);
		    }
        });
	},

	getRequest: function(url,callback) {
		$.ajax({            
		    type: 'GET',   
		    url: url,
		    success: function (res){  
	           callback(res);
		    }
        });
	}

};

var controller = {

	filterByIngredients: function(input) {
	    var data = {input: input};
	    model.postRequest('/', data, view.updateView);
	},

	getIngredients: function(selection){
    	var data = {selection: selection};
    	model.postRequest('/selections', data, view.updateIngredients);
    },

    refresh: function(){
		model.getRequest('/recipes',view.updateView);
	}
};


var view = {

	updateView: function(data){    
    
	    var $list = $('#list').html('');
	    $('#ingredients').html('');

	    data.forEach(function(obj){      
		    $list.append($('<li>').text(obj.name+': '+obj.type+', '+obj.cook_time+' min')); 
	        $list.append($('<img>').attr('src','/img/'+obj.name+'.jpg'));
	        $list.append($('<input>').attr({
		    	type: 'checkbox',
		    	value: obj.name,
		    	name: 'recipeCheckbox'
		    }));
		}); 

		if(!$list.text()){
		  $list.append($('<li>').text('Sorry Try Again')); 
		}
	},

	updateIngredients: function(data) {

		var $ingredients = $('#ingredients').html('');
	   
	    data.forEach(function(item){      
		    $ingredients.append($('<li>').text(item)); 
		}); 
	},

	setUpEventListeners: function(){

		var $input = $('#filter');   
		
		$input.on('keypress', function (event) { 
			var input = $input.val();      
			if(event.keyCode === 13 && input){            
		  		controller.filterByIngredients(input); 
		  		$input.val('');
			}
		});

		$('#refresh').on('click', function (event) {           	  
			controller.refresh();
		});

		$('#submitBtn').on('click', function(event){
		    	
			var selection = [];

		    $("input[name='recipeCheckbox']:checked").each(function(){ 
		    	selection.push($(this).val());
		    });
		    
		    controller.getIngredients(selection);
		});
	}
};

view.setUpEventListeners();













