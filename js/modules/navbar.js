import { $, $all, createObserver } from "./utils.js";

// factory returns controller object with init
export function createNavbar(options = {}) {
  const {
    navbarSelector = ".navbar",
    linkSelector = ".navbar_link",
    activeClass = "navbar_link-active",
    showClass = "navbar--show",
    toggleButtonId = "control-menu",
    sectionContainer = "#main",
    sectionTag = "section",
    observerThreshold = 0.3,
  } = options;

  const navbar = $(navbarSelector);
  const navbarLinks = $all(linkSelector);
  const controlMenu = document.getElementById(toggleButtonId);

  function onLinkClick(e) {
    const clicked = e.currentTarget;
    navbarLinks.forEach((sib) => sib.classList.remove(activeClass));
    clicked.classList.add(activeClass);
  }

  function enableLinkTracking() {
    navbarLinks.forEach((link) => {
      link.addEventListener("click", onLinkClick);
    });
  }

  function onIntersection(entries) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const matching = document.querySelector(
        `${navbarLinks[0].tagName.toLowerCase()}[href*="#${entry.target.id}"]`,
      );
      if (!matching) return;

      navbarLinks.forEach((link) => link.classList.remove(activeClass));
      matching.classList.add(activeClass);
    });
  }

  function enableScrollTracking() {
    const sections = Array.from(
      document.querySelectorAll(`${sectionContainer} ${sectionTag}`),
    );

    const observer = createObserver(onIntersection, {
      threshold: observerThreshold,
    });

    sections.forEach((sec) => observer.observe(sec));
  }

  function init() {
    if (!navbar || !controlMenu) return;

    controlMenu.addEventListener("click", () => {
      navbar.classList.toggle(showClass);
      controlMenu.classList.toggle("controls_menu--close");
    });

    enableLinkTracking();
    enableScrollTracking();
  }

  return { init };
}
