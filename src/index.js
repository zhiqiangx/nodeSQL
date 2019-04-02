import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

// import indexRouter from './routes/index';
import usersRouter from './routes/users';
import dbRouter from './routes/db';

let app = express();

// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// index.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/db', dbRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  console.log(req.app.get('env'));
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(4321, () => {
  console.log('server running http://localhost:4321');
});
