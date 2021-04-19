'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const scrollBtn = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const linkConatiner = document.querySelector('.nav__links');
const link = document.querySelectorAll('.nav__link');
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const nav = document.querySelector('.nav');
const tabContent = document.querySelectorAll('.operations__content');
const header = document.querySelector('.header');
const sectionAll = document.querySelectorAll('.section');
const imgTarget = document.querySelectorAll('img[data-src]');
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnright = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Scroll Behaviour

// window.scrollTo({
//   left:section1.getBoundingClientRect().left + window.pageXOffset,
//   top: section1.getBoundingClientRect().top +
//   window.pageYOffset,
//   behavior: 'smooth',
// })

scrollBtn.addEventListener('click', () => {
  section1.scrollIntoView({
    behavior: 'smooth',
  });
});

// Going to specific section

// link.forEach(li=>{
//   li.addEventListener('click', (e)=>{
//     e.preventDefault()
//     const liHref = e.target.getAttribute('href')
//     document.querySelector(liHref).scrollIntoView({behavior:'smooth'})
//   })
// })

linkConatiner.addEventListener('click', e => {
  e.preventDefault();

  if (
    e.target.classList.contains('nav__link') &&
    e.target.parentElement.nextElementSibling
  ) {
    const linkHref = e.target.getAttribute('href');
    document.querySelector(linkHref).scrollIntoView({
      behavior: 'smooth',
    });
  }
});

tabContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');

  // Guard Cluase (if not clicked it will become true and retur and if clicked it will become false and nothing will return)
  if (!clicked) return;
  // Removing active from all tabs
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  // adding active clicked tab
  clicked.classList.add('operations__tab--active');
  // Removing active from all content
  tabContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );
  // Adding active to clicked dataset number  content

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Fade animation of nav

const fade = function (hello, e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const sibling = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    sibling.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
      logo.style.opacity = this;
    });
  }
};

nav.addEventListener('mouseover', fade.bind(0.5, 'hello'));
nav.addEventListener('mouseout', fade.bind(1, 'hyy'));

// Sticky Navbar

// let sectionnTop = section1.getBoundingClientRect()
// window.addEventListener('scroll', ()=>{
//   if(window.scrollY > sectionnTop.top )nav.classList.add('sticky')
//   else nav.classList.remove('sticky')
// })
const navHeight = nav.getBoundingClientRect();
const stickyNavFunction = entries => {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNavFunction, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight.height}px`,
});
headerObserver.observe(header);

// Reveal Section
const revealSection = (entries, observe) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observe.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

sectionAll.forEach(sec => {
  sectionObserver.observe(sec);
  sec.classList.add('section--hidden');
});

// Lazy Image Load
const loadImg = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0.4,
});

imgTarget.forEach(img => {
  imgObserver.observe(img);
});

// Slider
let currentSlide = 0;

const createDots = () => {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
const activateDot = slide => {
  document.querySelectorAll('.dots__dot').forEach(dot => {
    dot.classList.remove('dots__dot--active');
  });
  document
    .querySelector(`.dots__dot[data-slide = "${slide}"]`)
    .classList.add('dots__dot--active');
};

const gotoSlide = slider => {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${(i - slider) * 100}%)`;
  });
};

const nextSlide = () => {
  if (currentSlide >= slides.length - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  gotoSlide(currentSlide);
  activateDot(currentSlide);
};
const prevSlide = () => {
  if (currentSlide <= 0) {
    currentSlide = slides.length - 1;
  } else {
    currentSlide--;
  }
  gotoSlide(currentSlide);
  activateDot(currentSlide);
};

// Event Handler

btnright.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', e => {
  if (e.code === 'ArrowLeft') {
    prevSlide();
  } else if (e.code === 'ArrowRight') {
    nextSlide();
  }
});

dotContainer.addEventListener('click', e => {
  if (e.target.classList.contains('dots__dot')) {
    currentSlide = e.target.dataset.slide;
    gotoSlide(currentSlide);
    activateDot(currentSlide);
  }
});

const inIt = () => {
  gotoSlide(0);
  createDots();
  activateDot(currentSlide);
};
inIt();

// IntersectionApi

// const obsCallback = (entries)=>{
//   entries.forEach(entry =>{
//     console.log(entry)
//   })
// }

// const obsOption = {
//   root: null,
//   threshold: [ 0.1],
// }
// const observer = new IntersectionObserver(obsCallback, obsOption)
// observer.observe(section1)

// const randomInt = (min, max)=> Math.floor(Math.random()*(max - min + 1)  + min)
// const randomColor = ()=> `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`

// console.log(randomColor())
