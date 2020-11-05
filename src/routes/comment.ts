import { Router } from "express";
import { Comment } from "../models/comment.schema";
import { Recipe } from "../models/recipe.schema";
import { User } from "../models/user.schema";

const router = Router();

router.post("/:id/comment/:cid/like", async (req, res) => {
  try {
    const request: { token: string; set: boolean } = req.body;
    if ("token" in request && "set" in request) {
      const token = request.token;
      const commentId = req.params.cid;
      const user = await User.findOne({ token });
      const comment = await Comment.findById(commentId);

      if (!user) {
        res.status(401);
        res.json({ error: "Unauthorized", description: "User token invalid" });
        return;
      }

      if (!comment) {
        res.status(404);
        res.json({ error: "Not Found", description: `No comment with id ${commentId} found` });
        return;
      }

      if (request.set) {
        // Set the like for this user
        if (!comment.likes.includes(user._id)) comment.likes.push(user._id);
        await comment.save();
        res.status(200);
        res.json({ likes: comment.likes.length });
      } else {
        // Unset the like for this user
        const i = comment.likes.indexOf(user._id);
        comment.likes.splice(i, 1);
        await comment.save();
        res.status(200);
        res.json({ likes: comment.likes.length });
      }
    } else {
      res.status(400);
      res.json({ error: "Malformed request", description: "Mandatory keys not provided" });
    }
  } catch (e) {
    res.status(500);
    res.json({ error: "Internal Server Error", description: e.toString() });
  }
});

router.post("/:id/comment/:cid/edit", async (req, res) => {
  try {
    const request: { token: string; message?: string; delete?: boolean } = req.body;
    if ("token" in request) {
      const token = request.token;
      const recipeId = req.params.id;
      const commentId = req.params.cid;
      const message = request.message;
      const user = await User.findOne({ token });
      const recipe = await Recipe.findById(recipeId);
      const comment = await Comment.findById(commentId);

      if (!user) {
        res.status(401);
        res.json({ error: "Unauthorized", description: "User token invalid" });
        return;
      }

      if (!recipe) {
        res.status(404);
        res.json({ error: "Not Found", description: `No recipe with id ${commentId} found` });
        return;
      }

      if (!comment) {
        res.status(404);
        res.json({ error: "Not Found", description: `No comment with id ${commentId} found` });
        return;
      }

      // TODO: Check if user is moderator or admin
      if (!comment.author.equals(user._id)) {
        res.status(401);
        res.json({ error: "Unauthorized", description: "User is not the owner of the comment" });
        return;
      }

      if (request.delete) {
        const i = recipe.comments.indexOf(comment._id);
        recipe.comments.splice(i, 1);
        await recipe.save();
        await comment.remove();
        res.status(200);
        res.json({ deleted: true });
      } else if (message) {
        if (message.length < 1 || message.length > 2000) {
          res.status(400);
          res.json({
            error: "Invalid Request",
            description: "Message length should be within limits"
          });
          return;
        }

        comment.message = message;
        await comment.save();
        res.status(200);
        res.json(await comment.clean());
      } else {
        res.status(400);
        res.json({ error: "Malformed request", description: "Mandatory keys not provided" });
      }
    } else {
      res.status(400);
      res.json({ error: "Malformed request", description: "Mandatory keys not provided" });
    }
  } catch (e) {
    res.status(500);
    res.json({ error: "Internal Server Error", description: e.toString() });
  }
});

router.post("/:id/comment/create", async (req, res) => {
  try {
    const request: { token: string; message: string } = req.body;
    if ("token" in request && "message" in request) {
      const token = request.token;
      const recipeId = req.params.id;
      const message = request.message;
      const user = await User.findOne({ token });
      const recipe = await Recipe.findById(recipeId);

      if (!user) {
        res.status(401);
        res.json({ error: "Unauthorized", description: "User token invalid" });
        return;
      }

      if (!recipe) {
        res.status(404);
        res.json({ error: "Not Found", description: `No recipe with id ${recipeId} found` });
        return;
      }

      if (message.length < 1 || message.length > 2000) {
        res.status(400);
        res.json({
          error: "Invalid Request",
          description: "Message length should be within limits"
        });
        return;
      }

      const comment = await Comment.create({
        author: user.id,
        flags: [],
        imgs: [],
        likes: [],
        message: message
      });

      recipe.comments.push(comment.id);
      await recipe.save();

      res.status(200);
      res.json(await comment.clean());
    }
  } catch (e) {
    res.status(500);
    res.json({ error: "Internal Server Error", description: e.toString() });
  }
});

export default router;
