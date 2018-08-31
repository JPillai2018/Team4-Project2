var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

// Using Passport Local STrategy (User id/Email and Password)
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    usernameField: "email"
  },
  function(email, password, done) {
    // When a user tries to sign in this code runs
    //console.log('inside passport local stratgy', email, password);
    db.User.findOne({
      where: {
        email: email
      }
    }).then(function(dbUser) {
      // If the user doesn't exists with the given email
      if (!dbUser) {
        return done(null, false, {
          message: "Incorrect Id/Email."
        });
      }
      // If there is a user with the given email, but the password the user gives us is incorrect
      else if (!dbUser.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect Password."
        });
      }
      // Else return the user
      return done(null, dbUser);
    });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

module.exports = passport;
