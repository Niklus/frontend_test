var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var routes = require('./routes/index');

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
app.use('/', routes);

// Error handlers

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

