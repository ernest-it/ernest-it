document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle
  var navButton = document.querySelector('.w-nav-button');
  var navMenu = document.querySelector('.w-nav-menu');

  if (navButton && navMenu) {
    navButton.addEventListener('click', function () {
      var isOpen = navButton.classList.contains('w--open');
      if (isOpen) {
        navButton.classList.remove('w--open');
        navMenu.removeAttribute('data-nav-menu-open');
        document.body.style.overflow = '';
      } else {
        navButton.classList.add('w--open');
        navMenu.setAttribute('data-nav-menu-open', '');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  // Dropdown toggles (nav dropdowns)
  var dropdowns = document.querySelectorAll('.w-dropdown');
  dropdowns.forEach(function (dropdown) {
    var toggle = dropdown.querySelector('.w-dropdown-toggle');
    var list = dropdown.querySelector('.w-dropdown-list');
    if (!toggle || !list) return;

    // Skip FAQ accordion items — handled separately
    if (dropdown.classList.contains('accordion')) return;

    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      var isOpen = list.classList.contains('w--open');

      // Close all other dropdowns first
      dropdowns.forEach(function (other) {
        if (other === dropdown || other.classList.contains('accordion')) return;
        var otherList = other.querySelector('.w-dropdown-list');
        var otherToggle = other.querySelector('.w-dropdown-toggle');
        if (otherList) otherList.classList.remove('w--open');
        if (otherToggle) otherToggle.classList.remove('w--open');
      });

      if (isOpen) {
        list.classList.remove('w--open');
        toggle.classList.remove('w--open');
      } else {
        list.classList.add('w--open');
        toggle.classList.add('w--open');
      }
    });
  });

  // FAQ accordion toggles
  var accordions = document.querySelectorAll('.accordion.w-dropdown');
  accordions.forEach(function (accordion) {
    var toggle = accordion.querySelector('.w-dropdown-toggle');
    var list = accordion.querySelector('.w-dropdown-list');
    if (!toggle || !list) return;

    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      var isOpen = list.classList.contains('w--open');

      if (isOpen) {
        list.classList.remove('w--open');
        toggle.classList.remove('w--open');
      } else {
        list.classList.add('w--open');
        toggle.classList.add('w--open');
      }
    });
  });

  // Close mobile menu when a nav link is clicked
  var navLinks = document.querySelectorAll('.w-nav-menu a');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (navButton && navMenu) {
        navButton.classList.remove('w--open');
        navMenu.removeAttribute('data-nav-menu-open');
        document.body.style.overflow = '';
      }
    });
  });

  // Close mobile menu on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      // Close mobile menu
      if (navButton && navMenu && navButton.classList.contains('w--open')) {
        navButton.classList.remove('w--open');
        navMenu.removeAttribute('data-nav-menu-open');
        document.body.style.overflow = '';
      }
      // Close all dropdowns
      dropdowns.forEach(function (dropdown) {
        var list = dropdown.querySelector('.w-dropdown-list');
        var toggle = dropdown.querySelector('.w-dropdown-toggle');
        if (list) list.classList.remove('w--open');
        if (toggle) toggle.classList.remove('w--open');
      });
    }
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function (e) {
    dropdowns.forEach(function (dropdown) {
      if (dropdown.classList.contains('accordion')) return;
      if (!dropdown.contains(e.target)) {
        var list = dropdown.querySelector('.w-dropdown-list');
        var toggle = dropdown.querySelector('.w-dropdown-toggle');
        if (list) list.classList.remove('w--open');
        if (toggle) toggle.classList.remove('w--open');
      }
    });

    // Close mobile menu if clicking outside nav
    if (navButton && navMenu) {
      var nav = document.querySelector('.w-nav');
      if (nav && !nav.contains(e.target)) {
        navButton.classList.remove('w--open');
        navMenu.removeAttribute('data-nav-menu-open');
        document.body.style.overflow = '';
      }
    }
  });
});
