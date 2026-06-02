const express = require("express");

const { executeCode } = require("../controllers/execute.controller");

const router = express.Router();

router.post("/", executeCode);

module.exports = router;
