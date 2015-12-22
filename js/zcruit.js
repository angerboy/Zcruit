$(window).load(function() {
	// do any setup when file is loaded
});


/* Add player on click function */
function resolveVariables() {

		// instantiate final variables
		var status;
		var connec;
		var interest;
		var earlyOffer;
		var midOffer;
		var highOffer = 0;
		var medOffer = 0;

		// instantiate intermediate variables
		var sesStatus;
		var numVisits;
		var numOverNightVisits;
		var powerFiveOffer;
		var parentEducationLevel;
		var hasInstConnec;
		var hasLegacy;
		var hasSibling;
		var wasPastProspect;
		var otherTeammates;
		var didAttendCamp;

		// retrieve intermediate variable values
		sesStatus = parseInt(retrieveValueFromRadiosWithName("ses"));
		numVisits = parseInt(retrieveValueFromRadiosWithName("numvisits"));
		numOverNightVisits = parseInt(retrieveValueFromRadiosWithName("overvisits"));
		powerFiveOffer = parseInt(retrieveValueFromRadiosWithName("power5"));
		parentEducationLevel = parseInt(retrieveValueFromRadiosWithName("parenteduc"));
		hasInstConnec = parseInt(retrieveValueFromRadiosWithName("instituteconnec"));
		hasLegacy = parseInt(retrieveValueFromRadiosWithName("legacy"));
		hasSibling = parseInt(retrieveValueFromRadiosWithName("sibling"));
		wasPastProspect = parseInt(retrieveValueFromRadiosWithName("pastprospect"));
		otherTeammates = parseInt(retrieveValueFromRadiosWithName("otherteam"));
		didAttendCamp = parseInt(retrieveValueFromRadiosWithName("camp"));

		// Iterate through other offer checkboxes and increment appropriate variables
		var checkBoxes = document.querySelectorAll("input[type=checkbox]");
		for(var i = 0; i < checkBoxes.length; i++) {
			if(checkBoxes[i].checked) {
				if(checkBoxes[i].value=="top") {
					highOffer++;
				}
				else if(checkBoxes[i].value="mid") {
					medOffer++;
				}
			}
		}

		var inputs = [];

		// calculate final variables from intermediate variables and add to input array

		//status
		if((sesStatus == 1 || sesStatus == 2) || (parentEducationLevel == 1 || parentEducationLevel ==2)) {
			status = 1;
		}
		else {
			status = 0;
		}
		inputs.push(status);

		//connec
		if(Boolean(hasInstConnec || hasSibling || hasLegacy || otherTeammates || wasPastProspect)) {
			connec = 1;
		}
		else {
			connec = 0;
		}
		inputs.push(connec);

		//interest
		if(Boolean(didAttendCamp || numVisits || numOverNightVisits)) {
			interest = 1;
		}
		else {
			interest = 0;
		}
		inputs.push(interest);

		//earlyoffer
		if(powerFiveOffer == 1 || powerFiveOffer == 2) {
			earlyOffer = 1;
		}
		else {
			earlyOffer = 0;
		}
		inputs.push(earlyOffer);

		//midoffer
		if(powerFiveOffer > 2 && powerFiveOffer < 8) {
			midOffer = 1;
		}
		else {
			midOffer = 0;
		}
		inputs.push(midOffer);

		inputs.push(highOffer);
		inputs.push(medOffer);

		calculateProb(inputs);
}

function calculateProb(inputs) {
	console.log("yo");
}

function retrieveValueFromRadiosWithName(name) {
	var radios = document.getElementsByName(name);
	for(var i = 0, length = radios.length; i<length; i++) {
		if(radios[i].checked) {
			return radios[i].value;
		}
	}
	return "0";
}