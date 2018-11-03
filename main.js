var screamImage = chrome.extension.getURL('scream.png');

$(document).ready(function(){
	
	$('.message').filter(':not(.quickReply)').each(function(i, ele){	
	
		var id = $(ele).attr('id');
		var postId =  parseInt(id.replace( /^\D+/g, ''));
		
		var postRatingInputs = $(ele).find('.dark_postrating_inputlist');
	
		var reactHtml = "<li><img class='screamReact' style='cursor: pointer' src='" + screamImage + "' alt='AHHHHHHHHH' title='AHHHHHHHHH' width='15' height='15'></li>";
		postRatingInputs.append(reactHtml);
		
		var s = $(ele).find('.screamReact');
		
		$(ele).find('.screamReact').click(function(e){
			e.stopPropagation();
			$.ajax({
				type: "get",
				url: "https://chaossnek.com/Screams/AddScream?postId=" + postId,
				dataType: "text",
				success: function(response) {
					if (response) {
						var currentScreams = response;
						if (currentScreams != 0) {
							//check if screams already exist, if so update
							var screams = $('#' + id).find('.screams');
							if (screams.length){
								screams.text(currentScreams);
							}
							else{
								//otherwise add a scream element					
								var postRatingOutputs = $('#' + id).find('.dark_postrating_outputlist');
								var screamsHtml = "<li><img src='" + screamImage + "' alt='AHHHHHHHHH' title='AHHHHHHHHH' width=15 height=15> SCREAMING IN KAGOME x <strong class='screams'>" + currentScreams + "</strong></li>";
								postRatingOutputs.append(screamsHtml);
								postRatingOutputs.toggle().toggle();
							}
						}
					}
				}
			});
		});
		
		$.ajax({
			type: "get",
			url: "https://chaossnek.com/Screams/GetScreams?postId=" + postId,
			dataType: "text",
			success: function(response) { 
				if (response) {
					
					var currentScreams = response;
					
					if (currentScreams != 0) {
						
						var postRatingOutputs = $(ele).find('.dark_postrating_outputlist');

						var screamsHtml = "<li><img src='" + screamImage + "' alt='AHHHHHHHHH' title='AHHHHHHHHH' width=15 height=15> SCREAMING IN KAGOME x <strong class='screams'>" + currentScreams + "</strong></li>";
						postRatingOutputs.append(screamsHtml);
					}
				}
			}
		})
	});
});
