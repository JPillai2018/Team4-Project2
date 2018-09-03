function displayImage()
    {
      var queryURL = fetch("https://dog.ceo/api/breeds/image/random");
      $.ajax({
        url: queryURL
          //method: "GET"

      }).then (function(response){
        var status= response.status;
        var imgURL = response.message;

          // Creating an element to hold the image
          var image = $("<img>").attr("src", imgURL);
          
      console.log(processedResponse.message);
          // Appending the image
          doggos.append(image);

      });
      $(document).on('click', ".add-dog",displayImage);

}

/*const DOG_URL = "https://dog.ceo/api/breeds/image/random";

const doggos = document.querySelector(".doggos");

function addNewDoggo() {
  const promise = fetch(DOG_URL);
  promise
    .then(function(response) {
      const processingPromise = response.json();
      return processingPromise;
    })
    .then(function(processedResponse) {
      const img = document.createElement("img");
      img.src = processedResponse.message;
      img.alt = "Cute doggo";
      doggos.appendChild(img);
    });
}
document.querySelector(".add-dog").addEventListener("click", addNewDoggo);*/

      /*fetch('https://dog.ceo/api/breeds/image/random')
    .then(res => res.json())//response type
    .then(data => console.log(data)); //log the data;*/

  /*$(document).on("click", ".dog-button", function() {
    $("#dog").empty();
    $(".dog-button").removeClass("active");
    $(this).addClass("active");

    var type = $(this).attr("data-type");
  
    var queryURL = "https://dog.ceo/api/breeds/list/all";

    $.ajax({
      url: queryURL,
      method: "GET"
      
    })
      .then(function(response) {
        var results = response.data;
        console.log(queryURL);

          console.log(response);
          // storing the data from the AJAX request in the results variable
          var results = response.data;
      }
      });*/



    
