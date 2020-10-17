import { Router } from "express";
import CryptoJS from "crypto-js";
import { User } from "../models/user.schema";
import { UserCode } from "../models/usercodes.schema";
import { sendVerificationMessage } from "../structs/email";

const router = Router();

function generateSalt(length: number) {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function generateMailAuthToken(length: number) {
  Math.random()
    .toString()
    .substring(2, 2 + length);
}

function generateRandomToken() {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2);
  return CryptoJS.SHA256(timestamp + random).toString();
}

router.post("/login", (req, res) => {
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

router.post("/verify", async (req, res) => {
  if (req.body.hasOwnProperty("emailcode")) {
  } else {
    res.status(400);
    res.json({
      error: "Bad Request",
      description: "Incomplete request"
    });
  }
});

router.post("/register", async (req, res) => {
  // Check if the request is properly formatted
  if (
    req.body.hasOwnProperty("username") &&
    req.body.hasOwnProperty("password") &&
    req.body.hasOwnProperty("surname") &&
    req.body.hasOwnProperty("name") &&
    req.body.hasOwnProperty("emailcode") &&
    req.body.hasOwnProperty("authtoken")
  ) {
    // Request Data
    let username = req.body.username;
    let password = req.body.password;
    let surname = req.body.surname;
    let name = req.body.name;
    let emailcode = req.body.emailcode;
    let authtoken = req.body.authtoken;
    let salt = generateSalt(6);

    const dbUserName = await User.findOne({ username: username });

    if (dbUserName !== null) {
      res.status(409);
      res.json({ error: "Conflict", description: "username" });
      return;
    }

    const dbUserMail = await User.findOne({ email: emailcode + "@student.kit.edu" });

    if (dbUserMail !== null) {
      res.status(409);
      res.json({ error: "Conflict", description: "email" });
      return;
    }

    const mailStatusCode = await sendVerificationMessage(emailcode, 123);

    if (mailStatusCode === 500) {
      res.status(500);
      res.json({
        error: "Internal Server Error: Mail",
        description: "An internal Error occured. Perhaps the provided mail address was incorrect."
      });
      return;
    } else {
      const randomToken = generateMailAuthToken(3);
      const registerToken = generateRandomToken();

      const userCode = await UserCode.insertMany([
        {
          created: Date(),
          emailcode: emailcode,
          code: randomToken,
          token: registerToken
        }
      ]);

      res.status(200);
      res.json({
        emailcode: emailcode,
        token: registerToken
      });
    }
  } else {
    res.status(400);
    res.json({
      error: "Bad Request",
      description: "Incomplete request"
    });
  }
});

export default router;
