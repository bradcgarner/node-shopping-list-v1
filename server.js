'use strict';
/*$ global*/

const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const {ShoppingList, Recipes} = require('./models');

const jsonParser = bodyParser.json();
const app = express();

// log the http layer
app.use(morgan('common'));


// we're going to add some items to ShoppingList
// so there's some data to look at
ShoppingList.create('beans', 2);
ShoppingList.create('tomatoes', 3);
ShoppingList.create('peppers', 4);

Recipes.create('chocolate milk',['cocoa', 'milk', 'sugar']);
Recipes.create('chili',['beef', 'beans', 'pepper', 'tomatoes', 'cumin']);

// when the root of this router is called with GET, return
// all current ShoppingList items
app.get('/shopping-list', (req, res) => {
  res.json(ShoppingList.get());
});

app.post('/shopping-list', jsonParser, (req, res) => {
  if(req.body.name && req.body.budget) {
    let item = ShoppingList.create(req.body.name, req.body.budget);
    res.json(item);
  } else {
    let message = 'there was an issue with your submision';
    console.log(message); 
    res.status(400).send(message);
  }
});
app.get('/recipes', (req, res) => {
  res.json(Recipes.get());
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
