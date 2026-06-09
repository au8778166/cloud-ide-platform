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
  code,
  input = ""
) => {
  let filePath;

  try {
    filePath = createTempFile(
      code,
      "py"
    );

    const output =
      await runCommand(
        "python",
        [filePath],
        input
      );

    return output;
  } finally {
    if (filePath) {
      cleanupFile(filePath);
    }
  }
};

module.exports =
  executePython;