const passport = require('passport');
const { findOne } = require('../database/models/users');
const localStrategy = require('passport-local').Strategy;

const User = require('../database/models/users');

passport.use(
    new localStrategy({usernameField:'username'},
    (username, password, done)=>{
        User.findOne({username:username},(err, user)=>{
            if(err)return done(err);
            else if(!user)return done(null, false, {message:"user is not registered."});
            else if(!user.verifyPassword(password,user.password)) return done(null, false, {message:"Wrong password"})
            else return done(null, user);
        })
    })
)