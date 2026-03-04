import { createObserver } from "./utils.js";

export function createAnimationObserver(options = {}) {
  const {
    selector = ".animated",
    showClass = "show",
    threshold = 0.3,
  } = options;

  function onIntersect(entries) {
    entries.forEach((e) => {
      e.target.classList.toggle(showClass, e.isIntersecting);
    });
  }

  function init() {
    const observables = Array.from(document.querySelectorAll(selector));
    if (!observables.length) return;

    const observer = createObserver(onIntersect, { threshold });
    observables.forEach((el) => observer.observe(el));
  }

  return { init };
}
