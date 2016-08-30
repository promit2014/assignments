var total_records;
var $paging_ul = $(".pagination");
var $modal_div = $("#myModal");
var $template = $("#row_template");
var template = $("#row_template").html();
var $table_body = $("#table_body");
var start = 0;
var end = 10;
	
$(document).ready(function(){

	
    $("#add_window_btn").on("click", function(){
    	$("#registration_container").slideDown();
    	$("#result_container").slideUp();
	});

	$("#add_cancel_btn").on("click", function(){
    	$("#registration_container").slideUp();
    	$("#result_container").slideDown();
	});

	$paging_ul.delegate("#next", "click",function(){
		if(total_records>(end+10)){
			$table_body.empty();
			start = start + 10;
			end  = end + 10;

			get_page(start,end);
		}
	});

	$paging_ul.delegate("#prev", "click",function(){
		if(0<=(start-10)){
			$table_body.empty();
			start = start - 10;
			end  = end - 10;	

			get_page(start,end);
		}
	});

	$paging_ul.delegate("#end", "click",function(){
		$table_body.empty();
		start =total_records-10;
		end  =total_records;	

		get_page(start,end);
	});


	$paging_ul.delegate("#start", "click",function(){
       	$table_body.empty();
		start =0;
		end  =10;	

		get_page(start,end);
    });

	$paging_ul.delegate("#1_page", "click",function(){
       // /	alert("hello");
       var $1st_page = $("#1_page");
       var incremeneter = 10 * parseInt($1st_page.val());
       start = incremeneter;
       end = incremeneter + 10;
       $table_body.empty();

       get_page(start,end);
    });

    $paging_ul.delegate("#2_page", "click",function(){
       // /	alert("hello");
       var $2nd_page = $("#2_page");
       var incremeneter = 10 * parseInt($2nd_page.val());
       start = incremeneter;
       end = incremeneter + 10;
       $table_body.empty();
       
       get_page(start,end);
    });

    $paging_ul.delegate("#3_page", "click",function(){
       // /	alert("hello");
       var $3rd_page = $("#3_page");
       var incremeneter = 10 * parseInt($3rd_page.val());
       start = incremeneter;
       end = incremeneter + 10;
       $table_body.empty();
       
       get_page(start,end);
    });

    $paging_ul.delegate("#4_page", "click",function(){
       // /	alert("hello");
       var $4th_page = $("#4_page");
       var incremeneter = 10 * parseInt($4th_page.val());
       start = incremeneter;
       end = incremeneter + 10;
       $table_body.empty();
       
       get_page(start,end);
    });

    $paging_ul.delegate("#5_page", "click",function(){
       // /	alert("hello");
       var $5th_page = $("#5_page");
       var incremeneter = 10 * parseInt($5th_page.val());
       start = incremeneter;
       end = incremeneter + 10;
       $table_body.empty();
       
       get_page(start,end);
    });

	get_page(start,end);

}); 



$('body').on('click', '.edit_record',function(){
	//alert($(this).val());
	set_modal_values($(this).val());
	$("#myModal").modal() ;
});

$('body').on('click', '#add_submit_btn', register);
$('body').on('click', '#success_btn', reset);
$('body').on('click','#modal_submit',edit_submit);



$('body').on('click', '.delete_record',function(){

	var temp_total_records ;

	$.ajax({
		url: "http://localhost:8080/people?_start="+0+"&_end="+1, 
		success: function(result , status , res){			
			temp_total_records = parseInt(res.getResponseHeader("X-Total-Count"));
		}
	});


	$.ajax({
    url: 'http://localhost:8080/people/'+$(this).val(),
    type: 'DELETE',
    success: function(result , status , res) {
    	$table_body.empty();
    	if (start > temp_total_records-2) {
    		get_page(start-10,end-10);
    	}else{
    		get_page(start,end);
    	}
    }
});
});


function get_page(start,end){
    $.ajax({
		url: "http://localhost:8080/people?_start="+start+"&_end="+end, 
		success: function(result , status , res){
			
			total_records = parseInt(res.getResponseHeader("X-Total-Count"));
			var temp_total_records = Math.round(total_records / 10) * 10;
			//console.log("total_records ----> "+total_records+" --- temp_total_records ---> "+temp_total_records+" ----- start,end ----> "+start+","+end);
	    	if (temp_total_records<total_records) {
	    		total_records = temp_total_records + 10 ;
	    	}else{
	    		total_records = temp_total_records;
	    	}

	    	for(var i in result){
	    		 var output = Mustache.render(template, result[i]);
	    		 $table_body.append(output); 
	    	}
		}
	});

    page_creator(start);
    page_highlighter(start);
}


