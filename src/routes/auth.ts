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

function generateMailAuthToken(length: number): string {
  return Math.random()
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
      } else if (!element) {
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
        } else {
          // Wrong password
          res.status(403);
          res.json({ error: "Unauthorized", description: "Wrong Password" });
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

router.post("/requestVerification", async (req, res) => {
  try {
    if (req.body.hasOwnProperty("emailcode")) {
      const emailcode = req.body.emailcode;

      const registerCode = generateMailAuthToken(3);
      const registerToken = generateRandomToken();

      const dbCode = await UserCode.findOne({ emailcode: emailcode });

      if (dbCode) {
        res.status(409);
        res.json({
          error: "Conflict",
          description: "The Email is already in use"
        });
        return;
      }

      await UserCode.create({
        created: Date(),
        emailcode: emailcode,
        code: registerCode,
        token: registerToken,
        verified: false
      });

      const mailStatusCode = await sendVerificationMessage(
        emailcode + "@student.kit.edu",
        registerCode
      );

      if (mailStatusCode === 500) {
        res.status(500);
        res.json({
          error: "Internal Server Error: Mail",
          description: "An internal Error occured. Perhaps the provided mail address was incorrect."
        });
        return;
      } else {
        res.status(200);
        res.json({
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
  } catch (err) {
    console.error(err);
    res.status(500);
    res.json({
      error: "Internal Sever Error",
      description: err
    });
  }
});

router.post("/verify", async (req, res) => {
  try {
    if (req.body.hasOwnProperty("authtoken") && req.body.hasOwnProperty("authcode")) {
      const authtoken = req.body.authtoken;
      const authcode = req.body.authcode;

      const validCode = await UserCode.findOne({ token: authtoken, code: authcode });

      if (validCode) {
        // The token and code match
        UserCode.updateOne({ token: authtoken, code: authcode }, { verified: true });

        res.status(200);
        res.json({
          success: true
        });
      } else {
        res.status(401);
        res.json({
          error: "Unauthorized",
          description: "The provided code seems to be invalid"
        });
      }
    } else {
      res.status(400);
      res.json({
        error: "Bad Request",
        description: "Incomplete request"
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500);
    res.json({
      error: "Internal Sever Error",
      description: err
    });
  }
});

router.post("/register", async (req, res) => {
  try {
    // Check if the request is properly formatted
    if (
      req.body.hasOwnProperty("username") &&
      req.body.hasOwnProperty("password") &&
      req.body.hasOwnProperty("surname") &&
      req.body.hasOwnProperty("name") &&
      req.body.hasOwnProperty("email") &&
      req.body.hasOwnProperty("authtoken")
    ) {
      // Request Data
      const username = req.body.username;
      const password = req.body.password;
      const surname = req.body.surname;
      const name = req.body.name;
      const email = req.body.email;
      const authtoken = req.body.authtoken;
      const salt = generateSalt(6);

      const dbUserName = await User.findOne({ username: username });

      if (dbUserName !== null) {
        res.status(409);
        res.json({ error: "Conflict", description: "username" });
        return;
      }

      const dbUserMail = await User.findOne({ email: email });

      if (dbUserMail) {
        res.status(409);
        res.json({ error: "Conflict", description: "email" });
        return;
      }

      const newAuthToken = generateRandomToken();

      await User.create({
        created: Date(),
        email: email,
        username: username,
        password: CryptoJS.SHA256(password + salt).toString(),
        surname: surname,
        name: name,
        token: newAuthToken,
        salt: salt
      });

      res.status(201);
      res.json({
        success: true,
        token: newAuthToken
      });
    } else {
      res.status(400);
      res.json({
        error: "Bad Request",
        description: "Incomplete request"
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500);
    res.json({
      error: "Internal Server Error",
      description: err
    });
  }
});

export default router;
