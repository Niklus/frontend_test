'use strict';


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


function updatediv(data){    
    var $list = $('#list').html('');
    data.forEach(function(obj){      
	    $list.append($('<li>').text(obj.name)); 
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
