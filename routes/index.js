var express = require('express');
var router = express.Router();
var fs = require('fs');
var jsonFile = fs.readFileSync("recipes.json");
var jsonArray = JSON.parse(jsonFile);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* Send objects filtered by ingredients. */
router.post('/filtered_recipes', function(req, res) {

  var input = req.body.input;
  var recipes = [];
  
  jsonArray.forEach(function(obj){
    obj.ingredients.forEach(function(el){       
      if(input.toLowerCase() == el.toLowerCase()) {
        recipes.push(obj);                            
      }
    });   
  });

  res.send(recipes);
});

/* Send all recipes. */
router.get('/all_recipes', function(req, res) {  
  res.send(jsonArray);
});

/* Send selected objects */
router.post('/selections', function(req, res) {
  
  var selection = req.body.selection;
  
  if (typeof(selection) !== 'undefined') { 
    jsonArray.forEach(function(obj){
      if(selection == obj.name) {
        res.send(obj);                            
      } 
    });
  }
});

module.exports = router;