'use strict';
var $list = $('#list');

function filterByIngredients(input){ 
    
    var data = {input: input};
	$.ajax({            
	    type: 'POST',   
	    url: 'http://localhost:3000',
	    data: data,
	    success: function(data){  
           updateList(data);
	    }
    });
}


function updateList(data){    
    $list.html('');
    data.forEach(function(obj){      
	    $list.append($('<li>').text(obj.name)); 
	}); 

	if(!$list.text()){
	  $list.append($('<li>').text('Sorry Try Again')); 
	}
}

function refresh(){
	$list.html('');
	$.getJSON("/recipes", function(json) { 
	  json.forEach(function(obj){      
	    $list.append($('<li>').text(obj.name)); 
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
	refresh();
});
