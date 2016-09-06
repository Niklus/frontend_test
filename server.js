var express = require('express');
var app = express();
var fs = require('fs');
var jsonFile = fs.readFileSync("recipes.json");
var jsonArray = JSON.parse(jsonFile);
var bodyParser = require('body-parser');


//Body Parser
app.use(bodyParser.urlencoded({ extended: true }));

// set up view engine
app.set('views', './views');
app.set('view engine', 'pug');

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

app.post('/', function filter(req, res) {

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

