document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const headerMain = document.querySelector(".header__main");
  const headerNav = document.querySelector(".header__nav");
  const submenu = document.querySelector(".header__submenu");
  const mediaQuery = window.matchMedia(`(max-width: 48em)`);

  setTimeout(() => {
    if (!mediaQuery.matches) {
      const firstLink = document.querySelector(".submenu-header__list-link");
      const firstBody = document.querySelector(".submenu-header__submenu-body");

      if (firstLink && firstBody) {
        firstLink.classList.add("_is-active");
        firstBody.classList.add("_is-active");
      }
    }
  }, 0);

  headerNav.addEventListener(
    "mouseenter",
    (e) => {
      const navItem = e.target.closest(".header__nav-item--has-submenu");
      if (!navItem) return;

      document.documentElement.classList.add("_show-submenu");

      if (!submenu.classList.contains("_is-active")) {
        submenu.classList.add("_is-active");
        setTimeout(() => {
          !mediaQuery.matches && submenu.setAttribute("aria-hidden", "false");
        }, 300);
      }
    },
    true
  );

  const closeSubmenu = () => {
    document.documentElement.classList.remove("_show-submenu");
    submenu.classList.remove("_is-active");
    setTimeout(() => {
      !mediaQuery.matches && submenu.setAttribute("aria-hidden", "true");
    }, 300);
  };
  header.addEventListener("mouseleave", closeSubmenu);
  headerMain.addEventListener("mouseenter", closeSubmenu);

  submenu.addEventListener(
    "mouseenter",
    (e) => {
      const listLink = e.target.closest(".submenu-header__list-link");
      if (listLink) {
        const list = listLink.closest(".submenu-header__list");
        const container = listLink.closest(".submenu-header");

        if (list && container) {
          const links = list.querySelectorAll(".submenu-header__list-link");
          const bodies = container.querySelectorAll(
            ".submenu-header__submenu-body"
          );
          const index = [...links].indexOf(listLink);
          if (index !== -1) {
            setActiveByIndex(links, bodies, index);
          }
        }

        return;
      }

      const sublistLink = e.target.closest(".submenu-header__sublist-link");
      if (sublistLink) {
        const sublist = sublistLink.closest(".submenu-header__sublist");
        const body = sublistLink.closest(".submenu-header__submenu-body");

        if (sublist && body) {
          const links = sublist.querySelectorAll(
            ".submenu-header__sublist-link"
          );
          const services = body.querySelectorAll(".submenu-header__services");
          const index = [...links].indexOf(sublistLink);
          if (index !== -1) {
            setActiveByIndex(links, services, index);
          }
        }
      }
    },
    true
  );

  submenu.addEventListener("click", (e) => {
    const btn = e.target.closest(".submenu-header__submenu-btn");
    if (!btn || !mediaQuery.matches) return;

    const body = btn.closest(".submenu-header__submenu-body");
    if (body) {
      const allButtons = document.querySelectorAll(
        ".submenu-header__submenu-btn"
      );

      document
        .querySelectorAll(".submenu-header__submenu-body._is-active")
        .forEach((el) => {
          if (el !== body) el.classList.remove("_is-active");
        });

      allButtons.forEach((b) => {
        if (b !== btn) b.setAttribute("aria-expanded", "false");
      });

      const isNowActive = body.classList.toggle("_is-active");
      btn.setAttribute("aria-expanded", isNowActive ? "true" : "false");
    }
  });

  const clearMobileStates = () => {
    if (!mediaQuery.matches) {
      document
        .querySelectorAll(".submenu-header__submenu-body._is-active")
        .forEach((el) => el.classList.remove("_is-active"));
    }
  };

  clearMobileStates();
  mediaQuery.addEventListener("change", clearMobileStates);

  function setActiveByIndex(links, bodies, index) {
    links.forEach((l) => l.classList.remove("_is-active"));
    bodies.forEach((b, i) => b.classList.toggle("_is-active", i === index));
    links[index].classList.add("_is-active");
  }
});
