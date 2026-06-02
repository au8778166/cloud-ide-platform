const fs = require("fs");
const path = require("path");

const createTempFile = (
  code,
  extension
) => {
  const tempDir = path.join(
    process.cwd(),
    "temp"
  );

  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, {
      recursive: true,
    });
  }

  const fileName = `${Date.now()}.${extension}`;

  const filePath = path.join(
    tempDir,
    fileName
  );

  fs.writeFileSync(filePath, code);

  return filePath;
};

module.exports = createTempFile;