$(window).load(function() {
	// do any setup when file is loaded
});


/* Add player on click function */
function calcProbs() {

		// instantiate variables
		var sesStatus;

		// retrieve groups of radio buttons 
		var sesRadios = document.getElementsByName("ses");

		// find checked values 
		for(var i = 0, length = sesRadios.length; i < length; i++) {
			if(sesRadios[i].checked) {
				sesStatus = parseInt(sesRadios[i].value);
				break;
			}
		}

		console.log(sesStatus);

}