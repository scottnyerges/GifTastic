// EVENT LISTENER FOR CARTOONBUTTONS
$(document).on("click",".btn", function(event) {
//do something
// In this case, the "this" keyword refers to the button that was clicked
var cartoonChar = $(this).attr("cartoonButtons");
// Constructing a URL to search Giphy for the name of the cartoon character
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
cartoonChar + "&api_key=dc6zaTOxFJmzC&limit=10";
// Performing our AJAX GET request
$.ajax({
url: queryURL,
method: "GET"
})
// After the data comes back from the API
.done(function(response) {
// Storing an array of results in the results variable
var results = response.data;
// Looping over every result item
for (var i = 0; i < 11; i++) {
// Only taking action if the photo has an appropriate rating
if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
// Creating a div with the class "item"
var gifDiv = $("<div class='item'>");
  // Storing the result item's rating
  var rating = results[i].rating;
  // Creating a paragraph tag with the result item's rating
  var p = $("<p>").text("Rating: " + rating);
    // Creating an image tag
    var cartoonImage = $("<img>");
    // Giving the image tag an src attribute of a proprty pulled off the
    // result item
    cartoonImage.attr("src", results[i].images.original_still.url);
    cartoonImage.attr("data-state", "still");
    cartoonImage.attr("data-still", results[i].images.original_still.url);
    cartoonImage.attr("data-animate", results[i].images.original.url);
    cartoonImage.addClass("gif");
    // Appending the paragraph and personImage we created to the "gifDiv" div we created
    gifDiv.append(p);
    gifDiv.append(cartoonImage);
    // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
    $("#cartoons").prepend(gifDiv);
    }
    }
    });
    });
    // // CODE TO LISTEN FOR USER INPUT AT CARTOONINPUT
    $("#addCartoon").on("click", function(event) {
    console.log("#addCartoon");
    event.preventDefault();
    console.log(this);
    // // CODE TO PUSH CARTOONINPUT TO A NEW BUTTON
    var cartoonInput = $("#cartoonInput").val();
    console.log($("#cartoonInput"));
    // CREATE NEW BUTTON WITH NAME FROM CARTOONINPUT
    var newButton = $("<button>")
    newButton.addClass("btn");
    newButton.attr("cartoonButtons", cartoonInput);
    newButton.text(cartoonInput);
    console.log(newButton);
    $("#cartoonButtons").after(newButton);
    });
    // // CODE TO START/STOP THE GIF ANIMATION
    $(document).on("click", ".gif", function(event) {
    var state = $(this).attr("data-state");
    if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
    } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
    }
    });