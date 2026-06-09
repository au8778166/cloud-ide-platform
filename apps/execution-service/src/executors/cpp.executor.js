const createTempFile = require("../utils/createTempFile");

const cleanupFile = require("../utils/cleanupFile");

const runCommand = require("../utils/runCommand");

const executeCpp = async (code,input = "") => {
  let sourceFile;
  let executableFile;

  try {
    sourceFile = createTempFile(code, "cpp");

    executableFile = sourceFile.replace(".cpp", ".exe");

    await runCommand("g++", [sourceFile, "-o", executableFile]);

    const output = await runCommand(executableFile,[],
  input);

    return output;
  } catch (error) {
    throw error;
  } finally {
    if (sourceFile) {
      cleanupFile(sourceFile);
    }

    if (executableFile) {
      cleanupFile(executableFile);
    }
  }
};

module.exports = executeCpp;
