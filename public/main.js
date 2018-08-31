
//new user sign in
$(document).ready(function() {
// Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#newEmail");
  var passwordInput = $("input#newPw");
  var newUser = $("input#newName");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) 
  {
    event.preventDefault();
     alert("clicked");

    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      userName: newUser.val().trim()

    };
    console.log("Name: "+userData.userName);
  	console.log("email: "+userData.email);
  	console.log("pw: "+userData.password);

    if (!userData.email || !userData.password || !userData.userName) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.userName);
    //once signed up clear data
    emailInput.val("");
    passwordInput.val("");
    newUser.val("");
  });

    // Does a post to the signup route. If succesful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, username) {
    $.post("/api/loginList", {
      email: email,
      password: password,
      userName:username
    }).then(function(data) {
    	//security so user cannot go back to view previous history
      //window.location.replace(data);
      // If there's an error, handle it by throwing up a boostrap alert
    //will catch email incorrect if no (@ or .com)
    });//.catch(handleLoginErr);
  }

  function handleLoginErr(err) 
  {
  	alert(err.responseJSON);
    //$("#alert .msg").text(err.responseJSON);
    //$("#alert").fadeIn(500);
  }


//login area
// Getting references to our form and inputs
  var loginForm = $("form.login");
  var emailInput = $("input#usernameLogin");
  var passwordInput = $("input#passwordLogin");

// When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    event.preventDefault();
    alert("login clicked");
    var userData = 
    {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
      
    };
    console.log("email: "+userData.email);
    console.log("password: "+userData.password);

    if (!userData.email || !userData.password) {
    	alert("wrong pw!");
      return;
    }
    
    // If we have an email and password we run the loginUser function and clear the form
   // loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
    console.log("hello member with correct email and pw");
  });


 });