function page_creator(start){

	//console.log(start);
	var $pages = $("[id$='_page']");
	var start_page = start-20;
	//console.log(start+" ------> " +start_page);
	if((start>20)&&(start<total_records-20)){
		// alert("hello");
		$pages.each(function () { 
			$(this).attr( 'value',start_page/10);
			//console.log($(this).text()+"-----");
			$(this).find("a").text((start_page/10 + 1));
			start_page = start_page+10;
		}); 
	}else if (start > total_records-30) {
		start_page = total_records - 50 ;
		$pages.each(function () { 
			$(this).attr( 'value',start_page/10);
			//console.log($(this).text()+"----- else if");
			$(this).find("a").text((start_page/10 + 1));
			start_page = start_page+10;
		}); 
	}else if(start == 0){
		start_page = 0;
		$pages.each(function () { 
			$(this).attr( 'value',start_page/10);
			//console.log($(this).text()+"-----");
			$(this).find("a").text((start_page/10 + 1));
			start_page = start_page+10;
		}); 
	}
}

function page_highlighter(start){
	var $pages = $("[id$='_page']");

	if(start == 0 ){
		$("#start").addClass("active");
	}else{
		$("#start").removeClass("active");
	}

	if(start == total_records-10){
		$("#end").addClass("active");
	}else{
		$("#end").removeClass("active");
	}

	$pages.each(function () { 
        if(parseInt($(this).val()) == start/10) {
        	$(this).addClass("active");
        	//console.log($(this).val()+"------ inside"+"-----"+start);
        }else{
        	$(this).removeClass("active");
        }
	}); 
}

