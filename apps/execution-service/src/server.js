const express = require("express");
const cors = require("cors");

const executeRoutes = require("./routes/execute.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/execute", executeRoutes);

const PORT = 5004;

app.listen(PORT, () => {
  console.log(`Execution Service Running On Port ${PORT}`);
});
