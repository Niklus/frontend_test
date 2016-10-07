'use strict';

var view = {

	render: function(data){    
    
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

	init: function(){

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















