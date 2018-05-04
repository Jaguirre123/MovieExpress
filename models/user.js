var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  email: String,
  admin: {type: Boolean, default: false},
  zip: String,
  avatar: String,
  movies: [{type: Schema.Types.ObjectId, ref: 'Movie'}],
  googleId: String
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);