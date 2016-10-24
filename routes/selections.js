var express = require('express');
var router = express.Router();
var fs = require('fs');
var jsonString = fs.readFileSync("recipes.json");
var jsonArray = JSON.parse(jsonString);

/* Send objects filtered by ingredients. */
router.post('/filtered_recipes', function(req, res) {
   
    var recipes = [];
    
    jsonArray.forEach(function(obj){
      obj.ingredients.forEach(function(el){       
        if(req.body.input.toLowerCase() == el.toLowerCase()) {
          recipes.push(obj );                            
        }
      });   
    });
    
    res.send(JSON.stringify(recipes));
});

/* Send all recipes */
router.get('/all_recipes', function(req, res) {  
  res.send(jsonString);
});

/* Send selected objects */
router.post('/selections', function(req, res) {
  
  if (typeof(req.body.selection) !== 'undefined') { 
    jsonArray.forEach(function(obj){
      if(req.body.selection == obj.name) {
        res.send(obj);                            
      } 
    });
  }
});

module.exports = router;