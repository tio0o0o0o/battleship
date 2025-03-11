class PlayerIconDictionary {
  static 0 = "~";
  static 1 = "□";
  static miss = "•";
  static hit = "⛝";
  static sunk = "■";
}

class EnemyIconDictionary {
  static 0 = "~";
  static 1 = "~";
  static miss = "•";
  static hit = "⛝";
  static sunk = "■";
}

class GameView {
  static boardToTable(board) {
    const rows = [];
    for (let i = 0; i < board.size; i++) {
      const row = [];
      for (let i = 0; i < board.size; i++) {
        row.push(0);
      }
      rows.push(row);
    }
    board.ships.forEach((ship) => {
      if (ship.rotation === "vertical") {
        for (let i = 0; i < ship.length; i++) {
          rows[ship.y + i][ship.x] = 1;
        }
      }
      if (ship.rotation === "horizontal") {
        for (let i = 0; i < ship.length; i++) {
          rows[ship.y][ship.x + i] = 1;
        }
      }
    });
    board.attacks.forEach((attack) => {
      rows[attack.y][attack.x] = attack.result;
    });
    board.ships.forEach((ship) => {
      if (ship.isSunk()) {
        if (ship.rotation === "vertical") {
          for (let i = 0; i < ship.length; i++) {
            rows[ship.y + i][ship.x] = "sunk";
          }
        }
        if (ship.rotation === "horizontal") {
          for (let i = 0; i < ship.length; i++) {
            rows[ship.y][ship.x + i] = "sunk";
          }
        }
      }
    });
    return rows;
  }

  static printBoards(player1, player2) {
    const rows1 = this.boardToTable(player1.board);
    const rows2 = this.boardToTable(player2.board);

    let namesPrint = player1.name + "       ";

    for (let i = 0; i < rows1.length; i++) {
      namesPrint += "  ";
    }

    namesPrint = namesPrint.slice(0, player1.name.length * -1);

    namesPrint += player2.name;

    console.log(namesPrint);

    for (let i = rows1.length - 1; i >= 0; i--) {
      let printLine = i + " ";
      rows1[i].forEach((value) => {
        printLine += PlayerIconDictionary[value] + " ";
      });

      printLine += "  |  " + i + " ";
      rows2[i].forEach((value) => {
        printLine += EnemyIconDictionary[value] + " ";
      });

      console.log(printLine);
    }

    let columnsPrint = " ";
    for (let i = 0; i < rows1.length; i++) {
      columnsPrint += " " + i;
    }
    columnsPrint += "   |   ";
    for (let i = 0; i < rows1.length; i++) {
      columnsPrint += " " + i;
    }

    console.log(columnsPrint);

    console.log();
  }
}

module.exports = GameView;
