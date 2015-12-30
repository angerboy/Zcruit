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
		console.log("SES STATUS: " + sesStatus);
		numVisits = parseInt(retrieveValueFromRadiosWithName("numvisits"));
		console.log("NUM VISITS: " + numVisits);
		numOverNightVisits = parseInt(retrieveValueFromRadiosWithName("overvisits"));
		console.log("NUM OVER VISITS: " + numOverNightVisits);
		powerFiveOffer = parseInt(retrieveValueFromRadiosWithName("power5"));
		console.log("POWER 5 OFFER: " + powerFiveOffer);
		parentEducationLevel = parseInt(retrieveValueFromRadiosWithName("parenteduc"));
		console.log("PARENT EDUC: " + parentEducationLevel);
		hasInstConnec = parseInt(retrieveValueFromRadiosWithName("instituteconnec"));
		console.log("INSTITUTE CONNEC: " + hasInstConnec);
		hasLegacy = parseInt(retrieveValueFromRadiosWithName("legacy"));
		console.log("LEGACY: " + hasLegacy);
		hasSibling = parseInt(retrieveValueFromRadiosWithName("sibling"));
		console.log("HAS SIBLING: " + hasSibling);
		wasPastProspect = parseInt(retrieveValueFromRadiosWithName("pastprospect"));
		console.log("PAST PROSPECT: " + wasPastProspect);
		otherTeammates = parseInt(retrieveValueFromRadiosWithName("otherteam"));
		console.log("OTHER TEAMMATE: " + otherTeammates);
		didAttendCamp = parseInt(retrieveValueFromRadiosWithName("camp"));
		console.log("CAMP: " + didAttendCamp);

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

		console.log("HIGH OFFERS: " + highOffer);
		console.log("MED OFFERS: " + medOffer);

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
		if(powerFiveOffer == 0 || powerFiveOffer == 1) {
			earlyOffer = 1;
		}
		else {
			earlyOffer = 0;
		}
		inputs.push(earlyOffer);

		//midoffer
		/*if(powerFiveOffer > 1 && powerFiveOffer < 8) {
			midOffer = 1;
		}
		else {
			midOffer = 0;
		}
		inputs.push(midOffer);
		*/

		inputs.push(highOffer);
		inputs.push(medOffer);

		calculateProb(inputs);
}

function calculateProb(inputs) {
	// hard code coeffs - perhaps parse backend later
	var B_0 = -2.965899;
	var B_status = .9595554;
	var B_connec = 1.181285;
	var B_interest = 2.140839;
	var B_earlyoffer = .7091033;
	var B_highoffer = -.515487;
	var B_medoffer = -.2805989;

	var sum = -1 *( B_0 + (B_status*inputs[0]) + (B_connec*inputs[1]) + (B_interest*inputs[2]) + (B_earlyoffer*inputs[3]) + (B_highoffer*inputs[4]) + (B_medoffer*inputs[5]));

	prob = (1 / (1 + Math.pow(Math.E, sum)));
	console.log(prob);

	// append result to table
	var table = document.getElementById("resultsTable");
	var row = table.insertRow(1);
	var firstNameCell = row.insertCell(0);
	var lastNameCell = row.insertCell(1);
	var probCell = row.insertCell(2);

	var nameInput = document.getElementById("inputName");
	firstNameCell.innerHTML = nameInput.value;

	probCell.innerHTML = prob;
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