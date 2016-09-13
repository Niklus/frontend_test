'use strict';

var model = {

	updateView: function(type,url,data){
		$.ajax({            
		    type: type,   
		    url: url,
		    data: data,
		    success: function (res){    
               view.updateView(res)
		    }
        });
	},

	filterByIngredients: function(data) {

		var url = '/filtered_recipes';   
        this.updateView('POST',url,data)
	},

    getRecipes: function() {
		
   		var url = '/all_recipes';
        this.updateView('GET',url);
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

        var data = JSON.parse(localStorage.selection);

        data.push(obj.name);

        localStorage.selection = JSON.stringify(data);
    },

	deleteSelections: function(name){

		var data = JSON.parse(localStorage.selection);

		function notName(value) {
           return value != name;
        }
        
        var filtered = data.filter(notName);

		localStorage.selection = JSON.stringify(filtered);
	},

    getData: function() {
        return JSON.parse(localStorage.selection);
    },

	clearSelections: function() {
        localStorage.clear();
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
        model.deleteSelections(selection);
	},

	clearSelections: function(){
		model.clearSelections();
	},

    initStorage: function() {
        if (!localStorage.selections) {
            localStorage.selection = JSON.stringify([]);
        }
    }
};


var view = {

	updateView: function(data){    
    
	    var $list = $('#list').html('');
	    $('#ingredients').html('');

	    data.forEach(function(obj){  

	        var $container = $('<div>').attr('class','recipes col-md-6 col-sm-6 col-xs-12'); 	   
		    var $div1 = $('<div>').attr('class','picDiv');
		    var $div2 = $('<div>').attr('class','listDiv');
		    var $div3 = $('<div>').attr('class','detailsDiv');

	        $div1.append($('<input>').attr({
		    	type: 'checkbox',
		    	value: obj.name,
		    	class: 'check'
		    }));

		    $div1.append($('<img class="img-rounded">').attr('src','/img/'+obj.name+'.jpg'));

            $div3.append($('<p>').text(obj.name+'..'));
            $div3.append($('<p>').text(obj.type+'..'));
            $div3.append($('<p>').text(obj.cook_time+' min'));
            
            $div1.append($div3);

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
controller.initStorage();













