const navItem = document.querySelectorAll('.nav-item');
const closeBtn = document.querySelector('.fa-xmark');
const openBtn = document.querySelector('.fa-bars');
const navbar = document.querySelector('.nav-items');

openBtn.addEventListener('click', () => {
    navbar.classList.remove('is-closing');
    navbar.classList.add('is-open');
});

closeBtn.addEventListener('click', () => {
    navbar.classList.remove('is-open');
    navbar.classList.add('is-closing');
});

navItem.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('open');
    });
});

