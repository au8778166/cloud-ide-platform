const prisma = require("../config/prisma");

const getAllProjects = async (
  req,
  res
) => {
  try {
    const projects =
      await prisma.project.findMany({
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

const createProject = async (
  req,
  res
) => {
  try {
    const { name } = req.body;

    const project =
      await prisma.project.create({
        data: {
          name,
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

module.exports = {
  createProject,getAllProjects,
};