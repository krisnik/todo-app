const express = require('express');
var bodyParser = require('body-parser');
const todoRoutes = require('./routes/todo');
const mongoose = require('mongoose');

const app = express()

app.use(bodyParser.json());

//  Connect all our routes to our application
app.use('/todo', todoRoutes);

// Mongo Connection
var HOST_NAME = 'localhost';
var DATABASE_NAME = 'demo';
mongoose.connect('mongodb://' + HOST_NAME + '/' + DATABASE_NAME);

const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})