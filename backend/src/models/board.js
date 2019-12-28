const mongoose = require('mongoose');

const boardShema = mongoose.Schema({
  name: {type: String, required: true}
});

module.exports = mongoose.model('Board', boardShema);
