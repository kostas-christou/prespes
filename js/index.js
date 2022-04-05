const expandLinks = document.querySelectorAll('.expand-link');
const hamMenu = document.querySelector('.header__ham-menu');
const headerNav = document.querySelector('.header__nav');
const header = document.querySelector('.header');
const asideRight = document.querySelector('.aside--right');
const fullMenusLeft = document.querySelectorAll('.full-menu--left');
const fullMenuRight = document.querySelector('.full-menu--right');
const fullMenuOverlay = document.querySelector('.full-menu__overlay');
const fullMenuBackButtons = document.querySelectorAll('.full-menu__back-btn');
const parallaxWrapper = document.querySelector('.parallax-wrapper');
const backToTop = document.querySelector('.back-to-top');
const mediaQueryMax880 = window.matchMedia('(max-width: 54.99em)');
const mediaQueryMax1040 = window.matchMedia('(max-width: 64.99em)');
const mediaQueryMin1040 = window.matchMedia('(min-width: 65em)');
const weatherTemp = document.querySelector('.header__weather-temp');
const weatherIcon = document.querySelector('.header__weather-icon');
const accessBtn = document.getElementById('universalAccessBtn');
const cookies = document.querySelector('.cookies');
const refuseBtn = document.querySelector('.cookies__btn--refuse');
const acceptBtn = document.querySelector('.cookies__btn--accept');

// Helper fuctions for reusability
// Change header bg-color depending on the accessibility widget state
function addClassScrolled() {
  header.classList.add('header--scrolled');
  asideRight.classList.add('aside--scrolled');
}

function removeClassScrolled() {
  header.classList.remove('header--scrolled');
  asideRight.classList.remove('aside--scrolled');
}

// Function for changing the ham-menu icon
function toggleHamMenuIcon() {
  if (hamMenu.classList.contains('header__ham-menu--open')) {
    hamMenu.classList.remove('header__ham-menu--open');
    hamMenu.classList.add('header__ham-menu--close');
  } else {
    hamMenu.classList.remove('header__ham-menu--close');
    hamMenu.classList.add('header__ham-menu--open');
  }
}

// Function for hiding the currently open left menu (if any)
function hideCurrentLeftMenu() {
  const openLeftMenu = document.querySelector(
    '.full-menu--left.full-menu--expand'
  );
  if (openLeftMenu) {
    openLeftMenu.classList.remove('full-menu--expand');
    openLeftMenu.classList.add('full-menu--collapse');
  }
}
// Function for showing the new left menu
function showNewLeftMenu(menuIndex) {
  if (fullMenusLeft[menuIndex]) {
    fullMenusLeft[menuIndex].classList.remove('full-menu--collapse');
    fullMenusLeft[menuIndex].classList.add('full-menu--expand');
  }
}

// Function for showing the overlay
function showOverlay() {
  fullMenuOverlay.classList.remove('disappear');
  fullMenuOverlay.classList.add('appear');
}
// Function for hiding the overlay
function hideOverlay() {
  fullMenuOverlay.classList.remove('appear');
  fullMenuOverlay.classList.add('disappear');
}
// Function for adding an underline on the current active link, after removing the previous one (if any)
function addLinkUnderline(menuIndex) {
  const previousActiveLink = document.querySelector('.current');
  if (previousActiveLink) {
    previousActiveLink.classList.remove('current');
  }
  expandLinks[menuIndex].classList.add('current');
}

// Function for removing the underline on the current active link (if any)
function removeLinkUnderline() {
  const previousActiveLink = document.querySelector('.current');
  if (previousActiveLink) {
    previousActiveLink.classList.remove('current');
  }
}
// Function for hiding the accessibility menu
function hideAccessibilityMenu() {
  const accessibilityMenu = document.getElementById('accessibilityBar');
  accessibilityMenu.classList.remove('active');
}

// Function for showing the right aside on small screens
function showRightAside() {
  if (mediaQueryMax880.matches) {
    asideRight.style.transform = 'translateX(0)';
  }
}
// Function for hiding the right aside on small screens
function hideRightAside() {
  if (mediaQueryMax880.matches) {
    asideRight.style.transform = 'translateX(100%)';
  }
}

