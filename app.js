
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , login = require('./routes/login')
  , http = require('http')
  , path = require('path');

var app = express();

//require('./model/connection.js')

var dbOptions = {
  host     : 'localhost',
  user     : 'jobsv1ll3',
  password : 'Godisgood8',
  database : 'jobsville',
  socketPath : "/Applications/MAMP/tmp/mysql/mysql.sock"
};

app.locals({
	'dbOptions' : dbOptions
})

// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('j0bsv1l3'));
app.use(express.cookieSession());
app.use(express.session());
//app.use(express.compress());

app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  app.locals.pretty = true;
}

app.get('/', routes.index);
app.get('/login', login.index);
app.get('/users', user.list);
app.post('/users/login', user.login);
app.get('/signout', user.signout);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});