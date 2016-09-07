'use strict';
var $list = $('#list');
var $ingredients = $('#ingredients');


function updateIngredients(data){    
    $ingredients.html('');
    data.forEach(function(item){      
	    $ingredients.append($('<li>').text(item)); 
	}); 
}

function filterByIngredients(input){ 
   
    var data = {input: input};
	$.ajax({            
	    type: 'POST',   
	    url: '/',
	    data: data,
	    success: function(data){  
           updateList(data);
	    }
    });
}

function updateList(data){    
    
    $list.html('');
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
}

function refresh(){
	$list.html('');
	$.getJSON("/recipes", function(data) { 
	  data.forEach(function(obj){      
	    $list.append($('<li>').text(obj.name+': '+obj.type+', '+obj.cook_time+' min')); 
	    $list.append($('<img>').attr('src','/img/'+obj.name+'.jpg'));
	    $list.append($('<input>').attr({
	    	type: 'checkbox',
	    	value: obj.name,
	    	name: 'recipeCheckbox'
	    }));
	  });
	});
}


//Events
var $input = $('#filter');   
$input.on('keypress', function (event) { 
	var input = $input.val();      
	if(event.keyCode === 13 && input){            
	  filterByIngredients(input); 
	  $input.val('');
	}
});

$('#refresh').on('click', function (event) {           	  
	$ingredients.html('');
	refresh();
});

$('#submitBtn').on('click', function(event){
    	
	var selection = [];

    $("input[name='recipeCheckbox']:checked").each(function(){ //Find a better way
    	selection.push($(this).val());
    });

    $.ajax({            
	    type: 'POST',   
	    url: '/selections',
	    data: {selection: selection},
	    success: function(data){  
           updateIngredients(data);
	    }
    });

});