const express = require('express');
var bodyParser = require('body-parser');
const todoRoutes = require('./routes/todo');
const mongoose = require('mongoose');

const app = express()

app.use(bodyParser.json());

// Mongo Connection
var HOST_NAME = 'localhost';
var DATABASE_NAME = 'demo';
mongoose.connect('mongodb://' + HOST_NAME + '/' + DATABASE_NAME);

// Authentication
app.use((req, res, next) => {
    // authentication middleware
    const auth = {login: 'admin', password: 'admin1234'} // change this
  
    // parse login and password from headers
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')
  
    // Verify login and password are set and correct
    if (login && password && login === auth.login && password === auth.password) {
      // Access granted...
      return next();
    }
  
    // Access denied...
    res.set('WWW-Authenticate', 'Basic realm="401"');
    res.status(401).send('Authentication required.');
});

//  Connect all our routes to our application
app.use('/todo', todoRoutes);

const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})