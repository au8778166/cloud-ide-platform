const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const createTempFile = (code, extension) => {
  const tempDir =
    process.env.NODE_ENV === "production"
      ? "/workspace/temp"
      : path.join(process.cwd(), "temp");

  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, {
      recursive: true,
    });
  }

  const fileName = `${Date.now()}-${crypto.randomUUID()}.${extension}`;

  const filePath = path.join(tempDir, fileName);

  fs.writeFileSync(filePath, code);

  return filePath;
};

module.exports = createTempFile;