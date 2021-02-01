'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////////////////////////
//Button scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to'); // Select teh button
const section1 = document.querySelector('#section--1'); //Select the element by id = "Section--1"

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect(); // Rectangle coordinates

  section1.scrollIntoView({ behavior: 'smooth' });
});
////////////////////////////////////////////
//Page navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     document
//       .querySelector(this.getAttribute('href'))
//       .scrollIntoView({ behavior: 'smooth' });
//   });
// });
// 1. Add event listener to moom parent element
//2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    document
      .querySelector(e.target.getAttribute('href'))
      ?.scrollIntoView({ behavior: 'smooth' });
  }
});

//Tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  //Guard clause
  if (!clicked) return;

  //Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //Active tab
  clicked.classList.add('operations__tab--active');

  //Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation on buttons

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblins = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblins.forEach(el => {
      if (el !== link) el.style.opacity = this; //(this === 0.5)
    });
    logo.style.opacity = this; //(this === 1)
  }
};

// Passing "argument" into the handler with bind method (this)
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// // Sticky navigation (NOT EFFICIENT)
// const initialcoods = section1.getBoundingClientRect();
// console.log(initialcoods);
// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);
//   if (window.scrollY > initialcoods.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const obsOptions = { root: null, threshold: [0, 0.2] };

// const observer = new IntersectionObserver(obsCallback, obsOptions);

//observer.observe(section1);

//Intersection Observer API ------------------------------------------- IMPORTANT!!

//Sticky navigation: Intersection Observer API
// // Sticky navigation (NOT EFFICIENT)
const header = document.querySelector('.header'); // select teh header element
const navHeight = nav.getBoundingClientRect().height; // get the nav height

const stickyNav = function (entries) {
  const [entry] = entries; // get entries of the headerObserver
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0, // the sticky class will be added only when the section is not visible(observed)
  rootMargin: `-${navHeight}px`, // add sticky class before so it wont overload the section
});
headerObserver.observe(header);

//Reveal sections

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return; //Guard Clause
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target); // unobserve the target so it can improve performance after the effects  are done
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');
//load img
const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  //remove the blur effect class only when the image is loaded
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  //stop observing the img
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////

// // TYPE of Events and Event Handlers
// const h1 = document.querySelector('h1');
// //NEW way of using events on elements. addEventListener is better because we can add more than one event at the same time!

// const alertH1 = function (e) {
//   alert('addEventListener: Great! You are reading the heading :D'); // Hover mouse event on header

//   h1.removeEventListener('mouseenter', alertH1); // REMOVE the eventListener so it wont happen again
// };
// h1.addEventListener('mouseenter', alertH1);

// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000); //Remove the eventListener after 3 seconds

// // OLD way of using events on elements
// // h1.onmouseenter = function (e) {
// //   alert('addEventListener: Great! You are reading the heading :D'); // Hover mouse event on header
// // };

//console.log(s1coords);

// console.log(e.target.getBoundingClientRect());
// console.log('Current scroll (x/y)', window.pageXOffset, window.pageYOffset); // Current scroll position values **********************

// console.log(
//   'height/width viewport',
//   document.documentElement.clientHeight,  **************   // total size of the view    heiht x width
//   document.documentElement.clientWidth
// );

//rgb(255,255,255)

//SCROLLING ------------------------------

// window.scrollTo({
//   // OLD method , calculating the possitions
//   left: s1coords.left + window.pageXOffset,
//   top: s1coords.top + window.pageYOffset,
//   behavior: 'smooth',
// });
//MODERN method  **sorcery**

/*

//EVENT propagation
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

//target element event (child element)
document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);

  //Stop propagation  ----------------------
  //e.stopPropagation();
});

//bubbling phase event propagation (parent element)
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});

//bubbling phase event propagation (parent element)
document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('NAV', e.target, e.currentTarget);
  },
  true // this third parametre define the event on the capturing  phase (will happen first)
);


//SELECTING Elements -----------------------------------
console.log(document.documentElement); // Selects the entire html document
console.log(document.head);
console.log(document.body);
const header = document.querySelector('.header');

const allSections = document.querySelectorAll('.section'); // Returns a nodeList (simillar to an array)
console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button'); // returns a HTMLCollection with all the buttons
console.log(allButtons);
console.log(document.getElementsByClassName('btn'));

//CREATING and INSERTING elements

// .insertAdjacentHTML

const message = document.createElement('div');
message.classList.add('cookie-message');
//message.textContent = 'We use cookies for improved functionaluty and analytics.';
message.innerHTML =
  'We use cookies for improved functionaluty and analytics. <button class="btn btn--close-cookie"> Got it!</button>';
header.prepend(message); // top inside of the header element
//header.append(message.cloneNode(true)); // message must be cloned, otherwise it will just move the element to the bottom of the header
header.append(message); // bottom inside the header element

header.before(message); // outside* before the header element
header.after(message); // outside* after the header element

// DELETE Elements

//add and event listener on the button to remove the message element
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // message.remove();  // NEW METHOD to remove elements
    message.parentElement.removeChild(message); // OLD method to remove elemnts
  });

//STYLES

message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.height); // can't read if the style is no in the DOM
console.log(message.style.backgroundColor); // can read if the style in a  'inline-style'

console.log(getComputedStyle(message).color); // to read the computed style of the element
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px'; // get the computed height and increase the hight value (must parse the string value returned from the function)

document.documentElement.style.setProperty('--color-primary', 'orangered'); // Select the css variable (--color-promary) and change the style value

//ATTRIBUTES

const logo = document.querySelector('.nav__logo');

console.log(logo.alt); // read the alt attribute of the selected element
console.log(logo.src); // return the whole url
console.log(logo.getAttribute('src')); //return the absolute value of the attribute
console.log(logo.className);
logo.alt = 'Beautiful minimalist logo';

// Non-standard attribute
console.log(logo.designer); // WONT read!
console.log(logo.getAttribute('designer')); // This will WORL!
logo.setAttribute('company', 'Bankist'); // Create an attribute in the element

logo.getAttribute('src');

const link = document.querySelector('.twitter-link');
console.log(link.href);
console.log(link.getAttribute('href')); // return the absolute value of the attribute

//Data attributes
console.log(logo.dataset.versionNumber); // get the data attribute: data-version-number="3.0"

//Classes

logo.classList.add('c');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c'); // not includes. like in arrays

logo.className = 'jonas'; // DON'T use this, it will overwrite all the other classes of the elements
*/

// const h1 = document.querySelector('h1');

// //Going downwards: child
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'white';

// //Going upwards : parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// // select the closest parent element with the class
// h1.closest('.header').style.background = 'var(--gradient-secondary)'; // find  parent elements, the opposite of queryselector(finds deeper child elements)

// //Going sideways: siblins
// console.log(h1.previousElementSibling); // most used
// console.log(h1.nextElementSibling); // most used

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);

// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)'; // Select all elements but not the h1 itself, and make all of them 5% smaller
// });
