const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  timeSpend: {type: Number, required: true},
  projectId: {type: String, required: true}
});

module.exports = mongoose.model('Task', taskSchema);
