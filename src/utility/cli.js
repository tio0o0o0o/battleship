const Readline = require("readline");

class CLI {
  static prompt(message, callback) {
    const rl = Readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(message, (answer) => {
      rl.close();
      callback(answer);
    });
  }

  static promptAsync(message) {
    const rl = Readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve) => {
      rl.question(message, (answer) => {
        rl.close();
        resolve(answer);
      });
    });
  }
}

module.exports = CLI;
