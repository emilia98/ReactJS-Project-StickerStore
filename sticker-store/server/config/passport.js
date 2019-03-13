const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

// callback <=> done
passport.use(new LocalStrategy(
    async function(username, password, done) {
        console.log(username, password);
        let user = null;
        try {
            user = await User.findOne({ username: username});
        } catch(err) {
            console.log('LOCAL: ');
            console.log(err);
            return done(err);
        }

        if(!user) return done(null, null, { message: 'User with this username does not exist!'});

        if(!user.authenticate(password)) return done(null, false, { message: 'Incorrect password'});

        return done(null, user);
    }
));