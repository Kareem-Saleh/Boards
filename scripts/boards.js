const boardName = document.querySelector(".board-name");
const boardWrapper = document.querySelector(".boards-wrapper");

let state = "off";

const defaultBoard = {
    name: "MY BØARD",
    id: "default-board",
};

let currentBoard = localStorage.getItem("currentBoard") || "default-board";
let storedBoards = JSON.parse(localStorage.getItem("boards"));

if (storedBoards == null) {
    localStorage.setItem("boards", JSON.stringify([defaultBoard]));
    storedBoards = JSON.parse(localStorage.getItem("boards"));
};

if (storedBoards.length == 0) {
    localStorage.setItem("boards", JSON.stringify([defaultBoard]));
    storedBoards = JSON.parse(localStorage.getItem("boards"));
};

let boards = JSON.parse(localStorage.getItem("boards"));

function changeBoardNameHeader(currentBoard) {
    const boards = JSON.parse(localStorage.getItem("boards"));
    for (let i = 0; i < boards.length; i++) {
        if (boards[i].id == currentBoard) {
            boardName.innerHTML = `${boards[i].name}`;
        };
    };
};

renderBoard(currentBoard);

changeBoardNameHeader(currentBoard);

function renderBoard(currentId) {
    const renderBoards = JSON.parse(localStorage.getItem("boards"));

    boardWrapper.innerHTML = "";

    renderBoards.forEach(board => {
        if (board.id == currentId) {
            boardWrapper.innerHTML += `
            <div class="board active-board" id="${board.id}">
                <div class="board-name-saved" onclick="selectBoard('${board.id}')">${board.name}</div>
                <div class="board-delete" onclick="deleteBoard('${board.id}')">X</div>
            </div>
            `;
        } else {
            boardWrapper.innerHTML += `
            <div class="board" id="${board.id}">
              <div class="board-name-saved" onclick="selectBoard('${board.id}')">${board.name}</div>
              <div class="board-delete" onclick="deleteBoard('${board.id}')">X</div>
            </div>
            `;
        };
    });
    currentBoard = localStorage.getItem("currentBoard")

    boardWrapper.innerHTML += `
    <div class="board">
        <div class="board-add" onclick="addBoard('${currentBoard}')">+</div>
    </div>
    `;

    renderAll();
};

boardName.addEventListener("click", () => {
    if (state == "off") {
        boardName.innerHTML = `
        <input type="text" placeholder="New Name"class="board-name-edit">
        `;

        state = "on";
        
        input = document.querySelector(".board-name-edit");
        input.addEventListener("keyup", (e) => {
            if (e.key === "Enter") {
                if (input.value.trim() == "") {
                    return;
                };

                boardName.innerHTML = `${input.value}`;
                state = "off";
                
                currentBoard = localStorage.getItem("currentBoard");

                for (let i = 0; i < boards.length; i++) {
                    if (boards[i].id == currentBoard) {
                        boards[i].name = input.value;
                        localStorage.setItem("boards", JSON.stringify(boards));
                        renderBoard(boards[i].id);
                    };
                };

            };
        });
    };
});

function addBoard(id) {
    const uuidBoard = self.crypto.randomUUID();
    const uuidSticky = self.crypto.randomUUID();
    
    const newBoard = {
        name: "MY BØARD",
        id: uuidBoard,
    };

    const defaultSticky = {
        content: "This your first sticky on the board! Lets get organised and add more stickys to the board.",
        id: uuidSticky,
        board: uuidBoard,
    };
    
    boards.push(newBoard);
    localStorage.setItem("boards", JSON.stringify(boards));

    stickys = JSON.parse(localStorage.getItem("stickys"));
    stickys.push(defaultSticky);
    localStorage.setItem("stickys", JSON.stringify(stickys));
    
    renderBoard(id);
};

function deleteBoard(id) {
    boards = JSON.parse(localStorage.getItem("boards"));
    stickys = JSON.parse(localStorage.getItem("stickys"));
    
    for (let i = 0; i < boards.length; i++) {
        if (boards[i].id == id) {
            deletedAll = false;

            while (deletedAll == false) {
                deleted = [];

                for (let j = 0; j < stickys.length; j++) {
                    if (stickys[j].board == boards[i].id) {
                        deleted.push(stickys[i]);
                        stickys.splice(j, 1);
                    };
                };

                if (deleted.length == 0) {
                    deletedAll = true;
                };
            };
                
            localStorage.setItem("stickys", JSON.stringify(stickys));

            boards.splice(i, 1);
            localStorage.setItem("boards", JSON.stringify(boards));

            boards = JSON.parse(localStorage.getItem("boards"));
            if (boards.length == 0) {
                boards.push(defaultBoard);
                currentBoard = defaultBoard.id;
                localStorage.setItem("boards", JSON.stringify(boards));
                localStorage.setItem("currentBoard", currentBoard);
                localStorage.setItem("stickys", JSON.stringify(defaultSticky));
                renderBoard(currentBoard);
                changeBoardNameHeader(currentBoard);
                renderAll();
                break;
            } else {
                currentBoard = boards[boards.length - 1].id;
                localStorage.setItem("currentBoard", currentBoard);
                renderBoard(currentBoard);
                changeBoardNameHeader(currentBoard);
                renderAll();
                break;
            };
        };
    };
};

function checkZeroStickys(id) {
    const stickys = JSON.parse(localStorage.getItem("stickys"));
    let noStickys = true;

    stickys.forEach(sticky => {
        if (sticky.board == id) {
            noStickys = false;
        };
    });

    if (noStickys == true) {
        console.log(id)

        const uuidSticky = self.crypto.randomUUID();

        const defaultSticky = {
            content: "This your first sticky on the board! Lets get organised and add more stickys to the board.",
            id: uuidSticky,
            board: id,
        };

        stickys.push(defaultSticky);
        localStorage.setItem("stickys", JSON.stringify(stickys));
    };
};

function selectBoard(id) {
    localStorage.setItem("currentBoard", id);
    changeBoardNameHeader(id);
    renderBoard(id);
    checkZeroStickys(id);
    renderAll();
};