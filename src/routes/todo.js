const routes = require('express').Router();

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

routes.post('/', async (req, res) => {
    const todo = new TodoListItem(req.body);
    todo.save();
    res.status(201).send(todo);
});

routes.get('/:id', (request, response) => {
    var itemId = request.params.id;

    TodoListItem.findOne({ _id: itemId }, function (error, item) {
      if (error) {
        response.status(500).send(error);
        return;
      }
      if(item) {
        response.json(item);
        return;
      }

      response.status(404).json({
        message: 'Todo Item with id ' + itemId + ' was not found.'
      });
    });
});

routes.put('/:id', (request, response) => {
    var itemId = request.params.id;

    TodoListItem.findOne({ _id: itemId }, function (error, item) {
        if (error) {
          response.status(500).send(error);
          return;
        }
  
        if (item) {
          item.title = request.body.title;
          item.desc = request.body.description;
          item.reminder = request.body.quantity;
          item.tasks = request.body.tasks;

          item.save();
  
          response.json(item);
          return;
        }
  
        response.status(404).json({
          message: 'Todo Item with id ' + itemId + ' was not found.'
        });
    });
});

routes.delete('/:id', (request, response) => {
    var itemId = request.params.id;

    TodoListItem.findOne({ _id: itemId }, function (error, item) {
        if (error) {
          response.status(500).send(error);
          return;
        }
  
        if (item) {
            item.remove(function (error) {

                if (error) {
                  response.status(500).send(error);
                  return;
                }
      
                response.sendStatus(204);
            });
            return;
        }
  
        response.status(404).json({
          message: 'Todo Item with id ' + itemId + ' was not found.'
        });
    });
});
  
module.exports = routes;
