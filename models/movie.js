var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    content: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true    
});

var movieSchema = new Schema({
  title: String,
  poster: String,
  users: [ { type: Schema.Types.ObjectId, ref: 'User'} ],
  comments: [ commentSchema ],
  apiId: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema);