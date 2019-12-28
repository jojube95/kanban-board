const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  name: { type: String, required: true},
  favourite: { type: Boolean, required: true},
  color: {type: String, required: true}
});

module.exports = mongoose.model('Project', projectSchema);
