export const setActive = (
  elements,
  targetElement,
  activeClass = "_is-active"
) => {
  if (elements.length) {
    console.log(elements, targetElement);
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
