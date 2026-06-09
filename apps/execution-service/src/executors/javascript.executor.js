const createTempFile = require(
  "../utils/createTempFile"
);

const cleanupFile = require(
  "../utils/cleanupFile"
);

const runCommand = require(
  "../utils/runCommand"
);

const executeJavaScript = async (
  code,
  input = ""
) => {
  let filePath;

  try {
    filePath = createTempFile(
      code,
      "js"
    );

    const output =
      await runCommand(
        "node",
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
  executeJavaScript;