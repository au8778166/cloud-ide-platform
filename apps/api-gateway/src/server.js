const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const {
  createProxyMiddleware,
} = require("http-proxy-middleware");

const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();

app.use(cors());

app.use(
  "/auth",
  createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL,
    changeOrigin: true,

    pathRewrite: {
      "^/auth": "/api/auth",
    },
  })
);

app.use(
  "/projects",
  createProxyMiddleware({
    target: process.env.PROJECT_SERVICE_URL,
    changeOrigin: true,
  })
);

app.use(
  "/execute",
  createProxyMiddleware({
    target: process.env.EXECUTION_SERVICE_URL,
    changeOrigin: true,
  })
);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message:
      "Cloud IDE API Gateway Running",
  });
});

app.listen(
  PORT,
  () => {
    console.log(
      `API Gateway running on port ${process.env.PORT}`
    );
  }
);