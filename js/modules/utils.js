// small utils for dom and observers
export function $(selector) {
  return document.querySelector(selector);
}

export function $all(selector) {
  return Array.from(document.querySelectorAll(selector));
}

export function createObserver(callback, options = { threshold: 0.3 }) {
  return new IntersectionObserver(callback, options);
}
