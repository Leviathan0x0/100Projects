// DOM ELEMENTS
const converterForm = document.getElementById('converter-form');
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const amountInput = document.getElementById('amount');
const resultDiv = document.getElementById('result');

// EVENT LISTENERS
window.addEventListener('load', fetchCurrencies);
converterForm.addEventListener('submit', convertCurrency);

// FUNCTIONS
async function fetchCurrencies() {
	const res = await fetch('https://v6.exchangerate-api.com/v6/beaaf262349f19a6c727f66f/latest/USD');
	const data = await res.json();

	const currencyOptions = Object.keys(data.conversion_rates);
	currencyOptions.forEach((currency) => {
		const option1 = document.createElement('option');
		option1.value = currency;
		option1.textContent = currency;
		fromCurrency.appendChild(option1);

		const option2 = document.createElement('option');
		option2.value = currency;
		option2.textContent = currency;
		toCurrency.appendChild(option2);
	});
}

async function convertCurrency(e) {
	e.preventDefault();
	const from = fromCurrency.value;
	const to = toCurrency.value;
	const amount = parseFloat(amountInput.value);

	if (amount <= 0) {
		alert('Amount must be greater than 0.');
		return;
	}

	const res = await fetch(`https://v6.exchangerate-api.com/v6/beaaf262349f19a6c727f66f/latest/${from}`);
	const data = await res.json();

	const rate = data.conversion_rates[to];
	const convertedAmount = (amount * rate).toFixed(2);

	resultDiv.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
}
