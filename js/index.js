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
const mediaQueryMax1366 = window.matchMedia('(max-width: 85.374em)');
const mediaQueryMin1366 = window.matchMedia('(min-width: 85.375em)');
const weatherTemp = document.querySelector('.header__weather-temp');
const weatherIcon = document.querySelector('.header__weather-icon');

// Fetch weather info from external API (weatherapi.com)
document.addEventListener('DOMContentLoaded', async () => {
  const response = await axios.get(
    'http://api.weatherapi.com/v1/current.json?key=92eab374f8c14f52bb4115634221403&q=40.83628,21.14061'
  );

  weatherIcon.src = `${response.data.current.condition.icon}`;
  weatherTemp.innerHTML = `${response.data.current.temp_c} <sup>o</sup>C`;
});

// Change header bg-color when scrolling
window.addEventListener('scroll', changeHeaderAndAside);

function changeHeaderAndAside() {
  console.log(window.scrollY);

  if (window.scrollY > 0) {
    header.classList.add('header--scrolled');
    asideRight.classList.add('aside--scrolled');
  } else {
    header.classList.remove('header--scrolled');
    asideRight.classList.remove('aside--scrolled');
  }
}

// Functionality for mega menu both for mobile and desktop
function openDesktopMenu(menuIndex = 0) {
  // Change the hamburger menu icon
  hamMenu.classList.remove('header__ham-menu--open');
  hamMenu.classList.add('header__ham-menu--close');
  // Hide the current open left part of the full menu (if any)
  const openLeftMenu = document.querySelector(
    '.full-menu--left.full-menu--expand'
  );
  if (openLeftMenu) {
    openLeftMenu.classList.remove('full-menu--expand');
    openLeftMenu.classList.add('full-menu--collapse');
  }
  // Show the new left part of the full menu
  fullMenusLeft[menuIndex].classList.remove('full-menu--collapse');
  fullMenusLeft[menuIndex].classList.add('full-menu--expand');
  // Show the right part of the full menu
  fullMenuRight.classList.remove('full-menu--collapse');
  fullMenuRight.classList.add('full-menu--expand');
  // Show the overlay
  fullMenuOverlay.classList.remove('disappear');
  fullMenuOverlay.classList.add('appear');
  // Add an underline on the current active link, after removing the previous one (if any)
  const previousActiveLink = document.querySelector('.current');
  if (previousActiveLink) {
    previousActiveLink.classList.remove('current');
  }
  expandLinks[menuIndex].classList.add('current');
}

function closeDesktopMenu(menuIndex = 0) {
  // Change the hamburger menu icon
  hamMenu.classList.remove('header__ham-menu--close');
  hamMenu.classList.add('header__ham-menu--open');
  // Hide the left part of the full menu
  const openLeftMenu = document.querySelector(
    '.full-menu--left.full-menu--expand'
  );
  if (openLeftMenu) {
    openLeftMenu.classList.remove('full-menu--expand');
    openLeftMenu.classList.add('full-menu--collapse');
  }
  // Hide the right part of the full menu
  fullMenuRight.classList.remove('full-menu--expand');
  fullMenuRight.classList.add('full-menu--collapse');
  // Hide the accessibility menu
  const accessibilityMenu = document.getElementById('accessibilityBar');
  accessibilityMenu.classList.remove('active');

  // Hide the overlay
  fullMenuOverlay.classList.remove('appear');
  fullMenuOverlay.classList.add('disappear');
  // Remove the underline on the previous active link (if any)
  const previousActiveLink = document.querySelector('.current');
  if (previousActiveLink) {
    previousActiveLink.classList.remove('current');
  }
  // Add pointer events for the rest of the document
  parallaxWrapper.style.pointerEvents = 'auto';
}

