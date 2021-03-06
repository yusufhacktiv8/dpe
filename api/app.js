var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const cors = require('cors');

const index = require('./routes/index');
const security = require('./routes/security');
const roles = require('./routes/roles');
const users = require('./routes/users');
const projects = require('./routes/projects');
const projectProgresses = require('./routes/project_progresses');
const lsps = require('./routes/lsps');
const claims = require('./routes/claims');
const bads = require('./routes/bads');
const cashFlows = require('./routes/cash_flows');
const projections = require('./routes/projections');
const piutangs = require('./routes/piutangs');
const projectTypes = require('./routes/project_types');
const okDetails = require('./routes/ok_details');
const images = require('./routes/images');

const dashboard = require('./routes/dashboard');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

app.use('/api/security', security);
app.use('/api/roles', roles);
app.use('/api/users', users);
app.use('/api/projects', projects);
app.use('/api/projectprogresses', projectProgresses);
app.use('/api/lsps', lsps);
app.use('/api/claims', claims);
app.use('/api/bads', bads);
app.use('/api/cashflows', cashFlows);
app.use('/api/projections', projections);
app.use('/api/piutangs', piutangs);
app.use('/api/projecttypes', projectTypes);
app.use('/api/images', images);
app.use('/api/dashboard', dashboard);
app.use('/api/okdetails', okDetails);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
