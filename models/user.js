var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
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