function openMobileMenu(menuIndex = 0) {
  // Change the hamburger menu icon
  hamMenu.classList.remove('header__ham-menu--open');
  hamMenu.classList.add('header__ham-menu--close');
  // For small screens show the right aside
  if (mediaQueryMax880.matches) {
    asideRight.style.transform = 'translateX(0)';
  }
  // Show the overlay
  // fullMenuOverlay.classList.remove('disappear');
  // fullMenuOverlay.classList.add('appear');
  // For small screens show the header navbar as expandable
  headerNav.style.transform = 'translateX(0)';
  // Show the right part of the full menu
  fullMenuRight.classList.remove('full-menu--collapse');
  fullMenuRight.classList.add('full-menu--expand');
  // Remove pointer events for the rest of the document
  parallaxWrapper.style.pointerEvents = 'none';
}

function closeMobileMenu(menuIndex = 0) {
  // Change the hamburger menu icon
  hamMenu.classList.remove('header__ham-menu--close');
  hamMenu.classList.add('header__ham-menu--open');
  // For small screens hide the right aside
  if (mediaQueryMax880.matches) {
    asideRight.style.transform = 'translateX(100%)';
  }
  // Hhide the header navbar
  headerNav.style.transform = 'translateX(calc(100% + var(--header-height)))';
  // Hide the left part of the full menu
  const openLeftMenu = document.querySelector(
    '.full-menu--left.full-menu--expand'
  );
  if (openLeftMenu) {
    openLeftMenu.classList.remove('full-menu--expand');
    openLeftMenu.classList.add('full-menu--collapse');
  }
  // Hide the right part of the full menu
  fullMenuRight.classList.remove('full-menu--expand');
  fullMenuRight.classList.add('full-menu--collapse');
  // Hide the accessibility menu
  const accessibilityMenu = document.getElementById('accessibilityBar');
  accessibilityMenu.classList.remove('active');
  // Hide the overlay
  // fullMenuOverlay.classList.remove('appear');
  // fullMenuOverlay.classList.add('disappear');
  // Add pointer events for the rest of the document
  parallaxWrapper.style.pointerEvents = 'auto';
}

function openInternalMobileMenu(menuIndex = 0) {
  // Change the hamburger menu icon
  hamMenu.classList.remove('header__ham-menu--open');
  hamMenu.classList.add('header__ham-menu--close');
  // For small screens show the right aside
  if (mediaQueryMax880.matches) {
    asideRight.style.transform = 'translateX(0)';
  }
  // Hide the main nav menu on small screens
  headerNav.style.transform = 'translateX(calc(100% + var(--header-height)))';
  // Hide the current open left part of the full menu (if any)
  const openLeftMenu = document.querySelector(
    '.full-menu--left.full-menu--expand'
  );
  if (openLeftMenu) {
    openLeftMenu.classList.remove('full-menu--expand');
    openLeftMenu.classList.add('full-menu--collapse');
  }
  // Show the overlay
  // fullMenuOverlay.classList.remove('disappear');
  // fullMenuOverlay.classList.add('appear');
  // Show the new left part of the full menu
  fullMenusLeft[menuIndex].classList.remove('full-menu--collapse');
  fullMenusLeft[menuIndex].classList.add('full-menu--expand');

  // Show the right part of the full menu
  fullMenuRight.classList.remove('full-menu--collapse');
  fullMenuRight.classList.add('full-menu--expand');

  // Add an underline on the current active link, after removing the previous one (if any)
  const previousActiveLink = document.querySelector('.current');
  if (previousActiveLink) {
    previousActiveLink.classList.remove('current');
  }
  expandLinks[menuIndex].classList.add('current');
  parallaxWrapper.style.pointerEvents = 'none';
}

