const { Job } = require("bullmq");

const getJobStatus = async (
  req,
  res
) => {
  try {
    const { jobId } = req.params;

    const job = await Job.fromId(
      global.executionQueue,
      jobId
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const state =
      await job.getState();

    const result =
      job.returnvalue;

    return res.status(200).json({
      success: true,
      jobId,
      status: state,
      output: result?.output || "",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getJobStatus,
};