// Данный файл - лишь собрание подключений готовых компонентов.
// Рекомендуется создавать отдельный файл в папке components и подключать все там

// Определение операционной системы на мобильных
// import { mobileCheck } from "./functions/mobile-check.js";
// console.log(mobileCheck())

// Определение ширины экрана
// import { isMobile, isTablet, isDesktop } from './functions/check-viewport';
// if (isDesktop()) {
//   console.log('...')
// }

// Троттлинг функции (для ресайза, ввода в инпут, скролла и т.д.)
// import { throttle } from './functions/throttle';
// let yourFunc = () => { console.log('throttle') };
// let func = throttle(yourFunc);
// window.addEventListener('resize', func);

// Фикс фулскрин-блоков
// import './functions/fix-fullheight';

// Реализация бургер-меню
// import { burger } from './functions/burger';

// Реализация остановки скролла (не забудьте вызвать функцию)
// import { disableScroll } from './functions/disable-scroll';

// Реализация включения скролла (не забудьте вызвать функцию)
// import { enableScroll } from './functions/enable-scroll';

// Реализация модального окна
// import GraphModal from 'graph-modal';
// const modal = new GraphModal();

// Реализация табов
// import GraphTabs from 'graph-tabs';
// const tabs = new GraphTabs('tab');

// Получение высоты шапки сайта (не забудьте вызвать функцию)
// import { getHeaderHeight } from './functions/header-height';

// Подключение плагина кастом-скролла
// import 'simplebar';

// Подключение плагина для позиционирования тултипов
// import { createPopper, right} from '@popperjs/core';
// createPopper(el, tooltip, {
//   placement: 'right'
// });

// Подключение свайпера
import Swiper from "swiper";
import { EffectFade, Autoplay } from "swiper/modules";
import { animateProgress, setActive } from "./_utils.js";
Swiper.use([EffectFade, Autoplay]);
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
    effect: "fade",
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    fadeEffect: {
      crossFade: true,
    },
    on: {
      init: (swiper) => {
        if (progressElements.length) {
          previousIndex = swiper.activeIndex;
          triggerProgress(swiper);
        }
      },
      slideChange: (swiper) => {
        setActive(paginationItems, paginationItems[swiper.activeIndex]);
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

// Подключение анимаций по скроллу
// import AOS from 'aos';
// AOS.init();

// Подключение параллакса блоков при скролле
// import Rellax from 'rellax';
// const rellax = new Rellax('.rellax');

// Подключение плавной прокрутки к якорям
// import SmoothScroll from 'smooth-scroll';
// const scroll = new SmoothScroll('a[href*="#"]');

// Подключение событий свайпа на мобильных
// import 'swiped-events';
// document.addEventListener('swiped', function(e) {
//   console.log(e.target);
//   console.log(e.detail);
//   console.log(e.detail.dir);
// });

// import { validateForms } from './functions/validate-forms';
// const rules1 = [...];

// const afterForm = () => {
//   console.log('Произошла отправка, тут можно писать любые действия');
// };

// validateForms('.form-1', rules1, afterForm);
