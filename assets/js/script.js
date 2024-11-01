"use strict";

/* Preload class to add after the page is loaded */
const preloader = document.querySelector('.preload');
window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.classList.add('loaded');
        document.body.classList.add('loaded');
    }, 1300);
});

// Function to add event listeners to multiple elements
function addEventOnElements(elements, eventType, listener) {
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener(eventType, listener);
    }
}

// Show navbar for mobile
const navbar = document.querySelector('[data-navbar]');
const navbarToggler = document.querySelectorAll('[data-nav-toggler]');
const overlay = document.querySelector('[data-overlay]');

// Function to toggle the navbar
function toggleNavbar() {
    navbar.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('nav-active');
}

addEventOnElements(navbarToggler, 'click', toggleNavbar);

// Selects the header element to apply scroll-based visibility effects
const header = document.querySelector('.header');

let lastScrollPos = 0;

function hideHeader() {
    const isScrollBottom = lastScrollPos < window.scrollY;
    if (isScrollBottom) {
        header.classList.add('hide');
    } else {
        header.classList.remove('hide');
    }
    lastScrollPos = window.scrollY;
}

window.addEventListener('scroll', function () {
    if (window.scrollY >= 50) {
        header.classList.add('active');
        hideHeader();
    } else {
        header.classList.remove('active');
    }
});

// SLIDER
const heroSliderItems = document.querySelectorAll('[data-hero-slider-item]');
const heroSliderPrevBtn = document.querySelector('[data-prev-btn]');
const heroSliderNextBtn = document.querySelector('[data-next-btn]');

let currentSlidePos = 0;
let lastActiveItem = heroSliderItems[0];

function updateSlider() {
    lastActiveItem.classList.remove('active');
    heroSliderItems[currentSlidePos].classList.add('active');
    lastActiveItem = heroSliderItems[currentSlidePos];
}

function nextSlide() {
    if (currentSlidePos >= heroSliderItems.length - 1) {
        currentSlidePos = 0;
    } else {
        currentSlidePos++;
    }
    updateSlider();
}

heroSliderNextBtn.addEventListener('click', () => {
    nextSlide();
});

function prevSlide() {
    if (currentSlidePos <= 0) {
        currentSlidePos = heroSliderItems.length - 1;
    } else {
        currentSlidePos--;
    }
    updateSlider();
}

heroSliderPrevBtn.addEventListener('click', () => {
    prevSlide();
});

// AUTO-SLIDER //

let autoSlideInterval;
function autoSlide() {
    autoSlideInterval = setInterval(() => {
        nextSlide();
    }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], 'mouseover', () => {
    clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], 'mouseout', autoSlide);

window.addEventListener('load', autoSlide);


