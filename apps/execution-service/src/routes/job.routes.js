const express = require("express");

const { getJobStatus } = require("../controllers/job.controller");

const router = express.Router();

router.get("/:jobId", getJobStatus);

module.exports = router;
