$(document).ready(function(){


	$('#searcher').on('click', init_search);

});


function init_search() {
		//alert($movie_title.val());
		var $movie_title = $('#title');

		var template = "<div class=\"panel panel-danger\">"
			+"<div class=\"panel-heading\">"
				+"{{Title}}"
			+"</div>"
			+"<div class=\"panel-body\">"
				+"<table class=\"table table-hover\">"
				    +"<tbody>"
				      +"<tr>"
				        +"<td>Year</td>"
				        +"<td>{{Year}}</td>"
				      +"</tr>"
				      +"<tr>"
				        +"<td>imdbID</td>"
				        +"<td>{{imdbID}}</td>"
				      +"</tr>"
				      +"<tr>"
				        +"<td>Type</td>"
				        +"<td>{{Type}}</td>"
				      +"</tr>"
				      +"<tr>"
				        +"<td>Poster</td>"
				        +"<td><img class=\"img-rounded img-responsive movie_thumbnail\" src=\"{{Poster}}\"></td>"
				      +"</tr>"
				    +"</tbody>"
			  	+"</table>"
			+"</div>"
		+"</div>";

		if($movie_title.val() == ''){
			$('#table_container').hide();
			$('#error_displayer .panel-heading').text("Error");
			$('#error_displayer .panel-body').text("Cannot Search with Empty Value");
			$('#error_displayer').show();
		}else{
			$('#error_displayer').hide();
			$.ajax({
				url: "http://www.omdbapi.com/?s=" + $movie_title.val(), 
				success: function(result){
		        	if(result.Response == "True"){
		        		$('#table_container').show();
		        	//	$('#div1').text(result.Search);
		        		$('#table_container').html("");
		        	//	$('#table_container').append(template);
		        		for (var i = 0; i <= result.Search.length; i++) {
		        			var html = Mustache.to_html(template, result.Search[i]);
		        			$('#table_container').append(html);
		        		}
		        	}else{
		        		$('#table_container').hide();
						$('#error_displayer .panel-heading').text("Not Found");
						$('#error_displayer .panel-body').text("Cannot find a movie with Given Name");
						$('#error_displayer').show();
		        	}
		    	}
			});
		}

	}