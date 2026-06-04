const executeJavaScript = require("../executors/javascript.executor");

const executePython = require("../executors/python.executor");

const executeC = require("../executors/c.executor");

const executeCpp = require("../executors/cpp.executor");

const ExecutorFactory = {
  getExecutor(language) {
    switch (language) {
      case "javascript":
        return executeJavaScript;

      case "python":
        return executePython;

      case "c":
        return executeC;

      case "cpp":
        return executeCpp;

      default:
        throw new Error("Language not supported");
    }
  },
};

module.exports = ExecutorFactory;
