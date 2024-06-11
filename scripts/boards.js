import { renderAll } from "./renderAll.js";

const boardName = document.querySelector(".board-name");
const boardWrapper = document.querySelector(".boards-wrapper");

let state = "off";

const defaultBoard = {
  name: "MY BØARD",
  id: "default-board",
};

let currentBoard = localStorage.getItem("currentBoard") || "default-board";
let storedBoards = JSON.parse(localStorage.getItem("boards"));

checkLocalStorage();
renderBoard(currentBoard);
changeBoardNameHeader(currentBoard);

function checkLocalStorage() {
  if (storedBoards == null) {
    localStorage.setItem("boards", JSON.stringify([defaultBoard]));
    storedBoards = JSON.parse(localStorage.getItem("boards"));
  }

  if (storedBoards.length == 0) {
    localStorage.setItem("boards", JSON.stringify([defaultBoard]));
    storedBoards = JSON.parse(localStorage.getItem("boards"));
  }
}

function changeBoardNameHeader(currentBoard) {
  const boards = JSON.parse(localStorage.getItem("boards"));

  for (let i = 0; i < boards.length; i++) {
    if (boards[i].id == currentBoard) {
      boardName.innerHTML = `${boards[i].name}`;
      return;
    }
  }
}

function renderBoard(currentId) {
  const renderBoards = JSON.parse(localStorage.getItem("boards"));

  boardWrapper.innerHTML = "";

  renderBoards.forEach((board) => {
    if (board.id == currentId) {
      boardWrapper.innerHTML += `
            <div class="board active-board" id="${board.id}">
                <div class="board-name-saved" id="${board.id}">${board.name}</div>
                <div class="board-delete" id="${board.id}">X</div>
            </div>
            `;
    } else {
      boardWrapper.innerHTML += `
            <div class="board" id="${board.id}">
              <div class="board-name-saved" id="${board.id}">${board.name}</div>
              <div class="board-delete" id="${board.id}">X</div>
            </div>
            `;
    }
  });

  boardWrapper.innerHTML += `
  <div class="board">
  <div class="board-add">+</div>
  </div>
  `;

  addAddButton(currentId);
  renderAll();
}

boardName.addEventListener("click", () => {
  if (state == "off") {
    boardName.innerHTML = `
        <input type="text" placeholder="New Name"class="board-name-edit">
        `;

    state = "on";

    const input = document.querySelector(".board-name-edit");

    input.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        if (input.value.trim() == "") {
          return;
        }

        boardName.innerHTML = `${input.value}`;
        state = "off";

        currentBoard = localStorage.getItem("currentBoard");

        const boards = JSON.parse(localStorage.getItem("boards"));

        for (let i = 0; i < boards.length; i++) {
          if (boards[i].id == currentBoard) {
            boards[i].name = input.value;
            localStorage.setItem("boards", JSON.stringify(boards));
            renderBoard(boards[i].id);
          }
        }
      }
    });
  }
});

function addBoard(id) {
  const uuidBoard = self.crypto.randomUUID();
  const uuidSticky = self.crypto.randomUUID();

  const newBoard = {
    name: "MY BØARD",
    id: uuidBoard,
  };

  const defaultSticky = {
    content:
      "This your first sticky on the board! Lets get organised and add more stickys to the board.",
    id: uuidSticky,
    board: uuidBoard,
  };

  let boards = JSON.parse(localStorage.getItem("boards"));
  boards.push(newBoard);
  localStorage.setItem("boards", JSON.stringify(boards));

  let stickys = JSON.parse(localStorage.getItem("stickys"));
  stickys.push(defaultSticky);
  localStorage.setItem("stickys", JSON.stringify(stickys));

  renderBoard(id);
}

function deleteBoard(id) {
  let boards = JSON.parse(localStorage.getItem("boards"));
  const stickys = JSON.parse(localStorage.getItem("stickys"));

  for (let i = 0; i < boards.length; i++) {
    if (boards[i].id == id) {
      let deletedAll = false;

      while (deletedAll == false) {
        let deleted = [];

        for (let j = 0; j < stickys.length; j++) {
          if (stickys[j].board == boards[i].id) {
            deleted.push(stickys[i]);
            stickys.splice(j, 1);
          }
        }

        if (deleted.length == 0) {
          deletedAll = true;
        }
      }

      localStorage.setItem("stickys", JSON.stringify(stickys));

      boards.splice(i, 1);
      localStorage.setItem("boards", JSON.stringify(boards));

      boards = JSON.parse(localStorage.getItem("boards"));
      if (boards.length == 0) {
        const defaultSticky = [
          {
            content:
              "This your first sticky on the board! Lets get organised and add more stickys to the board.",
            id: "default",
            board: "default-board",
          },
        ];

        boards.push(defaultBoard);
        const currentBoard = defaultBoard.id;
        localStorage.setItem("boards", JSON.stringify(boards));
        localStorage.setItem("currentBoard", currentBoard);
        localStorage.setItem("stickys", JSON.stringify(defaultSticky));
        renderBoard(currentBoard);
        changeBoardNameHeader(currentBoard);
        renderAll();
        return;
      } else {
        let currentBoard = localStorage.getItem("currentBoard");

        if (currentBoard == id) {
          currentBoard = boards[boards.length - 1].id;
          localStorage.setItem("currentBoard", currentBoard);
        }

        // currentBoard = boards[boards.length - 1].id;

        renderBoard(currentBoard);
        changeBoardNameHeader(currentBoard);
        renderAll();
        return;
      }
    }
  }
}

function checkZeroStickys(id) {
  const stickys = JSON.parse(localStorage.getItem("stickys"));
  let noStickys = true;

  stickys.forEach((sticky) => {
    if (sticky.board == id) {
      noStickys = false;
    }
  });

  if (noStickys == true) {
    addDefaultSticky(id, stickys);
    //   const uuidSticky = self.crypto.randomUUID();

    //   const defaultSticky = {
    //     content:
    //       "This your first sticky on the board! Lets get organised and add more stickys to the board.",
    //     id: uuidSticky,
    //     board: id,
    //   };

    //   stickys.push(defaultSticky);
    //   localStorage.setItem("stickys", JSON.stringify(stickys));
  }
}

function addDefaultSticky(id, stickys) {
  const uuidSticky = self.crypto.randomUUID();

  const defaultSticky = {
    content:
      "This your first sticky on the board! Lets get organised and add more stickys to the board.",
    id: uuidSticky,
    board: id,
  };

  stickys.push(defaultSticky);
  localStorage.setItem("stickys", JSON.stringify(stickys));
}

function selectBoard(id) {
  localStorage.setItem("currentBoard", id);
  changeBoardNameHeader(id);
  renderBoard(id);
  checkZeroStickys(id);
  renderAll();
}

document.addEventListener("DOMContentLoaded", () => {
  boardWrapper.addEventListener("click", (e) => {
    if (e.target.classList.contains("board-name-saved")) {
      selectBoard(e.target.id);
    }

    if (e.target.classList.contains("board-delete")) {
      deleteBoard(e.target.id);
    }
  });
});

function addAddButton(id) {
  const addButton = document.querySelector(".board-add");

  addButton.addEventListener("click", () => {
    addBoard(id);
  });
}
