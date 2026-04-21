/**
 * script.js — Portfolio Site JavaScript
 *
 * What this file does:
 *  1. Adds a "scrolled" style to the navbar when the user scrolls down
 *  2. Toggles the mobile navigation open/closed
 *  3. Closes the mobile nav when a link is clicked
 *  4. Highlights the active nav link based on scroll position
 *  5. Reveals sections with a fade-in animation as they scroll into view
 */


/* ============================================================
   1. NAVBAR SCROLL BEHAVIOR
   Adds/removes a "scrolled" class on <header id="navbar">.
   The CSS uses this class to add a blurred dark background.
============================================================ */

const navbar = document.getElementById('navbar');

function handleNavScroll() {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

// Run on load in case the page is already scrolled (e.g. back-button navigation)
handleNavScroll();

// Run every time the user scrolls
window.addEventListener('scroll', handleNavScroll, { passive: true });


/* ============================================================
   2. MOBILE NAV TOGGLE
   Clicking the hamburger button opens/closes the nav link list.
============================================================ */

const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', function () {
  const isOpen = navLinks.classList.toggle('open');

  // Update aria-expanded so screen readers know the menu state
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});


/* ============================================================
   3. CLOSE MOBILE NAV ON LINK CLICK
   Tapping a nav link on mobile navigates to the section,
   then closes the menu so it doesn't block the content.
============================================================ */

navLinks.querySelectorAll('.nav-link').forEach(function (link) {
  link.addEventListener('click', function () {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});


/* ============================================================
   4. ACTIVE NAV LINK HIGHLIGHTING
   As the user scrolls, the nav link for the current section
   gets an "active" class (underline indicator in CSS).
============================================================ */

// Collect all sections that have an id matching a nav link
const sections     = document.querySelectorAll('section[id]');
const navLinkItems = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  // How far from the top a section needs to be before we mark it active
  const scrollY    = window.scrollY;
  const offset     = 100;

  sections.forEach(function (section) {
    const sectionTop    = section.offsetTop - offset;
    const sectionBottom = sectionTop + section.offsetHeight;
    const sectionId     = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionBottom) {
      // Remove active from all links, then add to the matching one
      navLinkItems.forEach(function (link) {
        link.classList.remove('active');
        // href="#about" → strip the "#" to compare with section id
        if (link.getAttribute('href') === '#' + sectionId) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });

// Run once on load to set the initial active state
updateActiveLink();


/* ============================================================
   5. SCROLL REVEAL ANIMATIONS
   Uses IntersectionObserver to watch for elements with a
   "reveal" class. When they enter the viewport, the "visible"
   class is added, which triggers the CSS fade-in animation.
============================================================ */

// Select all elements marked for reveal animation
const revealElements = document.querySelectorAll('.reveal');

// IntersectionObserver fires a callback when an element enters
// or exits the viewport. threshold: 0.1 means 10% visible = trigger.
const revealObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Once revealed, stop observing to save memory
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,     // trigger when 10% of the element is visible
    rootMargin: '0px 0px -40px 0px'   // 40px buffer from bottom edge
  }
);

// Register each .reveal element with the observer
revealElements.forEach(function (el) {
  revealObserver.observe(el);
});


/* ============================================================
   OPTIONAL: Smooth scroll polyfill for older Safari
   Modern browsers handle scroll-behavior: smooth in CSS,
   but this JS version covers edge cases.
============================================================ */

document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');

    // Skip empty anchors like href="#"
    if (targetId === '#') return;

    const target = document.querySelector(targetId);

    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
