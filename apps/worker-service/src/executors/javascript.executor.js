const { spawn } = require("child_process");

const createTempFile = require("../utils/createTempFile");

const cleanupFile = require("../utils/cleanupFile");

const executeJavaScript = async (code) => {
  return new Promise((resolve, reject) => {
    try {
      const filePath = createTempFile(code, "js");

      const child = spawn("node", [filePath]);

      let output = "";
      let error = "";

      child.stdout.on("data", (data) => {
        output += data.toString();
      });

      child.stderr.on("data", (data) => {
        error += data.toString();
      });

      child.on("close", () => {
        cleanupFile(filePath);

        if (error) {
          reject(error);
        } else {
          resolve(output);
        }
      });
    } catch (err) {
      reject(err.message);
    }
  });
};

module.exports = executeJavaScript;
