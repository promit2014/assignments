describe("Validation Tester",function(){
	var validator ;

	beforeEach(function(){
		validator = new Validator();
	});

	it("1. Checks whether name field empty test is successfull or not",function(){
		validator.name = "";
		expect(validator.validateName()).toEqual(false);

		validator.name = "asd";
		expect(validator.validateName()).toEqual(true);
	});

	it("2. Checks whether name supports spaces in between or not",function(){
		validator.name = "name";
		expect(validator.validateName()).toEqual(true);

		validator.name = "names test";
		expect(validator.validateName()).toEqual(true);
	});

	it("3. Checks whether name contains any character other than combination of alphabet and space",function(){
		validator.name = "name2";
		expect(validator.validateName()).toEqual(false);

		validator.name = "names test2";
		expect(validator.validateName()).toEqual(false);
	});

	it("4. Checks whether email field contains blank or not",function(){
		validator.email = "";
		expect(validator.validateEmail()).toEqual(false);

		validator.email = "a@a.com";
		expect(validator.validateEmail()).toEqual(true);
	});

	it("5. Checks whether email contains exactly email value or not with an @ and a . in between",function(){
		validator.email = "test.com"
		expect(validator.validateEmail()).toEqual(false);

		validator.email = "test@testcom"
		expect(validator.validateEmail()).toEqual(false);

		validator.email = "test@test.com"
		expect(validator.validateEmail()).toEqual(true);
	});

});