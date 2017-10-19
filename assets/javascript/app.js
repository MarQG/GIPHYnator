$("document").ready(function(){
	var topics = [
		"the walking dead",
		"game of thrones",
		"the arrow",
		"rick and morty",
		"the gifted",
		"riverdale",
		"star trek discovery",
		"the flash",
		"outlander",
		"gotham",
		"supernatural",
		"modern family",
		"bobs burgers",
		"the big bang theory",
		"friends",
		"xfiles",
		"breaking bad",
		"the office"
	];
	var apiKey = "bsbY1NNR6RLAQA6e7ZTrnfJCwcdwIJpV";
	var queryURL = "";

	function buildButtons(){
		$("#topic-buttons").empty();
		for(var i = 0; i < topics.length; i++){
			var color = colorGenerator();
			var topicBtn = $("<button>");
			topicBtn.addClass("topic-btn");
			topicBtn.attr({
				"data-search": topics[i],
			});
			topicBtn.css("border", "1px solid "+color);

			topicBtn.text(topics[i]);
			$("#topic-buttons").append(topicBtn);
		}

		$(".topic-btn").on("click", function(){
			$("#topics").empty();
			queryBuilder($(this).attr("data-search"));
			getImages();
		});
	}
	
	function saveNewTopic(){
		$("#topic-form").submit(function(e){
			e.preventDefault();

			var newTopic = $("#topic-text").val().trim();

			topics.push(newTopic);

			$("#topic-text").val("");
			buildButtons();

		});
	}

	function queryBuilder(topic){
		topic.replace(/ +/g, "+");
    	queryURL = "https://api.giphy.com/v1/gifs/search?q="+ topic +"&limit=10&rating=g&api_key=" + apiKey;
	}

	function colorGenerator(){
		var hsl= "hsla(" + Math.random()*360 + ", 100%, 70%, 1)";
		return hsl 
	}

    
	function getImages(){
		$.ajax({
	      url: queryURL,
	      method: 'GET'
	    }).done(function(response) {
	      	console.log(response);
	      	for(var i = 0; i <response.data.length; i++){
		      	var imgWrapper = $("<div>");
		      	imgWrapper.addClass("gifwrapper");
		      	var rating = $("<p>");
		      	rating.text("Rating: " + response.data[i].rating);
		        var img = $("<img>");
		        img.attr({
		          "data-still": response.data[i].images.fixed_height_still.url,
		          "data-run-img": response.data[i].images.fixed_height.url, 
		        });
		        img.attr("src", img.attr("data-still"));
		        img.addClass("gifs");
		        imgWrapper.append(rating);
		        imgWrapper.append(img)
		        $("#topics").append(imgWrapper);
		      }

		      $(".gifs").on("click", function(){
		        if($(this).attr("src") === $(this).attr("data-still")){
		          $(this).attr("src", $(this).attr("data-run-img"));
		        } else {
		          $(this).attr("src", $(this).attr("data-still"));
		        }
		    });
	    });
	}

	

	buildButtons();
	saveNewTopic();
    
});