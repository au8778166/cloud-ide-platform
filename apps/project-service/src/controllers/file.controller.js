const prisma = require("../config/prisma");

const createFile = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, language, content } = req.body;

    const project = await prisma.project.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const file = await prisma.file.create({
      data: {
        name,
        language,
        content,
        projectId: id,
      },
    });

    return res.status(201).json({
      success: true,
      file,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateFile = async (req, res) => {
  try {
    const { fileId } = req.params;

    const { content } = req.body;

    const file = await prisma.file.findUnique({
      where: {
        id: fileId,
      },
      include: {
        project: true,
      },
    });

    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    if (file.project.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const updatedFile = await prisma.file.update({
      where: {
        id: fileId,
      },
      data: {
        content,
      },
    });

    return res.status(200).json({
      success: true,
      file: updatedFile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createFile,
  updateFile
};
