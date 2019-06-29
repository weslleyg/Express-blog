const express = require("express");
const authService = require("../services/auth");
const auth = require("../../public/javascripts/auth");

const route = express.Router();

route.get("/", (req, res, next) => {
  res.render("index", { auth });
});

module.exports = route;
