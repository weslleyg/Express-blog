const express = require("express");
const config = require("./config/config");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");

mongoose.connect(config.connectionString, {
  useNewUrlParser: true,
  useCreateIndex: true
});

const app = express();
app.set("views", path.join(__dirname, "../", "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(
  bodyParser.json({
    limit: "5mb"
  })
);
app.use(express.static(path.join(__dirname, "../", "public")));
app.use(bodyParser.urlencoded({ extended: false }));

const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use((req, res, next) => {
  req.io = io;

  next();
});

// Importação das rotas
const indexRoute = require("./routes/indexRoute");
const userRoute = require("./routes/UserRoutes");
const postRoute = require("./routes/PostRoutes");

app.use("/", indexRoute);
app.use("/user", userRoute);
app.use("/post", postRoute);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = {
  app,
  server
};
