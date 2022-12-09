"use strict"

const clearPrompts = () => {
	$(".form-control").each((n, control) => {
		$(control).next().text("");
	});
}


$(document).ready(function () {

	$(function () {

		$("#tabs").tabs();
		$("#tabs-2").focus();

	});


	$("#application_form").submit((evt) => {

		var isValid = true;
		let msg;
		clearPrompts();

		$(".form-control").each((n, control) => {
			var val = $(control).val().trim();
			if (isValid == true && val == "") {
				isValid = false;
				alert("Please fill all the required fields");
			}
		});

		if (($("#licenseno").val() != "") && ($("#licenseno").val().length != 8)) {
			isValid = false;
			alert("License Number should be 8 characters long");
			$("#licenseno").focus();
		}

		if (isNaN($("#vehicleyear").val())) {
			isValid = false;
			alert("Year should be a number");
			$("#vehicleyear").focus();
		}

		if (($("#age").val() != "") && ($("#age").val() < 16)) {
			isValid = false;
			alert("You should be atleast 16 years old inorder to apply for license");
			$("#age").focus();

		}

		if ($("#dob").val() != "") {

			const minAge = new Date(Date.now() - 504910816000);

			const birthdate = new Date($("#dob").val());

			if (birthdate > minAge) {
				isValid = false;
				alert("You are not equal or older than 16 years old according to your birth date. You should be atleast 16 years old inorder to apply for license");
				$("#dob").focus();
			}


		}


		if (!isValid) {
			evt.preventDefault();
		}
	});


	$("#signup_form").submit((evt) => {

		var isValidd = true;

		if ($("#password").val() != $("#reenter_password").val()) {
			isValidd = false;
			alert("Passwords are not matching! Please enter the password again");
			$("#reenter_password").focus();
		}

		if (!isValidd) {
			evt.preventDefault();
		}
	});


});

$("#drpBtn").on('click', function () {
	document.getElementById('myDropdown').classList.toggle("show");
})

$("#appointmentdate").on('change', function () {
	location.href = '/appointment/time/' + $("#appointmentdate").val();
})


$("#testDate").on('change', function () {
	location.href = '/g2/booktime/' + $("#testDate").val();
})

$("#gTestDate").on('change', function () {
	location.href = '/g/booktime/' + $("#gTestDate").val();
})


// document.getElementById("disss").disabled = true;
// document.getElementById('searchbylicense').onclick = (evt) => {

// 	document.getElementById('searchbylicense').setAttribute('href', '/G/'+ $("#license_no_input").val());
// }

// document.getElementById("license_no_input")
//     .addEventListener("keyup", function(event) {
//     event.preventDefault();
//     if (event.key === 'Enter') {
//         document.getElementById("searchbylicense").click();
//     }
// });

// document.getElementById('clearresults').onclick = (evt) => {

// 	document.getElementById('clearresults').setAttribute('href', '/G/');
// }
