import smoothscroll from "smoothscroll-polyfill";

smoothscroll.polyfill();

export const setActive = (
  elements,
  targetElement,
  activeClass = "_is-active"
) => {
  if (elements.length) {
    elements.forEach((el) => el.classList.remove(activeClass));
    targetElement.classList.add(activeClass);
  }
};

const runningAnimations = new WeakMap();

export const animateProgress = (el, duration, fastFinish = false) => {
  if (runningAnimations.has(el)) {
    cancelAnimationFrame(runningAnimations.get(el));
    runningAnimations.delete(el);
  }

  const startValue =
    parseFloat(getComputedStyle(el).getPropertyValue("--scaleX")) || 0;
  const startTime = performance.now();
  const targetDuration = fastFinish ? 200 : duration;

  const step = (timestamp) => {
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / targetDuration, 1);
    const currentValue = startValue + (1 - startValue) * progress;

    el.style.setProperty("--scaleX", currentValue);

    if (progress < 1) {
      const frame = requestAnimationFrame(step);
      runningAnimations.set(el, frame);
    } else {
      runningAnimations.delete(el);
    }
  };

  const frame = requestAnimationFrame(step);
  runningAnimations.set(el, frame);
};

export function updateAriaAttributes(items, activeIndex) {
  items.forEach((item, idx) => {
    const button = item.querySelector("button");
    const isActive = idx === activeIndex;

    button.setAttribute("aria-expanded", String(isActive));

    if (isActive) {
      button.setAttribute("aria-current", "true");
    } else {
      button.removeAttribute("aria-current");
    }
  });
}

export const scrollToElementBottom = (
  element,
  offset = 0,
  behavior = "smooth"
) => {
  if (!element) return;

  const top = element.offsetTop;
  const height = element.offsetHeight;

  window.scrollTo({
    top: top + height + offset,
    behavior,
  });
};
