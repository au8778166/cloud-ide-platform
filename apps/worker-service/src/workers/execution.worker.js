const { Worker } = require("bullmq");

const ExecutorFactory = require("../factories/executor.factory");

const worker = new Worker(
  "execution-queue",
  async (job) => {
    console.log("Job Received");

    const { language, code } = job.data;

    const executor = ExecutorFactory.getExecutor(language);

    const output = await executor(code);

    console.log("OUTPUT:");

    console.log(output);

    return {
      output,
    };
  },
  {
    connection: {
      host: "localhost",
      port: 6379,
    },
  },
);

console.log("Execution Worker Running");