// Cookies buttons functionality
if (acceptBtn && refuseBtn) {
  acceptBtn.addEventListener('click', () => {
    cookies.style.display = 'none';
  });

  refuseBtn.addEventListener('click', () => {
    cookies.style.display = 'none';
  });
}

// Fetch weather info from external API (weatherapi.com)
document.addEventListener('DOMContentLoaded', async () => {
  const response = await axios.get(
    'http://api.weatherapi.com/v1/current.json?key=92eab374f8c14f52bb4115634221403&q=40.83628,21.14061'
  );

  weatherIcon.src = `${response.data.current.condition.icon}`;
  weatherTemp.innerHTML = `${response.data.current.temp_c} <sup>o</sup>C`;
});

// Change the bg-color of header and right aside, when opening the accessibility widget
accessBtn.addEventListener('click', () => {
  const accessBar = document.getElementById('accessibilityBar');

  if (
    accessBar.classList.contains('active') &&
    hamMenu.classList.contains('header__ham-menu--open')
  ) {
    removeClassScrolled();
  } else {
    addClassScrolled();
  }
});

// Change header bg-color when scrolling
window.addEventListener('scroll', changeHeaderAndAside);

function changeHeaderAndAside() {
  if (window.scrollY > 150) {
    addClassScrolled();
  } else {
    removeClassScrolled();
  }
}

// Functionality for mega menu both for mobile and desktop

function openDesktopMenu(menuIndex = 0) {
  toggleHamMenuIcon();
  addClassScrolled();
  hideCurrentLeftMenu();
  showNewLeftMenu(menuIndex);
  showOverlay();
  addLinkUnderline(menuIndex);
  // Remove listener for scroll
  window.removeEventListener('scroll', changeHeaderAndAside);
}

function closeDesktopMenu(menuIndex = 0) {
  toggleHamMenuIcon();
  removeClassScrolled();
  hideCurrentLeftMenu();
  hideAccessibilityMenu();
  hideOverlay();
  removeLinkUnderline();
  // Add pointer events for the rest of the document
  parallaxWrapper.style.pointerEvents = 'auto';
  // Add listener for scroll
  window.addEventListener('scroll', changeHeaderAndAside);
}

function openMobileMenu(menuIndex = 0) {
  toggleHamMenuIcon();
  addClassScrolled();
  showRightAside();
  showOverlay();
  // For small screens show the header navbar as expandable
  headerNav.style.transform = 'translateX(0)';
  // Remove pointer events for the rest of the document
  parallaxWrapper.style.pointerEvents = 'none';
  // Remove listener for scroll
  window.removeEventListener('scroll', changeHeaderAndAside);
}

function closeMobileMenu(menuIndex = 0) {
  toggleHamMenuIcon();
  removeClassScrolled();
  hideRightAside();
  hideCurrentLeftMenu();
  hideAccessibilityMenu();
  hideOverlay();
  // Hide the header navbar
  headerNav.style.transform = 'translateX(calc(100% + var(--header-height)))';
  // Add pointer events for the rest of the document
  parallaxWrapper.style.pointerEvents = 'auto';
  // Add listener for scroll
  window.addEventListener('scroll', changeHeaderAndAside);
}

function openInternalMobileMenu(menuIndex = 0) {
  addClassScrolled();
  showRightAside();
  hideCurrentLeftMenu();
  showNewLeftMenu(menuIndex);
  addLinkUnderline(menuIndex);
  // Change the hamburger menu icon
  hamMenu.classList.remove('header__ham-menu--open');
  hamMenu.classList.add('header__ham-menu--close');
  // Hide the main nav menu on small screens
  headerNav.style.transform = 'translateX(calc(100% + var(--header-height)))';
  // Remove pointer events for the rest of the document
  parallaxWrapper.style.pointerEvents = 'none';
}

