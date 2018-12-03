const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Setup options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
}

// Create the local strategy, aka, database connection thing..
const localOptions = {
    usernameField: 'email'
}
// Create local strategy
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
    // Verify this username and password, call done with the user..
    User.find({ email : email}, function (err, user) {
        if(err) return done(err);
        if(!user) return done(null, false);

        user.comparePassword(passport, function (err, isMatch) {
            if(err) return done(err);

            if(!isMatch) return done(null, false);

            return done(null, user);
        })
    });
});

// Create the JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
    // See if the user ID in the payload exists in our database
    User.findById(payload.sub, function (err, user) {
        if(err) return done(err, false);
        // If it does, call 'done' with that user
        if(user !== null) return done(null, user);
        // otherwise call done without a user object
        done(null, false);
    })
});
// Tell passport to use this strategy
module.exports = passport.use(jwtLogin).use(localLogin);
//module.exports = passport.use(localLogin);