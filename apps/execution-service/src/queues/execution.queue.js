const { Queue } = require("bullmq");

const executionQueue = new Queue("execution-queue", {
  connection: {
    host: process.env.REDIS_HOST || "localhost",
    port: Number(process.env.REDIS_PORT) || 6379,
  },
});

module.exports = executionQueue;