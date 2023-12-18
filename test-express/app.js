// import 구간
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// router 설정
var indexRouter = require('./routes/index');
var crudApiRouter = require('./routes/api');

// express() 앱 실행
var app = express();

// view templates engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 앱 설정 - 미들웨어를 연결하는 부분
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// path 설정
app.use('/', indexRouter);
app.use('/api', crudApiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) { // 기본 경로 or /users 말고 다른 경로로 진입했을 경우 실행
  next(createError(404)); // next() 덕분에 다음 미들웨어로 넘어가는 것
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
