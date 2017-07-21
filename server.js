var express = require('express'); 
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var path = require('path');
var db = require('./config/db');

var routes = require('./app/index');
var mandelbrots = require('./app/mandelbrots');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(db.url, {  
    useMongoClient: true,  
    })
    .then((db) =>  {
        console.log('connection successful: ' + db.db.databaseName);
    })
    .catch((err) => {
        console.error(err)
    });

var port = process.env.PORT || 8080;

var app = express(); 
app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 

app.set('views', path.join(__dirname, './public/views'));
app.set('view engine', 'ejs');

// routes ==================================================
app.use('/', routes);
app.use('/m', mandelbrots);

app.listen(port);               

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('pages/error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('pages/error', {
        message: err.message,
        error: {}
    });
});

// expose app           
exports = module.exports = app; 
