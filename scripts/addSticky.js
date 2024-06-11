import { pages } from "./data/pages.js";
import { classesNotOpen } from "./openUtil.js";
import { renderAll, isContentEmpty } from "./renderAll.js";

const stickerWrapper = document.querySelector(".sticker-wrapper");
const addButton = document.querySelector(".add-sticky");

let state = "off";

function createIds() {
  const uuidArea = self.crypto.randomUUID();
  const uuidSticky = self.crypto.randomUUID();

  return [uuidArea, uuidSticky];
}

function openAddSticky(uuidArea, uuidSticky) {
  const stickerAdd = `
        <div class="sticker sticker-add" id=${uuidSticky}>
            <div class="button-wrapper">
                <div class="delete-button">
                    X
                </div>
            </div>

            <textarea placeholder="What's on your mind?" class="sticker-add-box" id="${uuidArea}"></textarea>
            <img src="" class="sticker-image">
    
            <div class="new-sticky">
                Add
            </div>
        </div>
        `;

  state = "on";
  stickerWrapper.innerHTML += stickerAdd;
}

function closeAddSticky(uuidSticky) {
  const thisSticker = document.getElementById(uuidSticky);
  thisSticker.remove();
  state = "off";
}

addButton.addEventListener("click", () => {
  for (const page in pages) {
    classesNotOpen(pages[page]);
  }

  stickerWrapper.classList.remove("hidden");
  stickerWrapper.style.transition = "all 1s ease";

  if (state == "off") {
    const [uuidArea, uuidSticky] = createIds();
    openAddSticky(uuidArea, uuidSticky);

    const textArea = document.getElementById(uuidArea);

    textArea.addEventListener("input", () => {
      textArea.style.height = "auto";
      textArea.style.height = `${textArea.scrollHeight}px`;
    });

    const deleteButton = document
      .getElementById(uuidSticky)
      .querySelector(".delete-button");

    deleteButton.addEventListener("click", () => {
      closeAddSticky(uuidSticky);
    });

    const newSticky = document.querySelector(".new-sticky");

    newSticky.addEventListener("click", () => {
      let stickys = JSON.parse(localStorage.getItem("stickys")) || [];
      const currentBoard = localStorage.getItem("currentBoard");

      const newStickyContent = textArea.value;

      if (isContentEmpty(newStickyContent) != true) {
        const stickyInfo = {
          content: newStickyContent,
          id: uuidSticky,
          board: currentBoard,
        };

        stickys.push(stickyInfo);
        localStorage.setItem("stickys", JSON.stringify(stickys));

        const thisSticker = document.getElementById(uuidSticky);
        thisSticker.remove();

        renderAll();

        state = "off";
      }
    });
  }
});
