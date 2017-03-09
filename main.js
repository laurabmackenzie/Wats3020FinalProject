/*if user clicks "more" button, show full thumbnail grid on mobile devices*/
$(document).ready(function() {

	// Add scrollspy to <body>
	$('body').scrollspy({
		target: "navbar",
		offset: 50
	});

	// Add smooth scrolling on all links inside the navbar
	$("#myNavbar a, #footerlinks a").on('click', function(event) {

		// Make sure this.hash has a value before overriding default behavior
		if (this.hash !== "") {

			// Prevent default anchor click behavior
			event.preventDefault();

			// Store hash
			var hash = this.hash;

			// Using jQuery's animate() method to add smooth page scroll
			// The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 800, function() {

				// Add hash (#) to URL when done scrolling (default click behavior)
				window.location.hash = hash;
			});

		} // End if

	});
	
	//click event for showing and hiding additional cupcakes in mobile version
	$('#showall').click(function() {
		$('#somecupcakes').hide();
		$('#allcupcakes').show();
	});
	
	$('#showless').click(function() {
		$('#allcupcakes').hide();
		$('#somecupcakes').show();
	});

//click event for modal window displaying additional information.
	$('.thumbnail').click(function() {
		$('#testingcupcake').html(" <a class='thumbnail'><img class='img-responsive' src='design/gridcupcake2.jpg' alt='Cupcaketest'>" + $(this).attr('data-flavor') + "<br>" +  $(this).attr('data-desc') + "</a>")
	})
})

//click event for showing and hiding extra date and location information.
$('#show10').click(function() {
	$('#location').empty();
	GetCalendar(10);
	$('#show10').hide();
	$('#show5').show();
});

$('#show5').click(function() {
  $('#location').empty();
	GetCalendar(5);
	$('#show5').hide();
	$('#show10').show();
});


//Get up to date calendar information from Google Calendar API
function GetCalendar(maxItems) {
	var calendarURL = "https://www.googleapis.com/calendar/v3/calendars/5rccpgjq8n4ggv8mu5ccnuoq8g@group.calendar.google.com/events?key=AIzaSyDpSna7bpXe6-sqQGYc1pwN6KNHVgzUs6Y";
	//Use jQuery ajax function to get JSON URL 
	$.ajax(calendarURL)
		//if successful, call this function with the data from the 
		//calendar URL
		.done(function(data) {
			//create a new Bootstrap column using bootstrap div
			var list = $("#location");
			//loop through the calendar items returned
			
			var numItems = data.items.length;
			
			for (var i=0; i < numItems && i < maxItems; i++) {
				var item = data.items[i];
				//for each one, create a new row
				var listItem = $('<div class="row">');
				//add the date of the event and description using bootstrap columns
				//note, used date.format.js to pretty up the date
				$(listItem).html('<div class="col-sm-6 place">' + item.summary + "</div>" + "<div class='col-sm-6 date'>" + dateFormat(item.start.dateTime, "dddd, mmmm dS, yyyy, h:MM TT") + "</div>");
				//add the new columns to the row we made above
				$(list).append(listItem);
			}

			//add the full row to the 
			//element on the page with an id of 'calendar'
			//$('#calendar').append(list);
		})
		//if the request doesn't work, display a bootstrap styled message
		.fail(function() {
			$('#location').html("<div class='alert alert-warning'>Request for Calendar Data failed!<br>Refresh the page to try again</div>");
		});
}

//ready handler retrieves 5 calendar entries on page load.
$(document).ready(function() {
		$('#show5').hide();
		GetCalendar(5);
});