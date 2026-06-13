const prisma = require("../config/prisma");

const getAllProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        userId: req.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createProject = async (req, res) => {
  try {
    const { name } = req.body;

    const project = await prisma.project.create({
      data: {
        name,
        userId: req.user.id,
      },
    });

    return res.status(201).json({
      success: true,
      project,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getProjectById = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const project =
      await prisma.project.findFirst({
        where: {
          id,
          userId: req.user.id,
        },
        include: {
          files: true,
        },
      });

    if (!project) {
      return res.status(404).json({
        success: false,
        message:
          "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteProject = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const project =
      await prisma.project.findFirst({
        where: {
          id,
          userId: req.user.id,
        },
      });

    if (!project) {
      return res.status(404).json({
        success: false,
        message:
          "Project not found",
      });
    }

    await prisma.project.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      success: true,
      message:
        "Project deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const clearProjectFiles =
  async (req, res) => {
    try {
      const { id } = req.params;

      const project =
        await prisma.project.findFirst({
          where: {
            id,
            userId: req.user.id,
          },
        });

      if (!project) {
        return res.status(404).json({
          success: false,
          message:
            "Project not found",
        });
      }

      await prisma.file.deleteMany({
        where: {
          projectId: id,
        },
      });

      return res.status(200).json({
        success: true,
        message:
          "Files cleared successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  deleteProject,
  clearProjectFiles
};
