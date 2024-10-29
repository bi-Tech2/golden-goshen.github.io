'use strict';



// add event on multiple elements

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



// navbar functionality

const [navbar, navToggler, navbarLinks] = [
  document.querySelector("[data-navbar]"),
  document.querySelector("[data-nav-toggler]"),
  document.querySelectorAll("[data-nav-link]")
];

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
  document.body.classList.toggle("active");
}

navToggler.addEventListener("click", toggleNavbar);


const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
  document.body.classList.remove("active");
}

addEventOnElements(navbarLinks, "click", closeNavbar);



// header active

const header = document.querySelector("[data-header]");

const activeElemOnScroll = function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
}

window.addEventListener("scroll", activeElemOnScroll);



// scroll reveal effect

const revealElements = document.querySelectorAll("[data-reveal]");

const revealOnScroll = function () {
  for (let i = 0; i < revealElements.length; i++) {

    // add revealed class on element, when visible in window
    if (revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.1) {
      revealElements[i].classList.add("revealed");

      // remove long transition from button, after 1 second
      if (revealElements[i].classList.contains("btn")) {
        setTimeout(function () {
          revealElements[i].style.transition = "0.25s ease";
        }, 1000);
      }
    }

  }
}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();


let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showNextSlide() {
    slides[currentIndex].style.opacity = 0; // Fade out current slide
    currentIndex = (currentIndex + 1) % totalSlides; // Move to next slide
    slides[currentIndex].style.opacity = 1; // Fade in next slide
}

// Show the first slide
slides[currentIndex].style.opacity = 1;

// Change slides every 5 seconds
setInterval(showNextSlide, 5000);


// Open overlay
document.getElementById("searchTogg").addEventListener("click", () => {
  var ven = document.getElementById("ven");
  ven.classList.add("active");
  document.body.classList.add("no-scroll");
});

// Close overlay
document.getElementById("closeBtn").addEventListener("click", () => {
  var ven = document.getElementById("ven");
  ven.classList.remove("active");
  document.body.classList.remove("no-scroll");
});


const video = document.getElementById("aboutVideo");
const playPauseIcon = document.getElementById("playPauseIcon");
const playIcon = "play-circle-outline";
const pauseIcon = "pause-circle-outline";

// Toggle play/pause on click
playPauseIcon.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    playPauseIcon.innerHTML = `<ion-icon name="${pauseIcon}"></ion-icon>`;
  } else {
    video.pause();
    playPauseIcon.innerHTML = `<ion-icon name="${playIcon}"></ion-icon>`;
  }
});

// Update icon when video ends
video.addEventListener("ended", () => {
  playPauseIcon.innerHTML = `<ion-icon name="${playIcon}"></ion-icon>`;
});
