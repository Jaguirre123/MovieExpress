// We have to make requests on the backend (controllers) not the views(ejs) because CORS bullshit, they dont trust the info on the frontend.

// GET https://api.themoviedb.org/3/movie/now_playing?api_key=ddcfa5b68186a8e739fa81a2bd78ed39
// var nowPlaying = the response from that thing ^^
// make get request blah blah nowPlaying.forEach(movie => <div>movie.title</div>)

var Movie = require('../models/movie');
var User = require('../models/user');

function nowShowing(req, res) {
    fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=ddcfa5b68186a8e739fa81a2bd78ed39')
    .then(res => console.log(res))
    
};

module.exports = {
    nowShowing
}