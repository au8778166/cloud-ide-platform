const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Execution services running");
});

app.listen(5003, () => {
  console.log("Execution services running on port 5003");
});