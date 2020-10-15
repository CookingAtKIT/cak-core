import mongoose from "mongoose";
import { Client } from "minio";

mongoose.connect("mongodb+srv://root:root@test.czgw0.mongodb.net/sample_airbnb?retryWrites", {
  useNewUrlParser: true
});

export const db = mongoose.connection;

export const os = new Client({
  endPoint: "play.min.io",
  port: 9000,
  useSSL: true,
  accessKey: "Q3AM3UQ867SPQQA43P2F",
  secretKey: "zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG"
});

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("database connection open");
});
