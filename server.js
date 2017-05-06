/* =========================================
CRAIGSLAYER INVESTMENT FLIPPING APPLICATION
===========================================*/

/* =========================================
 Require the main dependencies
===========================================*/
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');

// Our model controllers (rather than routes)
var application_controller = require('./controllers/application_controller');

var products_controller = require('./controllers/products_controller');

var users_controller = require('./controllers/users_controller');

// =========== BRING ON THE MODELS ==========
var models = require('./models');
// =========== SYNC THE MODELS ==========
models.sequelize.sync();
// =========== THE APP ITSELF ==========
var app = express();
//Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + '/public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended: false
}))

//allow sessions
app.use(session({ secret: 'app', cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true}));
app.use(cookieParser());

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', application_controller);
app.use('/products', products_controller);
app.use('/users', users_controller);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  })
});
// our module get's exported as app.
module.exports = app;
