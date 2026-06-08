const { Worker } = require("bullmq");

const ExecutorFactory = require("../factories/executor.factory");

const worker = new Worker(
  "execution-queue",
  async (job) => {
    try {
      console.log("Job Received");

      const { language, code } = job.data;

      const executor = ExecutorFactory.getExecutor(language);

      const output = await executor(code);

      console.log("OUTPUT:");
      console.log(output);

      return {
        success: true,
        output,
      };
    } catch (error) {
      throw new Error(error.toString());
    }
  },
  {
    connection: {
      host: "localhost",
      port: 6379,
    },
  },
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.log(`Job ${job.id} failed`);
  console.log(err.message);
});

console.log("Execution Worker Running");
