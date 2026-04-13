const submitBtn = document.getElementById('sub-btn');
const emailInput = document.getElementById('email');
const errorMsg = document.querySelector('.error-msg');
const dismissBtn = document.getElementById('dismiss-btn');
const mainContainer = document.querySelector('.main-content');
const successState = document.querySelector('.success');
const formGroup = document.querySelector('.form-group');
const imgContainer = document.querySelector('.img-container');
const emailAddress = document.querySelector('#email-address');

submitBtn.addEventListener('click', (e) => {
	e.preventDefault();
	if (!validateInput()) return;

	formGroup.classList.remove('error');
	submitBtn.disabled = true;
	showSuccess();
});

dismissBtn.addEventListener('click', () => {
	window.location.reload();
});

function validateInput() {
	if (!emailInput.value.trim()) {
		showError('This field is required.');
		return false;
	}

	const regex =
		/([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[ \t -Z^-~]*])/;

	if (!regex.test(emailInput.value.trim())) {
		showError('Valid email required.');
		return false;
	}

	return true;
}

function showError(message) {
	formGroup.classList.add('error');
	errorMsg.textContent = message;
}

function showSuccess() {
	setTimeout(() => {
		mainContainer.classList.add('hidden');
		imgContainer.classList.add('hidden');
		successState.classList.remove('hidden');
		emailAddress.textContent = emailInput.value;
	}, 1000);
}
