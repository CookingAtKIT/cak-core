import mongoose, { mongo, Schema } from "mongoose";
import { Client } from "minio";
import { minioConfig as getMinioConfig, mongoConfig as getMongoConfig } from "./config";
import { User } from "../models/user.schema";

// MongoDB Configuration
const mongoConfig = getMongoConfig();

// generate ConnectionString
const mongoConnectionString = `mongodb://${mongoConfig.server}:${mongoConfig.port}/`;

//
mongoose.connect(mongoConnectionString, { useNewUrlParser: true }).then(
  (value) => {},
  (reason) => {
    console.warn("MongoDB Connection failed!");
    console.error(reason);
  }
);

export const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("database connection open");
});

// Minio Setup

const minioConfig = getMinioConfig();
/*
export const os = new Client({
  endPoint: minioConfig.endPoint,
  port: minioConfig.port,
  useSSL: minioConfig.useSSL,
  accessKey: minioConfig.accessKey,
  secretKey: minioConfig.secretKey
});
 */
