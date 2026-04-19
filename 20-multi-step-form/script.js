// DOM ELEMENTS
const steps = Array.from(document.querySelectorAll('.form-step'));
const nextBtn = document.getElementById('btn-next');
const prevBtn = document.getElementById('btn-prev');
const submitBtn = document.getElementById('btn-submit');
const stepIndicators = Array.from(document.querySelectorAll('.step'));
const billingSwitch = document.getElementById('billing-switch');
const formFooter = document.querySelector('.form-footer');
const changePlan = document.getElementById('change-plan');

nextBtn.addEventListener('click', (e) => {
	if (currentStep === 0 && !validateFields()) return;

	currentStep++;
	updateFormSteps();
});

prevBtn.addEventListener('click', (e) => {
	currentStep--;
	updateFormSteps();
});

submitBtn.addEventListener('click', (e) => {
	e.preventDefault();
	currentStep++;
	updateFormSteps();
});

billingSwitch.addEventListener('change', updateBilling);

changePlan.addEventListener('click', (e) => {
	currentStep = 1;
	updateFormSteps();
});

let currentStep = 0;
let isYearly = false;

const planPrices = {
	arcade: { monthly: 9, yearly: 90 },
	advanced: { monthly: 12, yearly: 120 },
	pro: { monthly: 15, yearly: 150 },
};

const addonPrices = {
	'Online service': { monthly: 1, yearly: 10 },
	'Larger storage': { monthly: 2, yearly: 20 },
	'Customizable profile': { monthly: 2, yearly: 20 },
};

function updateFormSteps() {
	if (currentStep >= steps.length) return;

	steps.forEach((step, index) => {
		step.classList.toggle('active', index === currentStep);
		step.classList.toggle('hidden', index !== currentStep);
	});

	if (currentStep < 4) {
		stepIndicators.forEach((stepIndicator, index) => {
			stepIndicator.classList.toggle('active', index === currentStep);
		});
	}

	if (currentStep === steps.length - 1) {
		formFooter.classList.add('hidden');
		return;
	}

	if (currentStep === 0) {
		prevBtn.classList.add('hidden');
	} else {
		prevBtn.classList.remove('hidden');
	}

	if (currentStep === 3) {
		nextBtn.classList.add('hidden');
		submitBtn.classList.remove('hidden');
		updateSummary();
	} else {
		nextBtn.classList.remove('hidden');
		submitBtn.classList.add('hidden');
	}
}

function validateFields() {
	let isValid = true;
	const inputs = ['name', 'email', 'phone'];

	inputs.forEach((id) => {
		const input = document.getElementById(id);
		const group = input.closest('.form-group');

		if (!input.value.trim()) {
			group.classList.add('error');
			isValid = false;
		} else {
			group.classList.remove('error');
		}
	});

	const email = document.getElementById('email');
	if (email.value && !email.value.includes('@')) {
		email.closest('.form-group').classList.add('error');
		isValid = false;
	}

	return isValid;
}

function updateBilling() {
	isYearly = billingSwitch.checked;

	document.querySelector('.monthly').classList.toggle('active', !isYearly);
	document.querySelector('.yearly').classList.toggle('active', isYearly);

	const cards = document.querySelectorAll('.plan-card');
	cards.forEach((card) => {
		const planInput = card.querySelector('input');
		const planValue = planInput.value;
		const priceText = card.querySelector('.price');
		const benefitText = card.querySelector('.yearly-benefit');

		const price = isYearly ? planPrices[planValue].yearly : planPrices[planValue].monthly;
		const suffix = isYearly ? 'yr' : 'mo';

		priceText.textContent = `$${price}/${suffix}`;
		if (isYearly) {
			benefitText.classList.remove('hidden');
		} else {
			benefitText.classList.add('hidden');
		}
	});

	const addonCards = document.querySelectorAll('.addon-card');
	addonCards.forEach((card) => {
		const addonName = card.querySelector('input').value;
		const addonPrice = card.querySelector('.addon-price');
		addonPrice.textContent = isYearly ? `+$${addonPrices[addonName].yearly}/yr` : `+$${addonPrices[addonName].monthly}/mo`;
	});
}

function updateSummary() {
	const selectedPlan = document.querySelector('input[name="plan"]:checked').value;
	const planNameCapitalized = selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1);
	const planPrice = isYearly ? planPrices[selectedPlan].yearly : planPrices[selectedPlan].monthly;
	const suffix = isYearly ? 'yr' : 'mo';
	const periodStatus = isYearly ? 'Yearly' : 'Monthly';

	document.querySelector('#summary-plan-name').textContent = `${planNameCapitalized} (${periodStatus})`;
	document.querySelector('#summary-plan-price').textContent = `$${planPrice}/${suffix}`;

	const summaryAddonContainer = document.querySelector('.summary-addons');
	summaryAddonContainer.innerHTML = '';

	let totalAddonPrice = 0;

	const selectedAddons = document.querySelectorAll('input[name="addons"]:checked');
	selectedAddons.forEach((addon) => {
		const name = addon.value;
		const price = isYearly ? addonPrices[addon.value].yearly : addonPrices[addon.value].monthly;
		totalAddonPrice += price;
		const div = document.createElement('div');
		div.className = 'summary-addon';
		div.innerHTML = `
        <span class="summary-addon-name">${name}</span>
        <span class="summary-addon-price">+$${price}/${suffix}</span>
      `;

		summaryAddonContainer.appendChild(div);
	});

	document.getElementById('total-title').textContent = `Total (per ${isYearly ? 'year' : 'month'})`;
	document.getElementById('total-price').textContent = `$${planPrice + totalAddonPrice}/${suffix}`;
}

updateFormSteps();
updateBilling();
