var Movie = require('../models/movie');
var User = require('../models/user');

function getUser(req, res) {
    var id = req.params.id;
    User.findOne({_id: id}).populate('favorites').exec(function(err, userShow) {
        res.render('users/show', {userShow: userShow, user: req.user});
    });
};

module.exports = {
    getUser
};