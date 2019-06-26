const express = require('express');
const authMiddleware = require('../services/auth');

const route = express.Router();

route.get('/', authMiddleware.auth, (req, res, next) => {
	res.render('index');
});

module.exports = route;
