import { Router } from "express";
import { User } from "../models/user.schema";
import CryptoJS from "crypto-js";

const router = Router();

router.post("/login", (req, res) => {
  console.log(req.body);
  // Check if the request is properly formatted
  if (req.body.hasOwnProperty("username") && req.body.hasOwnProperty("password")) {
    // Request Data
    let username = req.body.username;
    let password = req.body.password;

    // Get the database user
    User.findOne({ username: username }, (err, element) => {
      if (err) {
        // Error retrieving from the database
        res.status(500);
        res.json({ error: "Internal Sever Error: Database", description: err });
        res.end();
      } else if (element == undefined) {
        // No element found => username not found
        res.status(403);
        res.json({ error: "Unauthorized", description: "Invalid Username" });
        res.end();
      } else {
        // a user element exists for the given username
        let hash = CryptoJS.SHA256(password + element.salt).toString();
        if (hash === element.password) {
          // Valid username and correct password
          res.status(200);
          res.json({
            token: element.token
          });
          res.end();
        } else {
          // Wrong password
          res.status(403);
          res.json({ error: "Unauthorized", description: "Wrong Password" });
          res.end();
        }
      }
    });
  } else {
    res.status(400);
    res.json({
      error: "Bad Request",
      description: "username or password field was missing"
    });
  }
});

export default router;
