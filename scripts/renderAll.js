const stickerWrapper = document.querySelector(".sticker-wrapper");

const defaultSticky = [{
    content: "This your first sticky on the board! Lets get organised and add more stickys to the board.",
    id: "default",
}];

if (JSON.parse(localStorage.getItem("stickys")) == null) {
    localStorage.setItem("stickys", [JSON.stringify(defaultSticky)]);
};

if (JSON.parse(localStorage.getItem("stickys")).length == 0) {
    localStorage.setItem("stickys", [JSON.stringify(defaultSticky)]);
};

function deleteSticky(id) {
    const stickys = JSON.parse(localStorage.getItem("stickys"));

    for (let i = 0; i < stickys.length; i++) {
        if (stickys[i].id == id) {
            stickys.splice(i, 1);
            localStorage.setItem("stickys", JSON.stringify(stickys));
            break;
        };
    };

    renderAll();
};

function pinSticky(id) {
    console.log("hi");
    const stickys = JSON.parse(localStorage.getItem("stickys"));

    for (let i = 0; i < stickys.length; i++) {
        if (stickys[i].id == id) {
            const pinnedSticky = stickys[i]
            stickys.splice(i, 1);
            stickys.splice(0, 0, pinnedSticky);
            localStorage.setItem("stickys", JSON.stringify(stickys));
            break;
        };
    };

    renderAll();
};

function editSticky(id) {
    const stickys = JSON.parse(localStorage.getItem("stickys"));
    let thisSticky = null;
    
    for (let i = 0; i < stickys.length; i++) {
        if (stickys[i].id == id) {
            thisSticky = stickys[i];
            break;
        };
    };

    const editedSticky = document.getElementById(id);
    
    editedSticky.innerHTML = `
    <div class="sticker sticker-add" id=${id}>
        <div class="button-wrapper">
            <div class="delete-button">
                X
            </div>
        </div>

        <textarea placeholder="" class="sticker-add-box" id="${id}"></textarea>
        <img src="" class="sticker-image">
    
        <div class="new-sticky">
            Add
        </div>
    </div>
    `;

    const textArea = document.getElementById(id).querySelector(".sticker-add-box");
    textArea.value = thisSticky.content;
    textArea.addEventListener("input", () => {
        textArea.style.height = "auto";
        textArea.style.height = `${textArea.scrollHeight}px`;
    });

    const deleteButton = document.getElementById(id).querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
        editedSticky.innerHTML = `
        <div class="sticker" id=${thisSticky.id}>
            <div class="button-wrapper">
                <div class="delete-button" onclick="deleteSticky('${thisSticky.id}')">
                    X
                </div>
                <div class="edit-button" onclick="editSticky('${thisSticky.id}')">
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
                <div class="pin-button" onclick="pinSticky('${thisSticky.id}')">
                    <svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 5C6.5 4.44772 6.94772 4 7.5 4H9H15H16.5C17.0523 4 17.5 4.44772 17.5 5C17.5 5.55228 17.0523 6 16.5 6H16.095L16.9132 15H19C19.5523 15 20 15.4477 20 16C20 16.5523 19.5523 17 19 17H16H13V22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22V17H8H5C4.44772 17 4 16.5523 4 16C4 15.4477 4.44772 15 5 15H7.08679L7.90497 6H7.5C6.94772 6 6.5 5.55228 6.5 5ZM9.91321 6L9.09503 15H12H14.905L14.0868 6H9.91321Z"/>
                    </svg>
                </div>
            </div>
            
            <div class="sticker-text">${thisSticky.content}</div>
            <img src="" class="sticker-image">
        </div>
        `;
    });

    const newSticky = document.getElementById(id).querySelector(".new-sticky");
    newSticky.addEventListener("click", () => {
        let stickys = JSON.parse(localStorage.getItem("stickys"));
        let thisStickyIndex = null;

        for (let i = 0; i < stickys.length; i++) {
            if (stickys[i].id == id) {
                thisStickyIndex = i;
                break;
            };
        };

        const newStickyContent = textArea.value;

        if (newStickyContent.trim() == "") {
            textArea.value = "Oi! Enter something!";
            return;
        };

        const stickyInfo = {
            content: newStickyContent,
            id: id,
        };

        stickys.splice(thisStickyIndex, 1);
        stickys.splice(thisStickyIndex, 0, stickyInfo);
        localStorage.setItem("stickys", JSON.stringify(stickys));

        renderAll();
    });
};

function renderAll() {
    stickerWrapper.innerHTML = "";
    const stickys = JSON.parse(localStorage.getItem("stickys"));

    stickys.forEach(sticky => {
        const stickyAdd = `
            <div class="sticker" id=${sticky.id}>
                <div class="button-wrapper">
                    <div class="delete-button" onclick="deleteSticky('${sticky.id}')">
                        X
                    </div>
                    <div class="edit-button" onclick="editSticky('${sticky.id}')">
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
                    <div class="pin-button" onclick="pinSticky('${sticky.id}')">
                        <svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 5C6.5 4.44772 6.94772 4 7.5 4H9H15H16.5C17.0523 4 17.5 4.44772 17.5 5C17.5 5.55228 17.0523 6 16.5 6H16.095L16.9132 15H19C19.5523 15 20 15.4477 20 16C20 16.5523 19.5523 17 19 17H16H13V22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22V17H8H5C4.44772 17 4 16.5523 4 16C4 15.4477 4.44772 15 5 15H7.08679L7.90497 6H7.5C6.94772 6 6.5 5.55228 6.5 5ZM9.91321 6L9.09503 15H12H14.905L14.0868 6H9.91321Z"/>
                        </svg>
                    </div>
                </div>
            
                <div class="sticker-text">${sticky.content}</div>
                <img src="" class="sticker-image">
            </div>
        `;

        stickerWrapper.innerHTML += stickyAdd;
    });
};

renderAll();