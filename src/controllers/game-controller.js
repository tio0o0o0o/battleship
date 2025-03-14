const GameView = require("../views/game-view.js");
const Player = require("../models/player.js");
const UI = require("../utility/ui.js");

const status = document.querySelector(".status");
const board1 = document.querySelector(".board1");
const board2 = document.querySelector(".board2");
const checklist = document.querySelector(".checklist");
const newGameButton = document.querySelector("#newGame");

const gameView = new GameView(board1, board2, checklist, status);

let human;
let computer;
let gameController;

class GameController {
  constructor(turn = "player1", shipsToPlace = [5, 4, 3, 3, 2]) {
    this.turn = turn;
    this.shipsToPlace = shipsToPlace;
  }

  initialize() {
    this.placeRandomShips(human.board);
    this.placeRandomShips(computer.board);
    this.updatePlayerUI();
    this.updateComputerUI();
    UI.assignFunction({
      elements: [newGameButton],
      functionToAssign: () => {
        newGame();
      },
    });
  }

  updatePlayerUI() {
    gameView.updatePlayerBoard(human.board);
  }

  updateComputerUI() {
    gameView.updateComputerBoard(computer.board);
    const board2Cells = document.querySelectorAll(".cell2");
    UI.assignFunction({
      elements: board2Cells,
      functionToAssign: (cell) => {
        this.player1Turn(cell.dataset.x, cell.dataset.y);
      },
    });
  }

  player1Turn(x, y) {
    if (this.turn === "player1" && !this.checkWin()) {
      computer.board.receiveAttack(x, y);
      this.updateComputerUI();
      this.turn = "player2";
      gameView.updateStatus(status, this.checkStatus());
      this.player2Turn();
    }
  }

  async player2Turn() {
    if (this.turn === "player2" && !this.checkWin()) {
      const target = await this.computerChoice();
      human.board.receiveAttack(target.x, target.y);
      this.updatePlayerUI();
      this.turn = "player1";
      gameView.updateStatus(status, this.checkStatus());
    }
  }

  static randInt(max) {
    return Math.floor(Math.random() * max);
  }

  async computerChoice(delay = 500) {
    const notAttacked = human.board.notAttacked();
    const randomInt = GameController.randInt(notAttacked.length);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(notAttacked[randomInt]);
      }, delay);
    });
  }

  checkWin() {
    if (human.board.allSunk()) return "player2";
    if (computer.board.allSunk()) return "player1";
    return false;
  }

  checkStatus() {
    const winStatus = this.checkWin();
    if (winStatus) {
      return `${winStatus} won`;
    }
    return `${this.turn} turn`;
  }

  placeRandomShips(board) {
    this.shipsToPlace.forEach((shipLength) => {
      while (true) {
        try {
          const randRotation = ["vertical", "horizontal"][
            GameController.randInt(2)
          ];
          const randX = GameController.randInt(board.size);
          const randY = GameController.randInt(board.size);
          board.placeShip(randX, randY, shipLength, randRotation);
          return;
        } catch {}
      }
    });
  }
}

function newGame() {
  human = new Player("YOU", "human", 10);
  computer = new Player("COMPUTER", "computer", 10);
  gameController = new GameController();
  gameController.initialize();
}

newGame();
