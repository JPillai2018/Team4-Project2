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
    console.log("I am here 1");
    var userData = 
    {
      email: emailInput.val(),
      password: passwordInput.val()
    };
    //if email or password not submitted jump out of the function
    console.log("I am here 2");
    if (!userData.email || !userData.password) {
      return;
    }
    //call login function and put email in local storage
    console.log("I am here 3");
    login();
    //update the login state to true
    updateLogState(userData.email);
    //if valid email and password go ahead and pass to loginUser function
    console.log("I am here 4");
    console.log("Email4=" + userData.email + " Password4=" + userData.password);
    loginUser(userData.email, userData.password);
    //clear out the values after logged in
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route to determine users that are current logged in
  function loginUser(email, password) {
    console.log("I am here 5");
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
    //calling ajax call to update the login state of the user then get the updated data from api call
  $.ajax({
    method : "PUT",
    url : "/api/login",
    data: loginData
  })
  // .then(getUpdate);
  }

  // function updateLogState(email) 
  // {
  // //update logged state to true
  //   var updatelog=
  //   {
  //     email:email
  //   }

  // /// do the update for logged= true
  // $.ajax({
  //   method : "PUT",
  //   url : "/api/login",
  //   data: updatelog
  // }).then(getUpdate);
  // }
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
//function getUpdate updates the user's setting once the user updates their 
//personal information
// function getUpdate() {
//   $.get("/api/update/", function(res) {
//     updateArr = res;
//   })
// }
});

