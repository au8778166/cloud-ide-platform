const express = require("express");

const {
  createProject,
  getAllProjects,
} = require("../controllers/project.controller");

const router = express.Router();

router.post("/", createProject);
router.get("/", getAllProjects);

module.exports = router;
