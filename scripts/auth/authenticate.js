var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    User = require('../models/User'),
    mongoose = require('mongoose');
    //drive = require('../drive/drive');


// checks if email is valid, returns boolean

function validateEmail(email) {
    var re = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    if (re.test(email)) {
        if ((email.indexOf('@columbia.edu', email.length - '@columbia.edu'.length) !== -1) || (email.indexOf('@barnard.edu', email.length - '@barnard.edu'.length) !== -1)) {
            return true;
        }
    } else {
        return false;
    }
}

module.exports = function(config, passport) {
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });


    passport.use(new GoogleStrategy({
            clientID: config.clientID,
            clientSecret: config.clientSecret,
            callbackURL: config.callbackURLDev 
        },
        function(token, refreshToken, profile, done) {

            // make the code asynchronous
            // User.findOne won't fire until we have all our data back from Google
            process.nextTick(function() {

                // try to find the user based on their google id
                var id = profile.id;
                var validity = validateEmail(profile.emails[0].value);
                User.findOne({
                    '_id': id
                }, function(err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        // if a user is found, log them in
                        console.log(user);
                        return done(null, user);
                    } else {
                        // if the user isnt in our database & is columbia; create a new user
                        if (validity){
                        var newUser = new User();

                        // set all of the relevant information
                        newUser._id = profile.id;
                        newUser.username = profile.displayName;
                        newUser.email = profile.emails[0].value;

                        console.log(newUser);

                        // save the user
                        newUser.save(function(err) {
                            if (err)
                                throw(err);
                            console.log(newUser.email);
                            return done(null, newUser);
                            console.log('User created!');
                        }); 
                        }

                        else
                        {
                            return done(null, null);
                        }
                    }
                });
            });
        }));

};
