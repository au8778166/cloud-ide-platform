const express = require("express");

const {
  createProject,
  getAllProjects,
  getProjectById,
  deleteProject,
} = require("../controllers/project.controller");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", authMiddleware, createProject);

router.get("/", authMiddleware, getAllProjects);

router.get("/:id", authMiddleware, getProjectById);

router.delete("/:id", authMiddleware, deleteProject);

module.exports = router;
