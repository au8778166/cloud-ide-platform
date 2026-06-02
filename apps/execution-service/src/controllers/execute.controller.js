const executeJavaScript = require("../executors/javascript.executor");

const executePython = require("../executors/python.executor");
const executeC = require("../executors/c.executor");
const executeCpp = require("../executors/cpp.executor");

const executeCode = async (req, res) => {
  const { language, code } = req.body;

  try {
    let output = "";

    switch (language) {
      case "javascript":
        output = await executeJavaScript(code);
        break;

      case "python":
        output = await executePython(code);
        break;

      case "c":
        output = await executeC(code);
        break;

      case "cpp":
        output = await executeCpp(code);
        break;

      default:
        output = "Language not supported yet";
    }

    return res.status(200).json({
      success: true,
      output,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      output: error.toString(),
    });
  }
};

module.exports = {
  executeCode,
};
