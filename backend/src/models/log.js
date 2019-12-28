const mongoose = require('mongoose');

const logShema = mongoose.Schema({
  projectName: {type: String, required: true},
  taskName: {type: String, required: true},
  date: {type: Date, required: true},
  duration: {type: Number, required: true}
});

module.exports = mongoose.model('Log', logShema);
