const express = require("express");

const {
  createProject,
  getAllProjects,
  getProjectById,
  deleteProject,
  clearProjectFiles,
} = require("../controllers/project.controller");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", authMiddleware, createProject);

router.get("/", authMiddleware, getAllProjects);

router.get("/:id", authMiddleware, getProjectById);

router.delete("/:id", authMiddleware, deleteProject);

router.delete("/:id/files", authMiddleware, clearProjectFiles);

module.exports = router;
