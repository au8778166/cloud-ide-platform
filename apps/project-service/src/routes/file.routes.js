const express = require("express");

const authMiddleware = require("../middleware/auth.middleware");

const { createFile, updateFile } = require("../controllers/file.controller");

const router = express.Router();

router.post("/projects/:id/files", authMiddleware, createFile);
router.put("/files/:fileId", authMiddleware, updateFile);

module.exports = router;
