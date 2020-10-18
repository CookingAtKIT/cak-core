import { Router } from "express";
import { os } from "../structs/database";
import mongoose from "mongoose";
import { Image } from "../models/image.schema";
import * as crypto from "crypto";
import { User } from "../models/user.schema";

const router = Router();
const bucketName = "";

router.post("", async (req, res) => {
  if (req.body.hasOwnProperty("token")) {
    const token = req.body.token;

    const uploader = await User.findOne({ token });

    if (uploader) {
      //const type = req.body.type; //image file type
      const rawData = req.body.data; // Get raw base64 data
      const type = detectMimeType(rawData); // Get file extension from base64 data
      const data = Buffer.from(rawData, "base64"); // Build Buffer from base64 data

      // Hash the Buffer to check for database entry with same hash
      const hash = crypto.createHash("md5").update(data).digest("hex");

      Image.findOne({ hash: hash }, (err, element) => {
        if (err) {
          res.status(500);
          res.json({ error: "Internal Sever Error: Database", description: err });
          res.end();
          return;
        }

        if (!element) {
          // No Element found, create new one
          Image.create({ type, hash, uploader: uploader._id }).then((value) => {
            //todo replace id with user
            // Create new Database entry
            const _id = value._id as mongoose.Types.ObjectId; // Get created _id
            os.bucketExists(bucketName).then((bucketExists) => {
              // Check if Minio Bucket exists
              if (!bucketExists) {
                os.makeBucket(bucketName, "", (error) => {
                  // Create Minio Bucket
                  if (error) {
                    res.status(500);
                    res.json({ error: "Internal Sever Error: Database", description: err });
                    res.end();
                    return;
                  }
                  os.putObject(bucketName, `${_id}.${type}`, data).then((r) => {
                    res.json({ id: _id });
                    res.end();
                  });
                });
              } else {
                os.putObject(bucketName, `${_id}.${type}`, data).then((r) => {
                  res.json({ id: _id });
                  res.end();
                });
              }
            });
          });
        } else {
          res.json({ id: element._id }); //Return if from first entry with same hash
          res.end();
        }
      });
    } else {
      res.status(401);
      res.json({ error: "Unauthorized", description: "User token invalid" });
      res.end();
      return;
    }
  } else {
    res.status(401);
    res.json({ error: "Unauthorized", description: "User token not provided" });
    res.end();
    return;
  }
});

/**
 * Detect the type from base64 encoded image
 * via there mime type.
 * https://stackoverflow.com/a/58106757
 * @param base64 the base64 encoded string
 * @return the file extension or empty string
 */
function detectMimeType(base64: string): string {
  switch (base64.charAt(0)) {
    case "/":
      return "jpeg";
    case "i":
      return "png";
    case "R":
      return "gif";
    case "U":
      return "webp";
    case "J":
      return "pdf";
    default:
      return "";
  }
}

export default router;
