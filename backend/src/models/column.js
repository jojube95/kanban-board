const mongoose = require('mongoose');
const taskSchema = require ('./task').schema;

const columnSchema = mongoose.Schema({
  name: {type: String, required: true},
  boardId: {type: String, required: true},
  tasks: [{type: taskSchema, required: false}]
});

module.exports = mongoose.model('Column', columnSchema);
