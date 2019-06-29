const express = require("express");
const UserController = require("../controllers/UserController");
const authService = require("../services/auth");

const routes = express.Router();

// POST
routes.post("/", UserController.register);
routes.post("/login", UserController.login);
routes.post("/refresh", UserController.refreshToken);

// GET
routes.get("/", authService.auth, UserController.users);
routes.get("/:username", UserController.user);

// PUT
routes.put("/:username", UserController.edit);

// DELETE
routes.delete("/:username", UserController.delete);

module.exports = routes;
