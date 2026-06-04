const { spawn } = require("child_process");

const runCommand = (command, args = []) => {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args);

    let output = "";
    let error = "";

    child.stdout.on("data", (data) => {
      output += data.toString();
    });

    child.stderr.on("data", (data) => {
      error += data.toString();
    });

    child.on("close", (code) => {
      if (code !== 0) {
        reject(error);
      } else {
        resolve(output);
      }
    });

    child.on("error", (err) => {
      reject(err.message);
    });
  });
};

module.exports = runCommand;
