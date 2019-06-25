const express = require('express');
const config = require('./config/config');
const cors = require('cors');
const mongoose = require('mongoose');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

mongoose.connect(config.connectionString, {
	useNewUrlParser: true,
	useCreateIndex: true
});

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(cors());
app.use(
	express.json({
		limit: '5mb'
	})
);
app.use(express.urlencoded({ extended: false }));

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use((req, res, next) => {
	req.io = io;

	next();
});

// Importação das rotas
const indexRoute = require('./routes/indexRoute');
const userRoute = require('./routes/UserRoutes');
const postRoute = require('./routes/PostRoutes');

app.use('/', indexRoute);
app.use('/user', userRoute);
app.use('/post', postRoute);

app.use(function(req, res, next) {
	next(createError(404));
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

module.exports = {
	app,
	server
};
