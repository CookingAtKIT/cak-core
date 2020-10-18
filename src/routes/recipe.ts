import { Router } from "express";
import { Recipe } from "../models/recipe.schema";
import { Types } from "mongoose";
import { IUser } from "../models/user.types";
import { Image } from "../structs/image";
import { IComment } from "../models/comment.types";
import { User } from "../models/user.schema";
const router = Router();

router.get("/:id", (req, res) => {
  const recipeId = req.params.id;

  Recipe.findOne({ _id: Types.ObjectId(recipeId) })
    .populate("author")
    .populate("ingredients.ingredient")
    .populate("steps.img")
    .populate("comments")
    .populate("comments.author")
    .exec((err, recipe) => {
      if (err) {
        res.status(500);
        res.json({
          error: "Internal Server Error",
          description: `Error fetching information for ${recipeId}`
        });
        res.end();
      }
    })
    .then((recipe) => {
      if (recipe == null) {
        res.status(404);
        res.json({ error: "Not Found", description: `Recipe with ID ${recipeId} not found` });
        res.end();
      } else {
        const comments: { author: string; body: string; likes: number; images: string[] }[] = [];

        for (const comment of recipe.comments as IComment[]) {
          const images: string[] = [];

          for (const img of comment.imgs as Types.ObjectId[]) {
            images.push(Image.generateLink(img));
          }

          comments.push({
            author: (comment.author as IUser).username,
            body: comment.message,
            likes: comment.likes.length,
            images
          });
        }

        const response = {
          public: recipe.public,
          flags: recipe.flags.length,
          title: recipe.title,
          author: (recipe.author as IUser).username,
          lastEdit: recipe.edited ? recipe.edited.getTime() : 0,
          thumbnail: Image.generateLink(recipe.thumbnail as Types.ObjectId),
          ingredients: recipe.ingredients,
          steps: recipe.steps,
          likes: recipe.likes.length,
          portions: recipe.portions,
          comments
        };

        res.status(200);
        res.json(response);
      }
      res.end();
    });
});

router.post("/edit/:id", (req, res) => {});

router.post("/create", async (req, res) => {
  const request: { token: string; title: string } = req.body;
  if (request.hasOwnProperty("token")) {
    const token = request.token;
    const uploader = await User.findOne({ token });

    if (uploader) {
      const data = await Recipe.create({
        public: false,
        flags: [],
        title: request.title,
        author: uploader._id,
        edited: new Date(),
        ingredients: [],
        steps: [],
        likes: [],
        portions: -1,
        comments: []
      });
      res.status(200);
      res.json({ id: data._id });
    } else {
      res.status(401);
      res.json({ error: "Unauthorized", description: "User token invalid" });
    }
  } else {
    res.status(401);
    res.json({ error: "Unauthorized", description: "User token not provided" });
  }
  res.end();
});

export default router;
