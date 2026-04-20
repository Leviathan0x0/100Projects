const numbers = document.querySelectorAll('.number');
const calculator = document.querySelector('.calculator');
const themeToggle = document.querySelector('.theme-toggle');
const resultInput = document.querySelector('.result');
const arithmeticSymbols = document.querySelectorAll('.operations');
const equalBtn = document.querySelector('#equal');
const calculation = document.querySelector('.calculation');
const allClear = document.querySelector('.all-clear');
const backspace = document.querySelector('.backspace');
const clear = document.querySelector('.clear');

clear.addEventListener('click', () => (resultInput.value = ''));

allClear.addEventListener('click', () => {
	resultInput.value = '';
	calculation.textContent = '';
});

backspace.addEventListener('click', () => {
	resultInput.value = resultInput.value.slice(0, -1);
});

themeToggle.addEventListener('click', () => {
	if (calculator.classList.contains('dark')) {
		calculator.classList.remove('dark');
		calculator.classList.add('light');
	} else {
		calculator.classList.remove('light');
		calculator.classList.add('dark');
	}
});

numbers.forEach((number) => {
	number.addEventListener('click', (e) => {
		addBrackets();
		displayCharacters(e);
	});
});

equalBtn.addEventListener('click', () => {
	const findOperationInString = /([\+\-\×\÷\%])/g;
	const lastCharacter = resultInput.value.at(-1);
	const isLastCharacterOper =
		lastCharacter === '-' || lastCharacter === '+' || lastCharacter === '×' || lastCharacter === '÷' || lastCharacter === '%';

	if (!findOperationInString.test(resultInput.value) || isLastCharacterOper) return;
	compute();
});

// ×÷

arithmeticSymbols.forEach((operation) => {
	operation.addEventListener('click', (e) => {
		const lastCharacter = resultInput.value.at(-1);
		const secondLastChar = resultInput.value.at(-2);
		const isSecondLastCharOperator = secondLastChar === '-' || secondLastChar === '+' || secondLastChar === '×' || secondLastChar === '÷';

		if (resultInput.value === '') return;
		if (lastCharacter === e.target.textContent && e.target.textContent !== '-') return;
		if (lastCharacter === '+' && (e.target.textContent === '×' || e.target.textContent === '÷')) return;
		if (lastCharacter === '×' && (e.target.textContent === '+' || e.target.textContent === '÷')) return;
		if (lastCharacter === '÷' && (e.target.textContent === '×' || e.target.textContent === '+')) return;

		// Prevent ANY other sign after a minus sign
		if (lastCharacter === '-' && e.target.textContent !== '-') return;

		// Prevent three minus signs in a row, or a minus sign after another operator and a minus sign (e.g., ×--)
		if (isSecondLastCharOperator && lastCharacter === '-' && e.target.textContent === '-') return;

		addBrackets();
		displayCharacters(e);
	});
});
function addBrackets() {
	let currentInputValue = resultInput.valueZ
	if (
		currentInputValue.at(-2) === '-' &&
		(currentInputValue.at(-3) === '×' || currentInputValue.at(-3) === '÷' || currentInputValue.at(-3) === '+' || currentInputValue.at(-3) === '-')
	) {
		resultInput.value = currentInputValue.slice(0, -2) + '(' + currentInputValue.slice(-2);
		resultInput.value += ')';
	}
}

function displayCharacters(e) {
	if (e.target.classList.contains('number') && resultInput.value.endsWith(')')) {
		resultInput.value = resultInput.value.slice(0, -1) + e.target.textContent + ')';
	} else {
		resultInput.value += e.target.textContent;
	}
}

async function compute() {
	calculation.textContent = resultInput.value;

	const findOperationInString = /([\+\-\×\÷\%])/g;
	calculation.innerHTML = calculation.textContent.replace(findOperationInString, ' <span class="inputOperation">$1</span> ');

	try {
		let expression = resultInput.value.replace(/×/g, '*').replace(/÷/g, '/').replace(/%/g, '/100');
		let result = eval(expression);
		if (Number.isInteger(result)) {
			resultInput.value = result;
		} else resultInput.value = result.toFixed(2);
	} catch (error) {
		resultInput.value = 'Error';
	}
}
