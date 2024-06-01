const stickers = document.querySelector(".sticker-wrapper");

pages = {
  aboutPage: {
    name: "aboutPage",
    state: false,
    button: document.querySelector(".about"),
    content: document.querySelector(".about-wrapper"),
  },

  themePage: {
    name: "themePage",
    state: false,
    button: document.querySelector(".change-theme"),
    content: document.querySelector(".change-theme-wrapper"),
  },

  addPage: {
    name: "addPage",
    state: false,
    button: document.querySelector(".add-sticky"),
    content: document.querySelector(".add-sticker-wrapper"),
  },

  boardPage: {
    name: "boardPage",
    state: false,
    button: document.querySelector(".open-boards"),
    content: document.querySelector(".boards-wrapper"),
  },

  rearrangePage: {
    name: "rearrangePage",
    state: false,
    button: document.querySelector(".rearrange-boards"),
    content: document.querySelector(".rearrange-wrapper"),
  },
};

for (const page in pages) {
  (function(page) {
    pages[page].button.addEventListener("click", () => {
      const pageToOpen = page;

      // if (pageToOpen == "addPage") {
      //   if (pages[pageToOpen].state == false) {
      //     pages[pageToOpen].state = true;
      //     pages[pageToOpen].button.classList.add("active");
      //     stickers.classList.remove("hidden");

      //     for (otherPage in pages) {
      //       if (otherPage != "addPage") {
      //         pages[otherPage].content.classList.add("hidden");
      //         pages[otherPage].content.style.transition = "all 0.2s ease";
      //         pages[otherPage].button.classList.remove("active");
      //       }
      //     }
      //   } else {
      //     pages[pageToOpen].state = false;
      //     pages[pageToOpen].button.classList.remove("active");
      //   };
      //    return
      // };

      for (otherPage in pages) {
        if (otherPage != pageToOpen) {
          // if (otherPage == "addPage") {
          //   continue;
          // }
          pages[otherPage].state = false;
          pages[otherPage].button.classList.remove("active");
          pages[otherPage].content.classList.add("hidden");
          pages[otherPage].content.style.transition = "all 0.2s ease";
          // pages["addPage"].state = false;
          // pages["addPage"].button.classList.remove("active");
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