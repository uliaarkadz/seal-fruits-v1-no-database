// import express
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");

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

// fruits index route
// get request to /fruits
// return all fruits
app.get("/fruits", (req, res) => {
  // res.send(fruits)
  // "index.ejs" => "./views/index.ejs"
  // {fruits} => {fruits:fruits}
  res.render("index.ejs", { fruits });
});

//new route - render page with a form
//get request to fruits/new
//allow to jhave a form to create a new fruit

app.get("/fruits/new", (req, res) => {
  //render template with form
  res.render("new.ejs");
});

//Create route - recieves form data
//Post requests /fruits
//create a fruit from the data. the redirects back to index page

app.post("/fruits", (req, res) => {
  //get form data from the request
  const body = req.body;
  //res.send(body);
  //convert ready to eat to true or false
  if (body.readyToEat === "on") {
    body.readyToEat = true;
  } else {
    body.readyToEat = false;
  }
  //add fruit to array
  fruits.push(body);

  //redirect back to index
  res.redirect("/fruits");
});

//destroy route - deletes a fruit
//DELETE -> /fruits/:id
//deletes the specifies fruit
app.delete("/fruits/:id", (req, res) => {
  const id = req.params.id;
  //then we splice it from array
  fruits.splice(id, 1);
  res.redirect("/fruits");
});
// fruits show route
// get request to /fruits/:id
// return a single fruit
app.get("/fruits/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // get the fruit from the array
  const fruit = fruits[id];
  // send the fruit as the response
  // res.send(fruit)

  // render the show.ejs template
  // res.render(template, data)
  // for the template assume "/views/"
  // "show.ejs" =>  ./views/show.ejs
  res.render("show.ejs", { fruit });
  // {fruit} is the same as {fruit:fruit}
});

// server listener to turn our server
app.listen(3000, () => {
  console.log("listening on port 3000");
});
