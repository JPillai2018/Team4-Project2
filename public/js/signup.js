$(document).ready(function() 
{ 
  console.log("I am in Sign Up");
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var usernameInput =$("input#username");
  //var usernameInput ="defaultName";
  var emailInput = $("input#email");
  var passwordInput = $("input#password");
  //console.log("User Name=" + usernameInput);
  //console.log("Email=" + emailInput);
  //console.log("passwordInput=" + passwordInput);
  // When the signup button is clicked, validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    // Add Timestamp - future enhancement
    var userData = {
      email: emailInput.val(),
      password: passwordInput.val(),
      userName: usernameInput.val(),
    };

    if (!userData.email || !userData.password || !userData.userName) {
      alert("Invalid Credentials Entered!");
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.userName);
    emailInput.val("");
    passwordInput.val("");
    usernameInput.val("");
  });

  // Does a post to the signup route. If succesful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, userName) {
    $.post("/api/signup", {
      email: email,
      password: password,
      userName:userName
    }).then(function(data) {
      window.location.replace(data);
    }).catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
