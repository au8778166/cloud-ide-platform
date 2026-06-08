const createTempFile = require(
  "../utils/createTempFile"
);

const cleanupFile = require(
  "../utils/cleanupFile"
);

const runCommand = require(
  "../utils/runCommand"
);

const executePython = async (
  code
) => {
  let filePath;

  try {
    filePath =
      createTempFile(
        code,
        "py"
      );

    const output =
      await runCommand(
        "python",
        [filePath]
      );

    return output;
  } catch (error) {
    throw error;
  } finally {
    if (filePath) {
      cleanupFile(filePath);
    }
  }
};

module.exports =
  executePython;