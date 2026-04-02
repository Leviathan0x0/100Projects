// DOM ELEMENTS
const form = document.getElementById("registration-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

form.addEventListener("submit", e => {
    e.preventDefault();
    const isRequiredValid = checkRequired([username, email, password, confirmPassword]);
    let isFormValid = isRequiredValid;
    if (isRequiredValid) {
        const isUsernameValid = checkLength(username, 3, 15)
        const isEmailValid = checkEmail(email)
        const isPasswordValid = checkLength(password, 6, 60)
        const doPasswordsMatch = checkPasswordsMatch(password, confirmPassword)

        isFormValid = isUsernameValid && isEmailValid && isPasswordValid && doPasswordsMatch
    }

    if (isFormValid) {
        alert("Registration successful!");
        form.reset();
        document.querySelectorAll(".form-group").forEach(group => {
            group.className = 'form-group';
        });
    }
})

function checkRequired(inputArr) {
    let isValid = true;
    inputArr.forEach((input) => {
        if (input.value.trim() === '') {
            showError(input, `This field is required.`);
            isValid = false;
        } else {
            showSuccess(input)
            isValid = true;
        }
    })
    return isValid;
}

function formatFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function showError(input, msg) {
    const formGroup = input.parentElement;
    formGroup.classList.remove("success");
    formGroup.classList.add("error");
    const small = formGroup.querySelector("small");
    small.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${msg}`;
}

function showSuccess(input) {
    const formGroup = input.parentElement;
    formGroup.classList.remove("error");
    formGroup.classList.add("success");
}

const checkLength = (input, min, max) => {
    if (input.value.length < min) {
        showError(input, `${formatFieldName(input)} must be at least ${min} characters.`);
        return false;
    } else if (input.value.length > max) {
        showError(input, `${formatFieldName(input)} cannot be more than ${max} characters.`);
        return false;
    } else {
        showSuccess(input);
        return true;
    }
}

const checkEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email.value.trim())) {
        showSuccess(email);
        return true;
    } else {
        showError(email, "Email is not valid.");
        return false;
    }
}

const checkPasswordsMatch = (password, confirmPassword) => {
    if (password.value !== confirmPassword.value) {
        showError(confirmPassword, `Passwords do not match.`);
        return false;
    }
    return true;
}


