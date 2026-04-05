// DOM ELEMENTS
const progressBar = document.getElementById('progressBar');
const badge = document.getElementById('badge');

// EVENT LISTENERS
window.addEventListener('scroll', updateProgressBar);

// FUNCTIONS
function updateProgressBar() {
	const scrollTop = window.scrollY;
	const docHeight = document.documentElement.scrollHeight - window.innerHeight;
	const progress = (scrollTop / docHeight) * 100;

	progressBar.style.width = `${progress}%`;
	badge.textContent = `${Math.floor(progress).toFixed(0)}% read`;

	if (progress >= 100 || progress === 100) {
		badge.classList.add('complete');
		badge.innerHTML = `<i class="fas fa-check"></i> Complete`;
	} else {
		badge.classList.remove('complete');
	}
}

updateProgressBar();
