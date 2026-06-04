const path = require("path");

const createTempFile = require("../utils/createTempFile");

const cleanupFile = require("../utils/cleanupFile");

const runCommand = require("../utils/runCommand");

const executeC = async (code) => {
  let sourceFile;
  let executableFile;

  try {
    sourceFile = createTempFile(code, "c");

    executableFile = sourceFile.replace(".c", ".exe");

    await runCommand("gcc", [sourceFile, "-o", executableFile]);

    const output = await runCommand(executableFile);

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

module.exports = executeC;
