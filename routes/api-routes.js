// Requiring our sequelize models and passport
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware. We are using local strategy for authentication.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  //app.post("/api/login", passport.authenticate("local", {successRedirect: "/members" , failureRedirect: "/login"}));
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
  
    res.json("/members");
  });

  // Route for signing up a user/Creating a new User credential. 
  // The user's password is hashed and stored securely.
  // If the user is created successfully, proceed to log the user in page for logging in.
  // If the use is not able to be signed up, then send an error back.
  app.post("/api/signup", function(req, res) {
    console.log ("User Data = " + req.body.userName);
    db.User.create({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      logged: true
    }).then(function() {
      //res.json("/memberslogin");
      //res.redirect(307, "/login");
      res.redirect(307, "/");
      //res.redirect(307, "/loginforsignup");
      //res.redirect("/members");
    }).catch(function(err) {
      //window.alert("Incorrect User Id or Password. Try Again");
      res.json(err);
    });
  });

  // Route for logging user out
  app.get("/logout", function(req, res)
  {
    console.log("I am here to logout...");
    req.logout();
    res.redirect("/allvisitors");
  });

//update logged off on the database by setting state to false
app.get("/api/leave/", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.User.findAll({}).then(function(dbTodo) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbTodo);
    });
    res.redirect("/logout");
  });

//once logout update the logged state
app.put("/logout", function (req, res)
{
  db.User.update(
  { logged: false},
  {
    where: {  email: req.body.email}
  }).then(function (getUpdate) {
    res.json(getUpdate);
  });
});

//end of logout area

//update login state
app.put("/api/login", function (req, res)
{
  db.User.update(
  { logged: true},
  {
    where: { email: req.body.email}
  }).then(function (getUpdate) {
    res.json(getUpdate);

  });

});
};
