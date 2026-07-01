const path = require("path");

const createTempFile = require("../utils/createTempFile");
const cleanupFile = require("../utils/cleanupFile");
const runDockerCommand = require("../utils/runDockerCommand");

const executeCpp = async (code, input = "") => {
  let sourceFile;
  let executableFile;

  try {
    sourceFile = createTempFile(code, "cpp");

    executableFile = sourceFile.replace(".cpp", "");

    const tempDir = path.dirname(sourceFile);

    const dockerPath =
      process.env.NODE_ENV === "production"
        ? "/workspace/temp"
        : path.resolve(tempDir).replace(/\\/g, "/");

    const fileName = path.basename(sourceFile);

    const executableName = path.basename(executableFile);

    const dockerArgs = [
      "run",
      "--rm",
      "-i",
      "-v",
      `${dockerPath}:/code`,
      "cloud-ide-cpp",
      "sh",
      "-c",
      `g++ /code/${fileName} -o /code/${executableName} && /code/${executableName}`,
    ];

    //console.log("Docker Args:", dockerArgs);

    const output = await runDockerCommand(dockerArgs, input);

    return output;
  } finally {
    if (sourceFile) cleanupFile(sourceFile);
    if (executableFile) cleanupFile(executableFile);
  }
};

module.exports = executeCpp;