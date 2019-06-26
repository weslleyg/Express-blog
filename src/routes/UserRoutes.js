const express = require('express');
const UserController = require('../controllers/UserController');

const routes = express.Router();

// POST
routes.post('/', UserController.register);
routes.post('/login', UserController.login);
routes.post('/refresh', UserController.refreshToken);

// GET
routes.get('/login', (req, res) => {
	res.render('login');
});
routes.get('/', UserController.users);
routes.get('/:username', UserController.user);

// PUT
routes.put('/:username', UserController.edit);

// DELETE
routes.delete('/:username', UserController.delete);

module.exports = routes;
