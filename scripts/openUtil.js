import {pages} from "./data/pages.js"

const stickers = document.querySelector(".sticker-wrapper");

for (const page in pages) {
  (function(page) {
    pages[page].button.addEventListener("click", () => {
      const pageToOpen = page;

      for (const otherPage in pages) {
        if (otherPage != pageToOpen) {
          pages[otherPage].state = false;
          pages[otherPage].button.classList.remove("active");
          pages[otherPage].content.classList.add("hidden");
          pages[otherPage].content.style.transition = "all 0.2s ease";
        } else {
          if (pages[pageToOpen].state == false) {
            pages[pageToOpen].state = true;
            pages[pageToOpen].button.classList.add("active");
            pages[pageToOpen].content.classList.remove("hidden");
            pages[pageToOpen].content.style.transition = "all 1s ease";
            stickers.classList.add("hidden");
            stickers.style.transition = "all 0.2s ease";
          } else {
            pages[pageToOpen].state = false;
            pages[pageToOpen].button.classList.remove("active");
            pages[pageToOpen].content.classList.add("hidden");
            pages[pageToOpen].content.style.transition = "all 0.2s ease"
            stickers.classList.remove("hidden");
            stickers.style.transition = "all 1s ease";
          };
        };
      };
    });
  })(page);
};