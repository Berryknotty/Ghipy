var topics = ['Totoro', 'Studio Ghibli', 'Spirited Away', 'Howls Moving Castle'];
var queryURL = "http://api.giphy.com/v1/gifs/search?q=";
var limit = "&limit=20"
var apiKey = "&api_key=dc6zaTOxFJmzC";


//initial function
function renderGifs() {

	$("#gif-btns").empty();

	for(var i = 0; i < topics.length; i++){
		var a = $("<button>"); 									
		a.addClass('btn btn-default get-gif'); 					
		a.attr("gif-buttons", topics[i]); 						
		a.text(topics[i]); 										
		$("#gif-btns").append(a); 								
	}
}

// user input from the text form to create a new gif button
$(".add-gif").on("click", function(event) {
	event.preventDefault();

	var topic = $("#giphy-input").val().trim(); 				
	topics.push(topic);										
	renderGifs();												
	$(".form-control").val("");
});

// ajax calls to receive the json request from giphy
$(document).on("click", ".get-gif", function() {
	$("#gif-container").empty();

	var gif = $(this).attr("gif-buttons");					

	$.ajax({															
		url: queryURL+gif+apiKey+limit,
		method: 'GET'
	}).done(function(json) {

		for(var i = 0; i < json.data.length; i++){			

		var rating = json.data[i].rating;							
		var p = $("<p>").text("Rating: " + rating);			

		var stillURL = json.data[i].images.fixed_height_still.url;  
		var animateURL = json.data[i].images.fixed_height.url;		

		var gifImg = $("<img>").attr("src", stillURL);  		
		gifImg.attr("data-state", "still");						
		gifImg.attr("data-animate", animateURL);			
		gifImg.addClass("theGif col-md-4");
		$("#gif-container").append(gifImg);						
		}

	}).fail(function(err){									
		console.log(err);
		console.log("System failed to retrieve the requested API");
	});

});


$(document).on("click", ".theGif", function() {					
	var state = $(this).attr("data-state");
	console.log(state);

        if(state === 'still'){
          var url = $(this).attr('src');
          $(this).attr('src', $(this).attr('data-animate'));
          $(this).attr('data-animate', url);
          $(this).attr('data-state', 'animate');
        }else{
          var url = $(this).attr('src');
          $(this).attr('src', $(this).attr('data-animate'));
          $(this).attr('data-animate', url);
          $(this).attr('data-state', 'still');
	};

});



renderGifs();