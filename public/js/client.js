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
	    model.postRequest('/filtered_recipes', data, view.updateView);
	},

	getIngredients: function(selection){
    	var data = {selection: selection};
    	model.postRequest('/selections', data, view.addIngredients);
    },

    getRecipes: function(){
		model.getRequest('/all_recipes',view.updateView);
	},

	removeIngredients: function(selection){
		var selection = '.'+selection;
		view.removeIngredients(selection);
	},
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
		    	value: obj.name
		    }));
		}); 

		if(!$list.text()){
		  $list.append($('<li>').text('Sorry Try Again')); 
		}
	},

	addIngredients: function(data) {

		var $ingredients = $('#ingredients');
	    data.ingredients.forEach(function(item){
          
          var $newList = $('<li>').attr('class',data.name);
          $newList.text(item);

		  $ingredients.append($newList); 

	    }); 
	},

	removeIngredients: function(selection){
	    $(selection).remove();
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
			controller.getRecipes();
		});

        $("#list").on('change',function(event){
	      
	      	var selection = event.target.value;
			
			if(event.target.checked){

				controller.getIngredients(selection);
			  
			}else{
				controller.removeIngredients(selection);          
			}
	    });
	}
};

view.setUpEventListeners();

controller.getRecipes();











