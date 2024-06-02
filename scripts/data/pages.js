export const pages = {
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
  
    // addPage: {
    //   name: "addPage",
    //   state: false,
    //   button: document.querySelector(".add-sticky"),
    //   content: document.querySelector(".add-sticker-wrapper"),
    // },
  
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