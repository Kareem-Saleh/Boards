import {pages} from "./data/pages.js"

const stickerWrapper = document.querySelector(".sticker-wrapper");
const addButton = document.querySelector(".add-sticky");

let state = "off";

addButton.addEventListener("click", () => {
    for (const page in pages) {
        pages[page].state = false;
        pages[page].button.classList.remove("active");
        pages[page].content.classList.add("hidden");
        pages[page].content.style.transition = "all 0.2s ease";
      };
    
    stickerWrapper.classList.remove("hidden");
    stickerWrapper.style.transition = "all 1s ease";
    
    if (state == "off") {
        const uuidArea = self.crypto.randomUUID();
        const uuidSticky = self.crypto.randomUUID();
    
        const stickerAdd = `
        <div class="sticker sticker-add" id=${uuidSticky}>
            <div class="button-wrapper">
                <div class="delete-button">
                    X
                </div>
                <div class="edit-button">
                    <svg height="800px" width="800px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"  xml:space="preserve">
                        <g>
                            <path class="st0" d="M325.286,26.796C325.258,11.99,313.287-0.014,298.496,0l-84.999,0.014c-14.806,0-26.804,11.991-26.804,26.783
                            V81.91l138.606-0.022L325.286,26.796z"/>
                            <polygon class="st0" points="186.714,395.44 186.729,395.454 256.029,512 325.307,395.433 	"/>
                            <path class="st0" d="M325.299,364.963l-0.006-257.854l-138.6-0.021l0.035,257.882L325.299,364.963z M214.44,138.62h31.504
                            l-0.034,169.175l-31.469-0.014V138.62z"/>
                        </g>
                    </svg>
                </div>
                <div class="pin-button">
                    <svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 5C6.5 4.44772 6.94772 4 7.5 4H9H15H16.5C17.0523 4 17.5 4.44772 17.5 5C17.5 5.55228 17.0523 6 16.5 6H16.095L16.9132 15H19C19.5523 15 20 15.4477 20 16C20 16.5523 19.5523 17 19 17H16H13V22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22V17H8H5C4.44772 17 4 16.5523 4 16C4 15.4477 4.44772 15 5 15H7.08679L7.90497 6H7.5C6.94772 6 6.5 5.55228 6.5 5ZM9.91321 6L9.09503 15H12H14.905L14.0868 6H9.91321Z"/>
                </svg>
            </div>
        </div>
    
            <textarea placeholder="What's on your mind?" class="sticker-add-box" id="${uuidArea}"></textarea>
            <img src="" class="sticker-image">
    
            <div class="new-sticky">
                Add
            </div>
        </div>
        `
        state = "on";
        stickerWrapper.innerHTML += stickerAdd;
    
        const textArea = document.getElementById(uuidArea);
        textArea.addEventListener("input", () => {
            textArea.style.height = "auto";
            textArea.style.height = `${textArea.scrollHeight}px`;
        });

        const deleteButton = document.getElementById(uuidSticky).querySelector(".delete-button");
        deleteButton.addEventListener("click", () => {
            const thisSticker = document.getElementById(uuidSticky);
            thisSticker.remove();
            state = "off";
        })
    
        const newSticky = document.querySelector(".new-sticky");
        newSticky.addEventListener("click", () => {
            let stickys = JSON.parse(localStorage.getItem("stickys")) || [];

            const newStickyContent = textArea.value;

            if (newStickyContent.trim() == "") {
                textArea.value = "Oi! Enter something!";
                return;
            };

            const stickyInfo = {
                content: newStickyContent,
                id: uuidSticky,
            };

            stickys.push(stickyInfo);
            localStorage.setItem("stickys", JSON.stringify(stickys));

            const stickerAdd =`
                <div class="sticker" id=${uuidSticky}>
                    <div class="button-wrapper">
                        <div class="delete-button">
                        X
                        </div>
                        <div class="edit-button">
                        <svg height="800px" width="800px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"  xml:space="preserve">
                            <g>
                            <path class="st0" d="M325.286,26.796C325.258,11.99,313.287-0.014,298.496,0l-84.999,0.014c-14.806,0-26.804,11.991-26.804,26.783
                                V81.91l138.606-0.022L325.286,26.796z"/>
                            <polygon class="st0" points="186.714,395.44 186.729,395.454 256.029,512 325.307,395.433 	"/>
                            <path class="st0" d="M325.299,364.963l-0.006-257.854l-138.6-0.021l0.035,257.882L325.299,364.963z M214.44,138.62h31.504
                                l-0.034,169.175l-31.469-0.014V138.62z"/>
                            </g>
                        </svg>
                        </div>
                        <div class="pin-button">
                        <svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 5C6.5 4.44772 6.94772 4 7.5 4H9H15H16.5C17.0523 4 17.5 4.44772 17.5 5C17.5 5.55228 17.0523 6 16.5 6H16.095L16.9132 15H19C19.5523 15 20 15.4477 20 16C20 16.5523 19.5523 17 19 17H16H13V22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22V17H8H5C4.44772 17 4 16.5523 4 16C4 15.4477 4.44772 15 5 15H7.08679L7.90497 6H7.5C6.94772 6 6.5 5.55228 6.5 5ZM9.91321 6L9.09503 15H12H14.905L14.0868 6H9.91321Z"/>
                        </svg>
                        </div>
                    </div>
            
                    <div class="sticker-text">${newStickyContent}</div>
                    <img src="" class="sticker-image">
                    </div>
            `;

            const thisSticker = document.getElementById(uuidSticky);
            thisSticker.remove();

            renderAll();

            state = "off";
        });
    };
});