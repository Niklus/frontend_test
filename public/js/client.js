'use strict';

var model = {

	makeRequest: function(type,url,data,callback){
		$.ajax({            
		    type: type,   
		    url: url,
		    data: data,
		    success: function (res){  
	           callback(res);
	           console.log(res);
		    }
        });
	},

	filterByIngredients: function(data) {

		var url = '/filtered_recipes';   
        this.makeRequest('POST',url,data,view.updateView)
	},

	getIngredients: function(data) {
    	
	    var url = '/selections';
	    this.makeRequest('POST',url,data,view.addIngredients);
	},

	getRecipes: function() {
		
       var url = '/all_recipes';
       this.makeRequest('GET',url,undefined,view.updateView);
	}

};

var controller = {

	filterByIngredients: function(input) {
	    var data = {input: input};
	    model.filterByIngredients(data);
	},

	getIngredients: function(selection){
    	
    	var data = {selection: selection};
    	model.getIngredients(data);
    },

    getRecipes: function(){
		model.getRecipes();
	},

	removeIngredients: function(selection){
		view.removeIngredients(selection);
	},
};


var view = {

	updateView: function(data){    
    
	    var $list = $('#list').html('');
	    $('#ingredients').html('');

	    data.forEach(function(obj){  

	        var $container = $('<div>'); 
		   
		    $container.append($('<p>').text(obj.name+': '+obj.type+', '+obj.cook_time+' min'));
		   
		    var $div1 = $('<div>').attr('class','picDiv');
		    var $div2 = $('<div>').attr('class','listDiv');

	        $div1.append($('<input>').attr({
		    	type: 'checkbox',
		    	value: obj.name,
		    	class: 'check'
		    }));

		    $div1.append($('<img>').attr('src','/img/'+obj.name+'.jpg'));
		    
		    $div2.append($('<ol>').attr('id',obj.name));
		    
		    $container.append($div1);
		    $container.append($div2);
            $list.append($container);

		}); 

		if(!$list.text()){
		  $list.append($('<p>').text('Sorry Try Again')); 
		}
	},

	addIngredients: function(data) {
        

        var $select = $('#'+data.name);
		
	    data.ingredients.forEach(function(item){
          
          var $newList = $('<li>').attr('class',data.name);
          $newList.text(item);
		  $select.append($newList); 
	    }); 
	},

	removeIngredients: function(selector){
	    $('.'+selector).remove();
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
        
        $('#search').on('click',function(event) {
            
            var input = $input.val();

        	if(input){            
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











