//Validator function class
function Validator(){
};

Validator.prototype.name="";
Validator.prototype.email="";
Validator.prototype.phone;


//Validats the name if it contains space or alphabets or not
Validator.prototype.validateName = function(){
	var flag = true;
	//alert(this.name);
	if(this.name == ""){
		flag = false;
	}

	if (!(/^[a-zA-Z ]+$/.test(this.name))) {
		flag = false; 
	}
	return flag ; 
}


Validator.prototype.validateEmail = function(){
	var flag = true;
	//alert(this.email);
	if(this.email == ""){
		flag = false;
	}

	if(!(/^\w+([\.-]?\ w+)*@\w+([\.-]?\ w+)*(\.\w{2,3})+$/.test(this.email))){
		flag = false;
	}
	return flag;
}