function register(){

	var $registration_form = $("#registration_container");
	var name = $registration_form.find("#register_name").val();
	var gender = $('input[name=register_gender]').filter(':checked').val();
	var company = $registration_form.find("#register_company").val();
	var email = $registration_form.find("#register_email").val();
	var phone = $registration_form.find("#register_phone").val();
	var address = $registration_form.find("#register_address").val();
	var validate_flag = true ;

	//console.log("name -----> "+name+"\n gender ----> "+gender+"\n company -----> "+company+"\n email ----->"+email+"\n phone ------>"+phone+"\n address ---->"+address);
	
	if(name == ""){
		$registration_form.find("#register_name").closest("div").addClass("has-error");
		validate_flag = false;
	}else{
		$registration_form.find("#register_name").closest("div").removeClass("has-error");
	}

	if(gender == undefined){
		$registration_form.find("#register_male").closest("div").addClass("has-error");
		validate_flag = false;
	}else{
		$registration_form.find("#register_male").closest("div").removeClass("has-error");
	}	


	if(company == ""){
		$registration_form.find("#register_company").closest("div").addClass("has-error");
		validate_flag = false;
	}else{
		$registration_form.find("#register_company").closest("div").removeClass("has-error");
	}	


	if(email == ""){
		$registration_form.find("#register_email").closest("div").addClass("has-error");
		validate_flag = false;
	}else{
		$registration_form.find("#register_email").closest("div").removeClass("has-error");
	}	

	if(phone == ""){
		$registration_form.find("#register_phone").closest("div").addClass("has-error");
		validate_flag = false;
	}else{
		$registration_form.find("#register_phone").closest("div").removeClass("has-error");
	}	


	if(address == ""){
		$registration_form.find("#register_address").closest("div").addClass("has-error");
		validate_flag = false;
	}else{
		$registration_form.find("#register_address").closest("div").removeClass("has-error");
	}

	if (validate_flag) {
		console.log("fire ajax");
		//creating ajax object
		var add_item = {
						  "name": name,
						  "gender": gender,
						  "company": company,
						  "email": email,
						  "phone": phone,
						  "address": address
						}
		//firing ajax
		$.post("http://localhost:8080/people", 
				add_item, 
				function(result){
					//getting the maximum no of rows and generating the table
				 	$.ajax({
						url: "http://localhost:8080/people?_start="+0+"&_end="+1, 
						success: function(result , status , res){
							
							total_records = parseInt(res.getResponseHeader("X-Total-Count"));
							var temp_total_records = Math.round(total_records / 10) * 10;
							//console.log("total_records ----> "+total_records+" --- temp_total_records ---> "+temp_total_records+" ----- start,end ----> "+start+","+end);
					    	if (temp_total_records<total_records) {
					    		total_records = temp_total_records + 10 ;
					    	}else{
					    		total_records = temp_total_records;
					    	}

					    	start =total_records-10;
							end  =total_records;	
							get_page(start,end);


							$registration_form.find("#register_name").prop('disabled', true);

							$registration_form.find("#register_male").prop('disabled', true);
							$registration_form.find("#register_female").prop('disabled', true);

							$registration_form.find("#register_company").prop('disabled', true);

							$registration_form.find("#register_email").prop('disabled', true);

							$registration_form.find("#register_phone").prop('disabled', true);

							$registration_form.find("#register_address").prop('disabled', true);

							$registration_form.find("#add_submit_btn").removeClass("btn-info");
							$registration_form.find("#add_submit_btn").addClass("btn-success");
							$registration_form.find("#add_submit_btn").text("Added Sucessfully (Click to add Another)");
							$registration_form.find("#add_submit_btn").prop('id',"success_btn");

						}
					});

					$table_body.empty();
					
					$("#registration_container").slideUp();
    				$("#result_container").slideDown();
			    },"json");
		}else{
			console.log("dont fire");
		}

	}


	function reset(){
		$("#register_name").prop('disabled', false);

		$("#register_male").prop('disabled', false);
		$("#register_female").prop('disabled', false);

		$("#register_company").prop('disabled', false);

		$("#register_email").prop('disabled', false);

		$("#register_phone").prop('disabled', false);

		$("#register_address").prop('disabled', false);

		$("#register_male").prop('checked', false);

		$("#register_female").prop('checked', false);

		$("#register_name").val("");
		$("#register_company").val("");
		$("#register_email").val("");
		$("#register_phone").val("");
		$("#register_address").val("");

		$("#success_btn").addClass("btn-info");
		$("#success_btn").removeClass("btn-success");
		$("#success_btn").text("Insert");
		$("#success_btn").prop('id',"add_submit_btn");
	}


	function set_modal_values(id){
		//alert("hello -----> "+id);
		$modal_div.find("#modal_id").val(id)
		
		$.ajax({
				url: "http://localhost:8080/people/"+id, 
				success: function(result , status , res){
					$modal_div.find("#modal_name").val(result.name);
					$modal_div.find("#modal_company").val(result.company);
					$modal_div.find("#modal_email").val(result.email);
					$modal_div.find("#modal_phone").val(result.phone);
					$modal_div.find("#modal_address").val(result.address);

					if (result.gender == "male") {
						$("#modal_male").prop('checked', true);
					}else if(result.gender == "female"){
						$("#modal_female").prop('checked', true);
					}
				}
			});
	}

	function edit_submit(){		

		var $modal_form = $("#myModal");
		var id = $modal_form.find("#modal_id").val();
		var name = $modal_form.find("#modal_name").val();
		var gender = $('input[name=modal_gender]').filter(':checked').val();
		var company = $modal_form.find("#modal_company").val();
		var email = $modal_form.find("#modal_email").val();
		var phone = $modal_form.find("#modal_phone").val();
		var address = $modal_form.find("#modal_address").val();
		var validate_flag = true ;

		//console.log("name -----> "+name+"\n gender ----> "+gender+"\n company -----> "+company+"\n email ----->"+email+"\n phone ------>"+phone+"\n address ---->"+address);
		
		if(name == ""){
			$modal_form.find("#modal_name").closest("div").addClass("has-error");
			validate_flag = false;
		}else{
			$modal_form.find("#modal_name").closest("div").removeClass("has-error");
		}

		if(gender == undefined){
			$modal_form.find("#modal_male").closest("div").addClass("has-error");
			validate_flag = false;
		}else{
			$modal_form.find("#modal_male").closest("div").removeClass("has-error");
		}	


		if(company == ""){
			$modal_form.find("#modal_company").closest("div").addClass("has-error");
			validate_flag = false;
		}else{
			$modal_form.find("#modal_company").closest("div").removeClass("has-error");
		}	


		if(email == ""){
			$modal_form.find("#modal_email").closest("div").addClass("has-error");
			validate_flag = false;
		}else{
			$modal_form.find("#modal_email").closest("div").removeClass("has-error");
		}	

		if(phone == ""){
			$modal_form.find("#modal_phone").closest("div").addClass("has-error");
			validate_flag = false;
		}else{
			$modal_form.find("#modal_phone").closest("div").removeClass("has-error");
		}	


		if(address == ""){
			$modal_form.find("#modal_address").closest("div").addClass("has-error");
			validate_flag = false;
		}else{
			$modal_form.find("#modal_address").closest("div").removeClass("has-error");
		}

		if (validate_flag) {
			console.log("fire ajax");
			//creating ajax object
			var edit_item = {
							  "id":id,
							  "name": name,
							  "gender": gender,
							  "company": company,
							  "email": email,
							  "phone": phone,
							  "address": address
							}
			//firing ajax
				$.ajax({
						    url: "http://localhost:8080/people/"+id,
						    dataType: 'json',
						    type: 'patch',
						    contentType: 'application/json',
						    data: JSON.stringify(edit_item),
						    processData: false,
						    success: function( data, textStatus, jQxhr ){
						        get_page(start,end);
								$table_body.empty();
								$('#myModal').modal('toggle');
						    },
						    error: function( jqXhr, textStatus, errorThrown ){
						        console.log( errorThrown );
						    }
						});

		}else{
			console.log("dont fire");
		}
	}	