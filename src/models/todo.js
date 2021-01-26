const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoListItemSchema = new Schema({
  title: String,
  desc: String,
  reminder: Boolean,
  tasks: {}
});

module.exports = mongoose.model('TodoListItem', TodoListItemSchema);
