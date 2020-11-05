import mongoose from "mongoose";
import { Client } from "minio";
import { minioConfig as getMinioConfig, mongoConfig as getMongoConfig } from "./config";
import { Allergen } from "../models/allergen.schema";
import { Comment } from "../models/comment.schema";
import { Image } from "../models/image.schema";
import { Ingredient } from "../models/ingredient.schema";
import { Recipe } from "../models/recipe.schema";
import { Unit } from "../models/unit.schema";
import { User } from "../models/user.schema";
import { UserCode } from "../models/usercodes.schema";

// MongoDB Configuration
const mongoConfig = getMongoConfig();

// generate ConnectionString
const mongoConnectionString = `mongodb://${mongoConfig.server}:${mongoConfig.port}/cak_test`;

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

export const os = new Client({
  endPoint: minioConfig.endPoint,
  port: minioConfig.port,
  useSSL: minioConfig.useSSL,
  accessKey: minioConfig.accessKey,
  secretKey: minioConfig.secretKey
});

export function createModels() {
  Allergen;
  Comment;
  Image;
  Ingredient;
  Recipe;
  Unit;
  User;
  UserCode;
}
