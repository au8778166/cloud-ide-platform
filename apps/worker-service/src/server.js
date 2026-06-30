const dotenv = require("dotenv");
dotenv.config();
require(
  "./workers/execution.worker"
);

console.log(
  "Worker Service Started"
);