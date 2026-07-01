const { spawn } = require("child_process");

const runDockerCommand = (args, input = "") => {
  return new Promise((resolve, reject) => {
    const docker = spawn("docker", args);

    let stdout = "";
    let stderr = "";

    docker.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    docker.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    docker.on("close", (code) => {
      if (code !== 0) {
        return reject(stderr);
      }

      resolve(stdout);
    });

    docker.on("error", reject);

    if (input) docker.stdin.write(input);

    docker.stdin.end();
  });
};

module.exports = runDockerCommand;