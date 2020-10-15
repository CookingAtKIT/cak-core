import { Router } from "express";
import { db } from "../structs/database";
import { minioConfig as getMinioConfig } from "../structs/config";
import * as http from "http";

const router = Router();
const minioConfig = getMinioConfig();

router.get("/", (req, res) => {
  res.end("Try /recipe");
});

router.get("/status/mongo", (req, res) => {
  res.json({
    mongodb: db.readyState === 1
  });
  res.end();
});

router.get("/status/minio", (req, res) => {
  res.end("Try /recipe");
});

router.get("/status", (req, res) => {
  // Send back sattus code 200, the API is live.
  res.status(200);

  let minioHealthRequestOptions = {
    method: "GET",
    host: minioConfig.endPoint,
    port: minioConfig.port,
    path: "/minio/health/live",
    timeout: 5000
  };

  // Check the minio server for health
  const minioHealthRequest = http.request(minioHealthRequestOptions, (response) => {
    res.json({
      mongodb: db.readyState === 1,
      minio: response.statusCode === 200
    });
    res.end();
  });

  minioHealthRequest.on("timeout", () => {
    res.json({
      mongodb: db.readyState === 1,
      minio: false
    });

    // The minio server is either down or under heavy
    // load, suggesting a restart might be needed.

    res.end();
  });
});

export default router;
