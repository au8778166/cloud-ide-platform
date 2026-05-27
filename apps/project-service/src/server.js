const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Project Service Running");
});

app.listen(5002, () => {
  console.log("Project Service running on port 5002");
});