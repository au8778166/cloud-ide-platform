const { Queue } = require(
  "bullmq"
);

const executionQueue =
  new Queue(
    "execution-queue",
    {
      connection: {
        host: "localhost",
        port: 6379,
      },
    }
  );

module.exports =
  executionQueue;