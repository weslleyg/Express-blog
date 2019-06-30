const express = require('express');
const config = require('./config/config');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect(config.connectionString, {
	useNewUrlParser: true,
	useCreateIndex: true
});

const app = express();

app.use(cors());
app.use(
	bodyParser.json({
		limit: '5mb'
	})
);
app.use(bodyParser.urlencoded({ extended: false }));

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

module.exports = {
	app,
	server
};
