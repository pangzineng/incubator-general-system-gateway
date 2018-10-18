var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PermissionSchema = new Schema({
  accountName: {type: String, required: true, unique: true},
  profileNames: [String],
});

// Export the model
module.exports = mongoose.model('permission', PermissionSchema);
