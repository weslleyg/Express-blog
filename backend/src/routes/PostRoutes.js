const express = require('express');
const PostController = require('../controllers/PostController');
const authService = require('../services/auth');

const routes = express.Router();

// POST
routes.post('/', authService.auth, PostController.postar);

// GET
routes.get('/', authService.auth, PostController.getAll);
routes.get('/:slug', authService.auth, PostController.getOne);

// PUT
routes.put('/:slug', authService.auth, PostController.edit);

// DELETE
routes.delete('/:slug', authService.auth, PostController.delete);

module.exports = routes;
