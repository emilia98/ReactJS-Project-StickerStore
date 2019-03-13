const User = require('../models/User');
const encryption = require('../utils/encryption');
const jwt = require('jsonwebtoken');
const passport = require('passport');

module.exports = {
    signUp: async (req, res) => {
        let { email, username, password } = req.body;
        let errors = [];
        let user = null;

        errors = checkIfUndefined(email, 'Please, provide an email!', errors);
        errors = checkIfUndefined(username, 'Please, provide a username!', errors);
        errors = checkIfUndefined(password, 'Please, provide a password!', errors);

        if(errors.length > 0) {
            return  res.json({
                errors
            })
        }

        if(email.length === 0) {
            errors.push('Email is required!');
        } else if(!validateEmail(email)) {
            errors.push('Please, provide a valid email!');
        } 

        if(username.length === 0) {
            errors.push('Username is required!');
        } else if(username.length < 3 || username.length > 45) {
            errors.push('Username should be between 3 and 45 characters!');
        } 

        if(password.length === 0) {
            errors.push('Password is required!');
        } else if(password.length < 6 || password.length > 30) {
            errors.push('Password should be between 6 and 30 characters!');
        } 

        if(errors.length > 0) return  res.json({ errors });

        try {
            user = await User.findOne({
                $or: [
                    {username: username},
                    {email: email}
                ]
            });
            
        } catch(err) {
            console.log(err);
            return res.json({msg: 'An error occurred while signing up!', hasError: true})
        }
        
        
        if(user) {
            console.log(user);
            if(user.username === username) {
                return res.json({msg: 'This username is already taken!', hasError: true})
            } 

            if(user.email === email) {
                return res.json({msg: 'This email is already taken!', hasError: true})
            } 
        }

        let salt = encryption.generateSalt();
        let hashedPassword = encryption.generateHashedPassword(password, salt);
        let result = null;

        try {
            result = await User.create({ username, email, hashedPassword, salt});
            console.log(result);
        } catch(err) {
            console.log(err);
            return res.json({msg: 'An error occurred while signing up!', hasError: true})
        }

        res.json({msg: 'You have signed up succesfully!'});
    },
    signIn: (req, res) => {
        let { username, password } = req.body;
        let errors = [];

        errors = checkIfUndefined(username, 'Please, provide a username!', errors);
        errors = checkIfUndefined(password, 'Please, provide a password!', errors);

        if(errors.length > 0) return  res.json({ errors });

        if(username.length === 0) {
            errors.push('Username is required!');
        }

        if(password.length === 0) {
            errors.push('Password is required!');
        }

        if(errors.length > 0) return  res.json({ errors });

        passport.authenticate('local', {session: false}, (err, user, info) => {
            if(err) {
                return res.json({
                    msg: 'An error occurred while trying to sign in!',
                    hasError: true
                })
            }

            console.log('User = ' + user);
            console.log(info);

            if(!user) {
                return res.json({
                    msg: info.message,
                    hasError: true
                })
            }

            req.login(user, {session: false}, (err) => {
                if(err) {
                    return res.json({
                        msg: 'An error occurred while trying to sign in!',
                        hasError: true
                    })
                }

                const token = jwt.sign( {userId: user._id}, 'my_secret_jwt');
                return res.json({
                    username: user.username,
                    token: token,
                    msg: 'Successfully sign in!'
                });
            })
        })(req, res);
    }
}

function checkIfUndefined(field, msg, errors) {
    if(field === undefined) {
        errors.push(msg)
    }

    return errors;
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function checkIfEmpty(field, msg, errors) {
    if(field.length === 0) {
        errors.push(msg)
    }

    return errors;
}