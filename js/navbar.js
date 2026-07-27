
(function () {
  const thisScript = document.currentScript;

  document.addEventListener('DOMContentLoaded', async () => {

    const navbarContainer = document.getElementById('site-navbar');
    const navbarAlreadyInline = document.getElementById('navbar');

    if (navbarContainer && !navbarAlreadyInline) {
      let navbarUrl = '/components/navbar.html';
      if (thisScript && thisScript.src) {
        navbarUrl = new URL('../components/navbar.html', thisScript.src).href;
      }

      try {
        const response = await fetch(navbarUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch navbar.html: ${response.status} ${response.statusText}`);
        }
        navbarContainer.innerHTML = await response.text();
      } catch (err) {
        console.error('Error loading navbar:', err);
        return;
      }
    } else if (!navbarAlreadyInline) {
      console.warn('navbar.js: no #site-navbar placeholder or inline #navbar found on this page.');
      return;
    }


    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navbarMenu = document.getElementById('navbarMenu');
    const navbarOverlay = document.getElementById('navbarOverlay');
    const dropdown = document.getElementById('dropdown');
    const dropdownToggle = document.getElementById('dropdownToggle');
    const navClose = document.getElementById('navClose');





    const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
    const dirToggleBtns = document.querySelectorAll('.dir-toggle-btn');

    const htmlEl = document.documentElement;
    const MENU_BREAKPOINT = 1024; // header collapses to logo + hamburger at/under this width


    if (navbar) {
      window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 8);
      });
    }


    function openMobileMenu() {
      if (hamburger) hamburger.classList.add('active');
      if (navbarMenu) navbarMenu.classList.add('active');
      if (navbarOverlay) navbarOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
      if (hamburger) hamburger.classList.remove('active');
      if (navbarMenu) navbarMenu.classList.remove('active');
      if (navbarOverlay) navbarOverlay.classList.remove('active');
      document.body.style.overflow = '';
      if (dropdown) dropdown.classList.remove('open');
    }

    if (hamburger && navbarMenu) {
      hamburger.addEventListener('click', () => {
        if (navbarMenu.classList.contains('active')) {
          closeMobileMenu();
        } else {
          openMobileMenu();
        }
      });
    }

    if (navbarOverlay) {
      navbarOverlay.addEventListener('click', closeMobileMenu);
    }

    if (navClose) {
      navClose.addEventListener('click', closeMobileMenu);
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMobileMenu();
    });


    window.addEventListener('resize', () => {
      if (window.innerWidth > MENU_BREAKPOINT && navbarMenu && navbarMenu.classList.contains('active')) {
        closeMobileMenu();
      }
    });


    if (navbarMenu) {
      navbarMenu.querySelectorAll('.nav-link, .dropdown-link, .menu-cta a').forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth <= MENU_BREAKPOINT) closeMobileMenu();
        });
      });
    }


    if (dropdownToggle && dropdown) {
      dropdownToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropdown.classList.toggle('open');
      });

      document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
          dropdown.classList.remove('open');
        }
      });
    }




    function applyTheme(theme) {
      const isDark = theme === 'dark';
      document.body.classList.toggle('dark', isDark);
      try { localStorage.setItem('rentframe-theme', theme); } catch (e) { }
    }

    themeToggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const current = document.body.classList.contains('dark') ? 'dark' : 'light';
        applyTheme(current === 'dark' ? 'light' : 'dark');
      });
    });





    function applyDir(dir) {
      htmlEl.setAttribute('dir', dir);
      try { localStorage.setItem('rentframe-dir', dir); } catch (e) { }
    }

    dirToggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const current = htmlEl.getAttribute('dir') || 'ltr';
        applyDir(current === 'rtl' ? 'ltr' : 'rtl');
      });
    });


    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link, .dropdown-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.split('/').pop() === currentPath) {
        link.classList.add('active');
      }
    });
  });
})();

(function () {
  try {
    if (localStorage.getItem('rentframe-theme') === 'dark') {
      document.body.classList.add('dark');
    }
  } catch (e) { }
})();
