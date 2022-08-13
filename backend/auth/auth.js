const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const UserModel = require('../models/userModel');

// handle user registration
passport.use('signup', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  try {
    const { name } = req.body;
    const user = await UserModel.create({ email, password, name});
    return done(null, user);
  } catch (error) {
    done(error);
  }
}));
// handle user login
passport.use('login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, async (email, password, done) => {
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return done(null, false, { message: 'User not found' });
      }
      const validate = await user.isValidPassword(password);
      if (!validate) {
        return done(null, false, { message: 'Wrong Password' });
      }
      return done(null, user, { message: 'Logged in Successfully' });
    } catch (error) {
      return done(error);
    }
  }));
  // verify token is valid
  passport.use(new JWTstrategy({
    secretOrKey: 'top_secret',
    jwtFromRequest: function (req) {
      let token = null;
      if (req && req.cookies) token = req.cookies['jwt'];
      return token;
    }
  }, async (token, done) => {
    try {
      return done(null, token.user);
    } catch (error) {
      done(error);
    }
  }));