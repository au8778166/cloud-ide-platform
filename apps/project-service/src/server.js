require("dotenv").config();

const express = require("express");
const cors = require("cors");

const projectRoutes = require(
  "./routes/project.routes"
);

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/api/projects",
  projectRoutes
);

const PORT = 5005;

app.listen(PORT, () => {
  console.log(
    `Project Service Running On Port ${PORT}`
  );
});