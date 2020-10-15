import mongoose, { mongo } from "mongoose";
import { Client } from "minio";
import { minioConfig as getMinioConfig, mongoConfig as getMongoConfig } from "./config";

// MongoDB Setup

const mongoConfig = getMongoConfig();

mongoose.connect(
  `mongodb+srv://${mongoConfig.username}:${mongoConfig.password}@${mongoConfig.server}/${
    mongoConfig.path
  }${mongoConfig.retryRewrites ? "?retryRewrites" : ""}`,
  {
    useNewUrlParser: true
  }
);

export const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("database connection open");
});

// Minio Setup

export const os = new Client({
  endPoint: "play.min.io",
  port: 9000,
  useSSL: true,
  accessKey: "Q3AM3UQ867SPQQA43P2F",
  secretKey: "zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG"
});
