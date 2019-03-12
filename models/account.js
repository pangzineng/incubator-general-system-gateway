var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccountSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
});

// Export the model
module.exports = mongoose.model('account', AccountSchema, 'account');
