const adviceBtn = document.querySelector('#advice-btn');
const adviceId = document.querySelector('.advice-id');
const adviceText = document.querySelector('.advice');

const BASE_URL = 'https://api.adviceslip.com/advice';

adviceBtn.addEventListener('click', () => {
	adviceBtn.innerHTML = `<i class="fa-solid fa-spinner"></i>`;
	getAdvice();
});

async function getAdvice() {
	try {
		const res = await fetch(BASE_URL);
		const data = await res.json();

		adviceText.textContent = `"${data.slip.advice}"`;
		adviceId.textContent = `ADVICE #${data.slip.id}`;
	} catch (e) {
		throw new Error(e);
	}

	adviceBtn.innerHTML = `<img src="images/icon-dice.svg" alt="Dice"/>`;
}

getAdvice();
