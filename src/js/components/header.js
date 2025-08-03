document.addEventListener("DOMContentLoaded", () => {
  const submenu = document.querySelector(".header__submenu");
  const hamburger = document.querySelector(".hamburger");

  const toggleHeaderScrollClass = () => {
    if (window.scrollY > 0) {
      document.documentElement.classList.add("_header-scroll");
    } else {
      document.documentElement.classList.remove("_header-scroll");
    }
  };

  const toggleMobileMenu = () => {
    const isActive = document.documentElement.classList.toggle("_show-menu");
    document.body.style.overflow = isActive ? "hidden" : "";

    hamburger.setAttribute("aria-expanded", `${isActive}`);
    submenu &&
      setTimeout(() => {
        submenu.setAttribute("aria-hidden", `${!isActive}`);
      }, 300);
  };

  hamburger.addEventListener("click", toggleMobileMenu);

  const mediaQuery = window.matchMedia(`(min-width: 48.01em)`);

  const resetMenuOnDesktop = () => {
    if (mediaQuery.matches) {
      document.documentElement.classList.remove("_show-menu");
      document.body.style.overflow = "";
      hamburger.setAttribute("aria-expanded", "false");
      submenu &&
        setTimeout(() => {
          submenu.setAttribute("aria-hidden", "true");
        }, 300);
    }
  };

  mediaQuery.addEventListener("change", resetMenuOnDesktop);

  toggleHeaderScrollClass();
  window.addEventListener("scroll", toggleHeaderScrollClass);
});
