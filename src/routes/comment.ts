import { Router } from "express";
import { Comment } from "../models/comment.schema";
import { Recipe } from "../models/recipe.schema";
import { User } from "../models/user.schema";

const router = Router();

router.post("/create", async (req, res) => {
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
        res.status(500);
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
