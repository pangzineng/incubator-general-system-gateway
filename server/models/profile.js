var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfileSchema = new Schema({
  name: {type: String, required: true, unique: true},
  description: {type: String},
  endpoint: {type: String, required: true},
  access: {type: Map, required: true}
});

// Export the model
module.exports = mongoose.model('profile', ProfileSchema);
