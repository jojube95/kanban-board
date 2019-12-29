const mongoose = require('mongoose');

const columnSchema = mongoose.Schema({
  name: {type: String, required: true},
  boardId: {type: String, required: true}
});

module.exports = mongoose.model('Column', columnSchema);
