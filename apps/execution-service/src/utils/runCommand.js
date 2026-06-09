const { spawn } = require("child_process");

const runCommand = (
  command,
  args = [],
  input = ""
) => {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args);

    let output = "";
    let error = "";
    let timedOut = false;

    const timeout = setTimeout(() => {
      timedOut = true;

      child.kill("SIGKILL");
    }, 5000);

    if (
      input !== undefined &&
      input !== null &&
      input.length > 0
    ) {
      child.stdin.write(input);
    }

    child.stdin.end();

    child.stdout.on("data", (data) => {
      output += data.toString();
    });

    child.stderr.on("data", (data) => {
      error += data.toString();
    });

    child.on("close", (code) => {
      clearTimeout(timeout);

      if (timedOut) {
        return reject(
          "Execution Timeout (5 seconds exceeded)"
        );
      }

      if (code !== 0) {
        return reject(error);
      }

      resolve(output);
    });

    child.on("error", (err) => {
      clearTimeout(timeout);
      reject(err.message);
    });
  });
};

module.exports = runCommand;