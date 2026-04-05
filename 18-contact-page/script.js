// DOM ELEMENTS
const form = document.getElementById('contact-form');
const successState = document.getElementById('success');
const resetBtn = document.getElementById('reset-btn');
const submitBtn = form.querySelector('.submit-btn');

// EVENT LISTENERS
form.addEventListener('submit', (e) => {
	e.preventDefault();

	submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
	submitBtn.disabled = true;

	setTimeout(() => {
		form.classList.add('hidden');
		successState.classList.remove('hidden');
	}, 2000);
});

resetBtn.addEventListener('click', () => {
	form.reset();
	form.classList.remove('hidden');
	successState.classList.add('hidden');

	submitBtn.innerHTML = '<span>Send Message</span><i class="fa-solid fa-arrow-right"></i>';
	submitBtn.disabled = false;
});
