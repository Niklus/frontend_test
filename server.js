var express = require('express');
var app = express();
var fs = require('fs');
var jsonFile = fs.readFileSync("recipes.json");
var jsonArray = JSON.parse(jsonFile);
var bodyParser = require('body-parser');


//Body Parser
app.use(bodyParser.urlencoded({ extended: true }));

// set up handlebars view engine
var handlebars = require('express-handlebars')
  .create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// set port
app.set('port', process.env.PORT || 3000);

// static files
app.use(express.static(__dirname + '/public'));

// routes
app.get('/', function(req, res) {
  res.render('index', { 
    title: 'Recipes', 
    recipes: jsonArray
  });
});

app.post('/', function(req, res) {
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

app.get('/recipes', function(req, res) {  
  res.send(jsonArray);
});

app.post('/selections', function(req, res) {
  
  var selection = req.body.selection;
  
  var ingredients = [];

  selection.forEach(function(select){
    
      jsonArray.forEach(function(obj){
             
      if(select == obj.name) {
        obj.ingredients.forEach(function(el){
          ingredients.push(el);
        });                            
      } 
    });
  });
  
  var response = ingredients.sort();//Remove Duplicates before sending

  res.send(response);
  
});

// 404 catch-all handler (middleware)
app.use(function(req, res, next){
  res.status(404);
  res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:'+ 
  app.get('port') + '; Press Ctrl-C to terminate.');
}); 

