const express = require('express');
const authService = require('../services/auth');

const route = express.Router();

route.get('/', authService.isAdm, (req, res, next) => {
	res.status(200).send({
		title: 'Node API',
		version: '0.0.1'
	});
});

module.exports = route;
