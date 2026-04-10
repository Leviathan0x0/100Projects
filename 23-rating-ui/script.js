// DOM ELEMENTS
const submitBtn = document.querySelector('button');
const ratingBtn = Array.from(document.querySelectorAll("input[type='radio']"));
const ratingDiv = Array.from(document.querySelectorAll('.rating-btn'));
const ratingContainer = document.querySelector('.rating-screen');
const thankYouState = document.querySelector('.ty-state');
const rating = document.querySelector('#rating');

let currentRating = 0;

ratingBtn.forEach((rating) => {
	rating.addEventListener('click', (e) => {
		currentRating = e.target.value;
	});
});

submitBtn.addEventListener('click', (e) => {
	e.preventDefault();
	if (currentRating === 0) return;
	showSuccessState();
});

function showSuccessState() {
	ratingContainer.classList.toggle('hidden');
	thankYouState.classList.toggle('hidden');

	rating.textContent = `${currentRating}`;
}
