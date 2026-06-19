const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { createProxyMiddleware } = require("http-proxy-middleware");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// AUTH SERVICE
app.use(
  "/api/auth",
  createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: (path) => `/api/auth${path}`,
  })
);

// PROJECT SERVICE
app.use(
  "/api/projects",
  createProxyMiddleware({
    target: process.env.PROJECT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: (path) => `/api/projects${path}`,
  })
);

// EXECUTION SERVICE
app.use(
  "/api/execute",
  createProxyMiddleware({
    target: process.env.EXECUTION_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: (path) => `/api/execute${path}`,
  })
);

// JOB STATUS SERVICE
app.use(
  "/api/jobs",
  createProxyMiddleware({
    target: process.env.EXECUTION_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: (path) => `/api/jobs${path}`,
  })
);

// HEALTH CHECK
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    service: "api-gateway",
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

// 404 HANDLER
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("Gateway Error:", err);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on port ${PORT}`);
});