const fs = require("fs");

const cleanupFile = (
  filePath
) => {
  try {
    if (
      fs.existsSync(filePath)
    ) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error(
      "Cleanup Error:",
      error
    );
  }
};

module.exports = cleanupFile;