const GameView = require("../views/game-view.js");
const Player = require("../models/player.js");
const UI = require("../utility/ui.js");

const status = document.querySelector(".status");
const board1 = document.querySelector(".board1");
const board2 = document.querySelector(".board2");
const checklist = document.querySelector(".checklist");

const gameView = new GameView(board1, board2, checklist, status);
const human = new Player("YOU", "human", 10);
const computer = new Player("COMPUTER", "computer", 10);

human.board.placeShip(0, 0, 2, "horizontal");
human.board.placeShip(3, 2, 3, "vertical");
human.board.placeShip(6, 4, 4, "horizontal");
human.board.placeShip(8, 7, 3, "vertical");

human.board.receiveAttack(0, 0);
human.board.receiveAttack(3, 2);
human.board.receiveAttack(6, 4);
human.board.receiveAttack(8, 7);
human.board.receiveAttack(1, 0);
human.board.receiveAttack(9, 9);

computer.board.placeShip(0, 0, 2, "horizontal");
computer.board.placeShip(3, 2, 3, "vertical");
computer.board.placeShip(6, 4, 4, "horizontal");
computer.board.placeShip(8, 7, 3, "vertical");
computer.board.receiveAttack(0, 0);
computer.board.receiveAttack(3, 2);
computer.board.receiveAttack(6, 4);
computer.board.receiveAttack(8, 7);
computer.board.receiveAttack(1, 0);
computer.board.receiveAttack(9, 9);

class GameController {
  constructor(turn = "player1") {
    this.turn = turn;
  }

  initializeUI() {
    this.updatePlayerUI();
    this.updateComputerUI();
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

  async computerChoice(delay = 500) {
    const notAttacked = human.board.notAttacked();
    const randomInt = Math.floor(Math.random() * notAttacked.length);
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
}

const gameController = new GameController();
gameController.initializeUI();
human.board.notAttacked();
