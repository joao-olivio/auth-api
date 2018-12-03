const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser (user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function (request, response, next) {
    const email = request.body.email;
    const password = request.body.password;
    // Check if the given email exists
    User.findOne({email: email}, function (err, user) {
        if (err) return next(err);
        // If a user with this email exists return an error -> i'll change it later
        if(user !== null) {
            return response.status(422).send({error: 'User name already exists'});
        }
        // If a user with email does not exist, create
        const newUser = new User({
            email: email,
            password: password
        });
        // save user record
        newUser.save(function (err) {
            if(err) return next(err);

            response.json({
                token: tokenForUser(newUser)
            });
        });

    });   
};