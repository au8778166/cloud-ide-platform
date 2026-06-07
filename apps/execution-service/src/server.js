const express = require("express");
const cors = require("cors");

const executeRoutes = require("./routes/execute.routes");
const executionQueue = require("./queues/execution.queue");
const jobRoutes = require("./routes/job.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/execute", executeRoutes);
app.use("/api/jobs", jobRoutes);
global.executionQueue = executionQueue;

const PORT = 5004;

app.listen(PORT, () => {
  console.log(`Execution Service Running On Port ${PORT}`);
});
