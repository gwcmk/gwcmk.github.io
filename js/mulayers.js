	window.onload = function(){
	var testData = [
	        {
	         description: "Sample at 0:00 to 0:46",
	         url: "https://embed.spotify.com/?uri=spotify:track:6VGCcBYu4WoRalMLNanCk3",
	         times: [{ "label":"Jimmy Smith", "starting_time": 1406851200000, "ending_time": 1406851235000}]
	     	},
	        {
	         description: "Sample at 0:25<br /><br />Ellie Goulding's tweet about it:" +'<blockquote class="twitter-tweet" lang="en"><p>Honestly been trying to play it cool but Drake and Jay Z sampled me on Pound Cake</p>&mdash; Ellie Goulding (@elliegoulding) <a href="https://twitter.com/elliegoulding/status/382095637145456640">September 23, 2013</a></blockquote>', 
	         url: "https://embed.spotify.com/?uri=spotify:track:4L2c5iIVqb10OlI2mdkrkf", 
	         times: [{ "label":"Ellie Goulding", "starting_time": 1406851235000, "ending_time": 1406851451000}]
	     	},
	        {
	         description: "Sample at 0:21<br />The classic hook is from this song by the Wu Tang Clan, but the scratched sample in <em>Pound Cake</em> is recited by Timbaland.", 
	         url: "https://embed.spotify.com/?uri=spotify:track:119c93MHjrDLJTApCVGpvx", 
	         times: [{"label":"Wu Tang", "starting_time": 1406851221000, "ending_time": 1406851226000}]
	    	},
	    	{
	    		description: '"Pound Cake" / "Paris Morton Music 2" is a track by Canadian rapper Drake from his third studio album Nothing Was the Same (2013). The track consists of two songs, "Pound Cake" featuring a guest appearance by Jay-Z, and "Paris Morton Music 2" a sequel to "Paris Morton Music". The track serves as the outro to the standard edition of Nothing Was the Same.',
	    		url: "http://www.youtube.com/embed/lF7C8NFzAGQ",
	    		times: [{"label":"Pound Cake", "starting_time": 1406851200000, "ending_time": 1406851451000}, {"label":"Paris Morton Music 2", "starting_time": 1406851451000, "ending_time": 1406851634000}]
	    	}
	      ];

  	var width = $(window).width() * 0.6;
  	var currentChart;
	function init() {
		// Generate the d3 chart
		var formatTime = d3.time.format("%M" + ":" + "%S"),
            formatMinutes = function(d) { return formatTime(new Date(2012, 0, 1, 0, 0, 0, d)); }; 
		var chart = d3.timeline()
					.itemHeight(30)
					.stack()
					.relativeTime()
					.tickFormat({
			            format: formatMinutes,
			            tickTime: d3.time.minutes,
			            tickInterval: 1,
			            tickSize: 0.5,
			          })
					.click(function (d, i, datum){
						$('.item-video div.embed-responsive').find('.embed-video').attr("src", datum.url);
						$('.item-details').empty();
						$('.item-details').append("<h3><span>" + datum.times[0].label + "</span></h3><br />");
						$('.item-details').append(datum.description);
					})
		currentChart = chart;
		var svg = d3.select("#timeline1").append("svg").attr("width", width)
		  .datum(testData).call(chart);

		// Generate the top and bottom panel
		// Do this with Rails in the real app
		var paragraph = '"Pound Cake" / "Paris Morton Music 2" is a track by Canadian rapper Drake from his third studio album Nothing Was the Same (2013). The track consists of two songs, "Pound Cake" featuring a guest appearance by Jay-Z, and "Paris Morton Music 2" a sequel to "Paris Morton Music". The track serves as the outro to the standard edition of Nothing Was the Same.';

		$('.song-video div.embed-responsive').find('.embed-video').attr("src", "http://www.youtube.com/embed/91kAcT6HffA");
		$('.song-details').append("<h3><span>Pound Cake / Paris Morton Music 2</span></h3><br />");
		$('.song-details').append(paragraph);

		$('.item-video div.embed-responsive').find('.embed-video').attr("src", testData[0].url);
		$('.item-details').append("<h3><span>" + testData[0].times[0].label + "</span></h3><br />");
		$('.item-details').append(testData[0].description);
	}


  //responsive in case window is resized
  $(window).resize(function() {
  		width = $(window).width() * 0.6;
    	$("#timeline1").empty("svg");
  		console.log("removed");
  		currentChart.width(width);
    	d3.select("#timeline1").append("svg").attr("width", width).datum(testData).call(currentChart);
    	fixRectWidth();
  })

  //temporary fix
  //need to adjust the rect when the text width is greater than the rect width
  function fixRectWidth() {
  	var rectangles = $("rect").get();
  	for(var i = 0; i < rectangles.length; i++){
  		console.log(i);
  		rectangles[i].setAttributeNS(null, 'rx', '5');
  		if(rectangles[i].getBBox().width < 100){
  			rectangles[i].setAttributeNS(null, 'width', '100');
  		}
  	}

  }

  //run functions
  init();
  fixRectWidth();
  
}