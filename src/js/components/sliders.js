import Swiper from "swiper";
import { EffectFade, Autoplay } from "swiper/modules";
import { animateProgress, setActive, updateAriaAttributes } from "../_utils.js";
Swiper.use([EffectFade, Autoplay]);

document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".hero__slider")) {
    const paginationItems = Array.from(
      document.querySelectorAll(".pagination-hero__item")
    );
    const progressElements = Array.from(
      document.querySelectorAll(".pagination-hero__progress")
    );
    let previousIndex = 0;

    const triggerProgress = (swiper) => {
      progressElements.forEach((el, idx) => {
        if (idx === swiper.activeIndex) {
          el.style.setProperty("--opacity", 1);
          el.style.setProperty("--scaleX", 0);
          animateProgress(el, swiper.params.autoplay.delay);
        } else {
          el.style.setProperty("--opacity", 0);
        }
      });
    };

    const slider = new Swiper(".hero__slider", {
      slidesPerView: "auto",
      speed: 1000,
      rewind: true,
      effect: "fade",
      //   autoplay: {
      //     delay: 5000,
      //     disableOnInteraction: false,
      //   },
      fadeEffect: {
        crossFade: true,
      },
      on: {
        init: (swiper) => {
          if (progressElements.length) {
            previousIndex = swiper.activeIndex;
            triggerProgress(swiper);
            updateAriaAttributes(paginationItems, swiper.activeIndex);
          }
        },
        slideChange: (swiper) => {
          setActive(paginationItems, paginationItems[swiper.activeIndex]);
          updateAriaAttributes(paginationItems, swiper.activeIndex);

          document
            .querySelectorAll(".slide-hero__btn")
            .forEach((btn, index) => {
              if (index === slider.activeIndex) {
                btn.removeAttribute("tabindex");
              } else {
                btn.setAttribute("tabindex", "-1");
              }
            });
        },
      },
    });

    if (progressElements) {
      slider.on("slideChangeTransitionStart", () => {
        const prev = progressElements[slider.previousIndex];
        if (prev) {
          animateProgress(prev, 200, true);
          prev.style.setProperty("--opacity", 0);
        }
      });
      slider.on("slideChangeTransitionEnd", () => {
        triggerProgress(slider);
      });
    }
    if (paginationItems.length) {
      document
        .querySelector(".pagination-hero")
        .addEventListener("click", function ({ target }) {
          if (target.closest(".pagination-hero__content")) {
            slider.slideTo(
              paginationItems.indexOf(target.closest(".pagination-hero__item"))
            );
          }
        });
    }
  }
});