// Hamburger menu event-listener
if (hamMenu) {
  hamMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    // Large screens
    if (
      mediaQueryMin1366.matches &&
      hamMenu.classList.contains('header__ham-menu--open')
    ) {
      openDesktopMenu();
    } else if (
      mediaQueryMin1366.matches &&
      !hamMenu.classList.contains('header__ham-menu--open')
    ) {
      closeDesktopMenu();
      // Small screens
    } else if (
      mediaQueryMax1366.matches &&
      hamMenu.classList.contains('header__ham-menu--open')
    ) {
      openMobileMenu();
    } else if (
      mediaQueryMax1366.matches &&
      !hamMenu.classList.contains('header__ham-menu--open')
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
      if (mediaQueryMin1366.matches) {
        openDesktopMenu(index);
        // Small screens
      } else if (mediaQueryMax1366.matches) {
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
  const openMenuRight = document.querySelector(
    '.full-menu--right.full-menu--expand'
  );
  // Large screens
  if (
    mediaQueryMin1366.matches &&
    openMenuLeft &&
    openMenuRight &&
    !openMenuLeft.contains(e.target) &&
    !openMenuRight.contains(e.target)
  ) {
    closeDesktopMenu();
    // Small screens
  } else if (
    mediaQueryMax1366.matches &&
    openMenuLeft &&
    openMenuRight &&
    !openMenuLeft.contains(e.target) &&
    !openMenuRight.contains(e.target)
  ) {
    closeMobileMenu();
  } else if (
    mediaQueryMax1366.matches &&
    !openMenuLeft &&
    openMenuRight &&
    headerNav &&
    !openMenuRight.contains(e.target) &&
    !headerNav.contains(e.target)
  ) {
    closeMobileMenu();
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

// Calendar initialization
// if (document.getElementById('color-calendar')) {
//   new Calendar({
//     id: '#color-calendar',
//     calendarSize: 'small',
//   });
// }

//// Playing with calendar
// const calendarBody = document.querySelector('.calendar__body');
// calendarBody.addEventListener('click', (e) => {
//   const calendarDay = document.querySelector('.calendar__day-selected');
//   const calendarHeader =
//     calendarDay.parentElement.parentElement.previousElementSibling;
//   const calendarMonth = calendarHeader.querySelector('.calendar__month');
//   const calendarYear = calendarHeader.querySelector('.calendar__year');
//   let day = calendarDay.firstElementChild.textContent;
//   let month = calendarMonth.textContent;
//   let year = calendarYear.textContent;
//   console.log(`See all events on ${day}/${month}/${year}`);
// });

// Swiper (slider) config
const newsSwiper = new Swiper('.news__swiper', {
  slidesPerView: 1,
  spaceBetween: 20,
  grabCursor: true,
  breakpoints: {
    1040: {
      slidesPerView: 1.5,
      spaceBetween: 30,
    },
    1350: {
      slidesPerView: 2.5,
      spaceBetween: 40,
    },
    2200: {
      slidesPerView: 3.5,
      spaceBetween: 60,
    },
  },
  navigation: {
    nextEl: '.news__swiper-button-next',
    prevEl: '.news__swiper-button-prev',
  },
});

const eventsSwiper = new Swiper('.events__swiper', {
  slidesPerView: 1,
  spaceBetween: 20,
  grabCursor: true,
  breakpoints: {
    1040: {
      slidesPerView: 1.5,
      spaceBetween: 20,
    },
    1350: {
      slidesPerView: 2.5,
      spaceBetween: 30,
    },
    1850: {
      slidesPerView: 3.5,
      spaceBetween: 50,
    },
  },
  navigation: {
    nextEl: '.events__swiper-button-next',
    prevEl: '.events__swiper-button-prev',
  },
});

const civilProtectionSwiper = new Swiper('.civil-protection__swiper', {
  slidesPerView: 1,
  spaceBetween: 20,
  grabCursor: true,
  breakpoints: {
    1040: {
      slidesPerView: 1.5,
      spaceBetween: 20,
    },
    1350: {
      slidesPerView: 2.5,
      spaceBetween: 30,
    },
    1850: {
      slidesPerView: 3.5,
      spaceBetween: 50,
    },
  },
  navigation: {
    nextEl: '.civil-protection__swiper-button-next',
    prevEl: '.civil-protection__swiper-button-prev',
  },
});
