// import express
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
// import our fruits router
const fruitsRouter = require("./controllers/fruits.js");

// import our fruits
// require will return the value of module.exports
const fruits = require("./models/fruits.js");

// create our app object
const app = express();

// middleware
app.use(express.static("public")); // use a "public" folder for files
// public/style.css -> /style.css
// public/app.js -> /app.js

// express.urlencoded (prase url encoded bodies)
// add the data to req.body
app.use(express.urlencoded({ extended: true }));

//morgan - log data about each request
app.use(morgan("dev"));

//method override = allows to override post as a differernt method
app.use(methodOverride("_method"));

//register fruit router
app.use("/fruits", fruitsRouter);

// server listener to turn our server
app.listen(3000, () => {
  console.log("listening on port 3000");
});
