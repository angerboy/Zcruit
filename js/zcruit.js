$(window).load(function() {
	// do any setup when file is loaded
});


/* Add player on click function */
function calcProbs() {

		// instantiate final variables
		var status;
		var connec;
		var interest;
		var earlyOffer;
		var midOffer;
		var highOffer;
		var medOffer;

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
		var numTopOffers;
		var numMidOffers;

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

}

function retrieveValueFromRadiosWithName(name) {
	var radios = document.getElementsByName(name);
	for(var i = 0, length = radios.length; i<length; i++) {
		if(radios[i].checked) {
			return radios[i].value;
		}
	}
	return "NO_VALUE_PROVIDED";
}