var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var index = require('./routes/index');
var selections = require('./routes/selections');

// body parser
app.use(bodyParser.urlencoded({ extended: true }));

// set up handlebars view engine
var handlebars = require('express-handlebars')
  .create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// static files
app.use(express.static(__dirname + '/public'));

// routes
app.use('/', index);
app.use('/', selections);

// 404 catch-all handler 
app.use(function(req, res, next){
  res.status(404);
  res.render('404');
});

// 500 error handler 
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

// set port
app.set('port', process.env.PORT || 3000);

// listen
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:'+ 
  app.get('port') + '; Press Ctrl-C to terminate.');
}); 

