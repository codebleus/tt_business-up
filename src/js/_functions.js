import { scrollToElementBottom } from "./_utils.js";

document.addEventListener("DOMContentLoaded", () => {
  // scroll to
  if (document.querySelector(".hero__scroll-down")) {
    const scrollBtn = document.querySelector(".hero__scroll-down");
    scrollBtn.addEventListener("click", () => {
      scrollToElementBottom(document.querySelector(".hero"));
    });
  }
});
