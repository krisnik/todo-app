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
