# Todo API

## Defining routes

Define the route file in `routes/todo.js`

```javascript

const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.status(200).json({ message: "Todo List" });
});

routes.post('/', (req, res) => {
    res.status(200).json({ message: "Todo Created" });
});

routes.get('/:id', (req, res) => {
    res.status(200).json({ message: "Todo List Item" });
});

routes.put('/:id', (req, res) => {
    res.status(200).json({ message: "Todo List Item Updated" });
});

routes.delete('/:id', (req, res) => {
    res.status(200).json({ message: "Todo List Item Deleted" });
});
  
module.exports = routes;

```

To consume the routes, update the express app. 

```javascript

const todoRoutes = require('./routes/todo');

//  Connect all our routes to our application
app.use('/todo', todoRoutes);
```

To test the new endpoints, use Postman client or `curl`. Sample curl command 

```bash
curl --location --request GET 'localhost:3000/todo/'
```

## Database Operations

Install Mongoose using the command `npm i mongoose --save`

### Connecting to the database

```javascript
// Mongo Connection
var HOST_NAME = 'localhost';
var DATABASE_NAME = 'demo';
mongoose.connect('mongodb://' + HOST_NAME + '/' + DATABASE_NAME);
```

### Defining a Schema

```javascript

// models/todo.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoListItemSchema = new Schema({
  title: String,
  desc: String,
  reminder: Boolean,
  tasks: {}
});

module.exports = mongoose.model('TodoListItem', TodoListItemSchema);

```

### Read from database

```javascript

const TodoListItem = require('../models/todo');

routes.get('/', async (req, res) => {
    TodoListItem.find(function (error, items) {
        if (error) {
            res.status(500).send(error);
            return;
        }

        console.log(items);
        res.json(items);
    });
});

```

### Write to Database

```javascript
routes.post('/', async (req, res) => {
    const todo = new TodoListItem(req.body);
    todo.save();
    res.status(201).send(todo);
});
```

## Authentication

To enable authentication on the APIs, before registering routes in `index.js`, register a middleware function that verifies the `Authorization` header. 

```javascript

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

```

To verify that the authentication is working, run the following command. 
The Authorization header expects `username:password` in Base64 format. 

```bash

curl --location --request GET 'localhost:3000/todo/' --header 'Authorization: Basic YWRtaW46YWRtaW4xMjM0'
```

