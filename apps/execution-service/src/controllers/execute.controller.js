const executionQueue = require("../queues/execution.queue");

const executeCode = async (req, res) => {
  try {
    const { language, code } = req.body;

    const job = await executionQueue.add(
      "execute-code",
      {
        language,
        code,
      }
    );

    console.log(
      "JOB CREATED:",
      job.id
    );

    return res.status(200).json({
      success: true,
      jobId: job.id,
      message: "Job added to queue",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  executeCode,
};