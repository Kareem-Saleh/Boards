import { pages } from "./data/pages.js";

const stickers = document.querySelector(".sticker-wrapper");

export function classesNotOpen(page) {
  page.state = false;
  page.button.classList.remove("active");
  page.content.classList.add("hidden");
  page.content.style.transition = "all 0.2s ease";
}

function pageOpen(page) {
  page.state = true;
  page.button.classList.add("active");
  page.content.classList.remove("hidden");
  page.content.style.transition = "all 1s ease";
  stickers.classList.add("hidden");
  stickers.style.transition = "all 0.2s ease";
}

function pageClose(page) {
  page.state = false;
  page.button.classList.remove("active");
  page.content.classList.add("hidden");
  page.content.style.transition = "all 0.2s ease";
  stickers.classList.remove("hidden");
  stickers.style.transition = "all 1s ease";
}

for (const page in pages) {
  (function (page) {
    pages[page].button.addEventListener("click", () => {
      const pageToOpen = page;

      for (const otherPage in pages) {
        if (otherPage != pageToOpen) {
          classesNotOpen(pages[otherPage]);
        } else {
          if (pages[pageToOpen].state == false) {
            pageOpen(pages[pageToOpen]);
          } else {
            pageClose(pages[pageToOpen]);
          }
        }
      }
    });
  })(page);
}

const openButton = document.querySelector(".utils-open-button");
const utilsButtons = document.querySelector(".util-buttons");

let state = false;

function openUtils() {
  if (window.innerWidth < 800) {
    openButton.addEventListener("click", () => {
      if (!state) {
        utilsButtons.style.display = "flex";
        state = true;
      } else {
        utilsButtons.style.display = "none";
        state = false;
      }
    });
  } else {
    utilsButtons.style.display = "flex";
  }
}

window.addEventListener("resize", () => {
  if (window.innerWidth < 800) {
    openButton.addEventListener("click", () => {
      if (!state) {
        utilsButtons.style.display = "flex";
        state = true;
      } else {
        utilsButtons.style.display = "none";
        state = false;
      }
    });
  } else {
    utilsButtons.style.display = "flex";
  }
});

openUtils();
