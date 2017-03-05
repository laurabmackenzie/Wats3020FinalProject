/*if user clicks "more" button, show full thumbnail grid on mobile devices*/
$( document ).ready(function() {

$('#showall').click(function() {
  $('#somecupcakes').hide();
  $('#allcupcakes').show();
});
  
  
  
$('.thumbnail').click(function() {
  $('#testingcupcake').html(" <a href='' class='thumbnail'><img class='img-responsive' src='design/gridcupcake2.jpg' alt='Cupcaketest'>" + $(this).attr('data-flavor') + "</a>")
})
})


function GetCalendar() {
	var calendarURL = "https://www.googleapis.com/calendar/v3/calendars/5rccpgjq8n4ggv8mu5ccnuoq8g@group.calendar.google.com/events?key=AIzaSyDpSna7bpXe6-sqQGYc1pwN6KNHVgzUs6Y";
	//Use jQuery ajax function to get JSON URL 
	$.ajax( calendarURL )
		//if successful, call this function with the data from the 
		//calendar URL
		.done(function(data) {
			//create a new Bootstrap column using bootstrap div
			var list = $("#location");
      //loop through the calendar items returned
			data.items.forEach(function(item) {
				//for each one, create a new row
				var listItem = $('<div class="row">');
				//add the date of the event and description using bootstrap columns
				//note, used date.format.js to pretty up the date
				$(listItem).html('<div class="col-sm-6 place">' + item.summary + "</div>" + "<div class='col-sm-6 date'>" + dateFormat(item.start.dateTime, "dddd, mmmm dS, yyyy, h:MM TT") + "</div>"); 
        //add the new columns to the row we made above
				$(list).append(listItem);
			});

			//add the full row to the 
			//element on the page with an id of 'calendar'
			//$('#calendar').append(list);
		})		
		//if the request doesn't work, display a bootstrap styled message
		.fail(function() {
			$('#location').html("<div class='alert alert-warning'>Request for Calendar Data failed!<br>Refresh the page to try again</div>");
		});
}


$(document).ready(function() {
  GetCalendar();
});

