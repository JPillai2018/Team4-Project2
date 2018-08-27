
$("#submitUser").on("click", function(event) {
  event.preventDefault();

  // Make a User object
  var newUser = {
    username: $("#username").val().trim(),
    email: $("#email").val().trim(),
    password: $("#password").val().trim(),
    created_at: moment().format("YYYY-MM-DD HH:mm:ss")
  };

  console.log(newUser);

  // Send an AJAX POST-request with jQuery
  $.post("/register", newUser)
    // On success, run the following code
    .then(function() {
      
    });

  // Empty each input box by replacing the value with an empty string
  $("#username").val("");
  $("#email").val("");
  $("#password").val("");
  $("#passwordMatch").val("");
});