// Hamburger menu event-listener
if (hamMenu) {
  hamMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    // Large screens
    if (
      mediaQueryMin1040.matches &&
      hamMenu.classList.contains('header__ham-menu--open')
    ) {
      openDesktopMenu();
    } else if (
      mediaQueryMin1040.matches &&
      hamMenu.classList.contains('header__ham-menu--close')
    ) {
      closeDesktopMenu();
      // Small screens
    } else if (
      mediaQueryMax1040.matches &&
      hamMenu.classList.contains('header__ham-menu--open')
    ) {
      openMobileMenu();
    } else if (
      mediaQueryMax1040.matches &&
      hamMenu.classList.contains('header__ham-menu--close')
    ) {
      closeMobileMenu();
    }
  });
}

// Open internal menus on nav-link click
if (expandLinks.length > 0) {
  expandLinks.forEach((expandLink, index) => {
    expandLink.addEventListener('click', (e) => {
      e.stopPropagation();
      // Large screens
      if (mediaQueryMin1040.matches) {
        openDesktopMenu(index);
        hamMenu.classList.remove('header__ham-menu--open');
        hamMenu.classList.add('header__ham-menu--close');
        // Small screens
      } else if (mediaQueryMax1040.matches) {
        openInternalMobileMenu(index);
      }
    });
  });
}

// Close all open menus when clicking outside
document.addEventListener('click', (e) => {
  const openMenuLeft = document.querySelector(
    '.full-menu--left.full-menu--expand'
  );

  // Large screens
  if (
    mediaQueryMin1040.matches &&
    openMenuLeft &&
    !openMenuLeft.contains(e.target)
  ) {
    closeDesktopMenu();

    // Small screens
  } else if (
    mediaQueryMax1040.matches &&
    openMenuLeft &&
    !openMenuLeft.contains(e.target)
  ) {
    closeMobileMenu();
  } else if (
    mediaQueryMax1040.matches &&
    !openMenuLeft &&
    headerNav &&
    !headerNav.contains(e.target)
  ) {
    closeMobileMenu();
    hamMenu.classList.remove('header__ham-menu--close');
    hamMenu.classList.add('header__ham-menu--open');
  }
});

// Mega menu back button functionality on mobile devices
if (fullMenuBackButtons.length > 0) {
  fullMenuBackButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();

      closeMobileMenu();
      openMobileMenu();
    });
  });
}

// Back-to-top button functionality
if (backToTop) {
  window.addEventListener('scroll', checkPosition);

  backToTop.addEventListener('click', () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
}

function checkPosition() {
  let windowY = window.scrollY;
  let screenHeight = screen.height;

  if (windowY < screenHeight) {
    backToTop.classList.add('hide');
  } else {
    backToTop.classList.remove('hide');
  }
}

// Hide video overlay on click and show youtube video
const videoOverlayButtons = document.querySelectorAll(
  '.video__play-btn-container'
);
if (videoOverlayButtons.length > 0) {
  videoOverlayButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      showVideo(e);
    });
  });
}

function showVideo(e) {
  const videoOverlay = e.target.parentElement;

  videoOverlay.style.display = 'none';
}

// Swiper (slider) config
const newsSwiper = new Swiper('.news__swiper', {
  slidesPerView: 1.2,
  spaceBetween: 20,
  grabCursor: true,
  breakpoints: {
    700: {
      slidesPerView: 1.4,
      spaceBetween: 30,
    },
    1050: {
      slidesPerView: 2.4,
      spaceBetween: 40,
    },
    1550: {
      slidesPerView: 3.4,
      spaceBetween: 60,
    },
    2000: {
      slidesPerView: 4.4,
      spaceBetween: 60,
    },
  },
  navigation: {
    nextEl: '.news__swiper-button-next',
    prevEl: '.news__swiper-button-prev',
  },
});

const eventsSwiper = new Swiper('.events__swiper', {
  slidesPerView: 1.2,
  spaceBetween: 20,
  grabCursor: true,
  breakpoints: {
    700: {
      slidesPerView: 1.4,
      spaceBetween: 30,
    },
    1050: {
      slidesPerView: 2.4,
      spaceBetween: 40,
    },
    1550: {
      slidesPerView: 3.4,
      spaceBetween: 50,
    },
    2000: {
      slidesPerView: 4.4,
      spaceBetween: 60,
    },
  },
  navigation: {
    nextEl: '.events__swiper-button-next',
    prevEl: '.events__swiper-button-prev',
  },
});
