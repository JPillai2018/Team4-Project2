var connection = require("../config/connection.js");


// Routes
// =============================================================
module.exports = function(app) {

/*   app.get("/", function(req, res) {
    var dbQuery = "SELECT * FROM users";

    connection.query(dbQuery, function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  }); */

  // Add a user
  app.post("/register", function(req,res){
    console.log(req.body);
    var dbQuery = "INSERT INTO users (username, email, password, created_at) VALUES (?,?,?,?)";

    connection.query(dbQuery, [req.body.username, req.body.email, req.body.password,req.body.created_at], function(err, result) {
      if (err) throw err;
      console.log("User Successfully Saved!");
      res.end();
    });
  });
};
