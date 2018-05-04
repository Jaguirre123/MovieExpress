var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    content: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true    
});

var movieSchema = new mongoose.Schema({
  title: String,
  poster: String,
  users: [ { type: Schema.Types.ObjectId, ref: 'User'} ],
  comments: [ commentSchema ],
  apiId: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema);