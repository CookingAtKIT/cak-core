import { Router } from "express";
import { os } from "../structs/database"
import mongoose from "mongoose";
import { Image } from "../models/image.schema";

const router = Router();
const bucketName = "";

router.post("/upload", (req, res) => {
  os.bucketExists(bucketName).then(bucketExists => {
    const type = req.body.type;
    const hash = req.body.hash;
    const userToken = req.body.token;



    Image.create({type, hash}).then(value => {
      const _id = value._id as mongoose.Types.ObjectId;

      if ( !bucketExists ) {
        os.makeBucket(bucketName, "", error => {
          if( error ) return console.log("error while creating bucket.", error);
          os.presignedPutObject(bucketName, `${_id}.${type}`).then(presignedURL => {
            res.json({url: presignedURL});
            res.end();
          });
        })
      } else {
        os.presignedPutObject(bucketName, `${_id}.${type}`).then(presignedURL => {
          res.json({url: presignedURL});
          res.end();
        });
      }
    })
  })
});

export default router;
