//impor express
const express = require("express");

//create router
const router = express.Router();

const fruits = require("../models/fruits.js");

// fruits index route
// get request to /fruits
// return all fruits
router.get("/", (req, res) => {
  // res.send(fruits)
  // "index.ejs" => "./views/index.ejs"
  // {fruits} => {fruits:fruits}
  res.render("./fruits/index.ejs", { fruits });
});

//new route - render page with a form
//get request to fruits/new
//allow to jhave a form to create a new fruit

router.get("/new", (req, res) => {
  //render template with form
  res.render("./fruits/new.ejs");
});

//Create route - recieves form data
//Post requests /fruits
//create a fruit from the data. the redirects back to index page

router.post("/", (req, res) => {
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
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  //then we splice it from array
  fruits.splice(id, 1);
  res.redirect("/fruits");
});

//EDIT ROUTE - Render a Form tp edit specific fruit
//Get to fruits/:id/edit
//render a form with existing values to edit

router.get("/:id/edit", (req, res) => {
  const id = req.params.id;
  const fruit = fruits[id];

  res.render("./fruits/edit.ejs", { fruit, id });
});

//Update route - Recieves form data, updates the fruit
//Put to /fruts/:id
//updates specifies fruit
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;

  if (body.readyToEat === "on") {
    body.readyToEat = true;
  } else {
    body.readyToEat = false;
  }
  //swap old with new
  fruits[id] = body;

  //redirect
  res.redirect("/fruits");
});
// fruits show route
// get request to /fruits/:id
// return a single fruit
router.get("/:id", (req, res) => {
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
  res.render("./fruits/show.ejs", { fruit, id });
  // {fruit} is the same as {fruit:fruit}
});

//export the router
module.exports = router;
