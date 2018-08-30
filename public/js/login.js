$(document).ready(function() {
  // Getting references to our form and inputs for user login password and email
  console.log("I am here 0");
   var loginForm = $("form.login");
   var emailInput = $("input#email");
   var passwordInput = $("input#password");
   console.log("Email=" + emailInput);
   console.log("password=" + passwordInput);
   //FunctionloginForm passes in the email and password and creates a local storage
   //for user email, updates the logged state to true, and passes the email and
   //password to validate user login.
   loginForm.on("submit", function(event) {
     event.preventDefault();
     var userData = 
     {
       email: emailInput.val(),
       password: passwordInput.val()
     };
     // Checks if Email and Password are valid
     if (!userData.email || !userData.password) {
       return;
     }
     //call login function and put email in local storage
     login();
     //update the login state to true
     updateLogState(userData.email);
     //console.log("Email4=" + userData.email + " Password4=" + userData.password);
     loginUser(userData.email, userData.password);
     //Clear  values on the login Form
     emailInput.val("");
     passwordInput.val("");
   });
 
   // loginUser does a post to our "api/login" route to determine users that are current logged in
   function loginUser(email, password) {
     //console.log("I am here 5");
     $.post("/api/login", 
     {
      email: email,
      password: password
     })
     .then(function(data) {
      window.location.replace(data);
     })
   }
   // Update the database to indicate the user is currently logged in.
   function updateLogState(email) 
   {
    var loginData=
    {
      email:email,
      logged:true
    }
    // Updates the login state of the user.
    $.ajax({
      method : "PUT",
      url : "/api/login",
      data: loginData
    })
   }
 
   // Saving Email/User Id in local storage
   function login() 
   {
     console.log("Saving email in to local storage");
     //Clear current local storage before adding fresh entry
     localStorage.removeItem("PetsTalk");
     //get the user email, store in local storage
     var email = $("#email").val().trim();
     localStorage.setItem("PetsTalk", email);
     //clear the email value
     $('#email').val(''); 
   }
});
 
 