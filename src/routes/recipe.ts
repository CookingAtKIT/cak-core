import { Router } from "express";
import { Recipe } from "../models/recipe.schema";
import { Types } from "mongoose";
import { IUser } from "../models/user.types";
import { IComment } from "../models/comment.types";
import { User } from "../models/user.schema";
import commentRouter from "./comment";
import { Image } from "../models/image.schema";
const router = Router();

router.use("/:id/comment", commentRouter);

router.get("/:id", async (req, res) => {
  try {
    const recipeId = req.params.id;

    Recipe.findOne({ _id: Types.ObjectId(recipeId) })
      .populate("author")
      .populate("ingredients.ingredient")
      .populate("steps.img")
      .populate("comments")
      .populate("comments.author")
      .exec()
      .then((recipe) => {
        if (!recipe) {
          res.status(404);
          res.json({ error: "Not Found", description: `Recipe with ID ${recipeId} not found` });
          res.end();
        } else {
          const comments: { author: string; body: string; likes: number; images: string[] }[] = [];

          for (const comment of recipe.comments as IComment[]) {
            const images: string[] = [];

            for (const img of comment.imgs as Types.ObjectId[]) {
              images.push(Image.asLink(img));
            }

            comments.push({
              author: (comment.author as IUser).username,
              body: comment.message,
              likes: comment.likes.length,
              images
            });
          }

          const response = {
            id: recipe._id,
            public: recipe.public,
            flags: recipe.flags.length,
            title: recipe.title,
            author: (recipe.author as IUser).username,
            lastEdit: recipe.edited ? recipe.edited.getTime() : 0,
            thumbnail: recipe.thumbnail ? Image.asLink(recipe.thumbnail as Types.ObjectId) : null,
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
      })
      .catch((err) => {
        res.status(500);
        res.json({
          error: "Internal Server Error",
          description: `Error fetching information for ${recipeId}: ${err.toString()}`
        });
        res.end();
      });
  } catch (err) {
    res.status(500);
    res.json({ error: "Internal Server Error", description: err.toString() });
  }
});

router.post("/:id/edit", async (req, res) => {
  const request: { token: string; updates: { type: string; value: any }[] } = req.body;
  if (request.hasOwnProperty("token")) {
    const token = request.token;
    const uploader = await User.findOne({ token });

    if (uploader) {
      const recipeId = req.params.id;
      try {
        const recipe = await Recipe.findById(recipeId);

        if (recipe) {
          const updates = [];
          res.status(200);
          for (let update of request.updates) {
            switch (update.type) {
              case "title":
                {
                  updates.push({ $set: { title: update.value } });
                }
                break;
              case "public":
                {
                  updates.push({ $set: { public: update.value } });
                }
                break;
              case "portion":
                {
                  updates.push({ $set: { portions: update.value } });
                }
                break;
              case "ingredient":
                {
                  updates.push({
                    $addToSet: {
                      ingredient: Types.ObjectId(update.value.id),
                      amount: update.value.amount
                    }
                  });
                }
                break;
              case "step":
                {
                  updates.push({ $addToSet: update.value });
                }
                break;
            }
          }

          updates.push({ $currentDate: "$edited" });
          await recipe.update(updates);
          res.status(200);
          res.json({ edits: updates });
        } else {
          res.status(404);
          res.json({ error: "Not Found", description: `No recipe with id ${recipeId} found` });
        }
      } catch (e) {
        res.status(500);
        res.json({ error: "Internal Server Error", description: "Error while querying database" });
      }
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

router.post("/create", async (req, res) => {
  const request: { token: string; title: string } = req.body;
  if (request.hasOwnProperty("token")) {
    try {
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
        res.status(201);
        res.json({ id: data._id });
      } else {
        res.status(401);
        res.json({ error: "Unauthorized", description: "User token invalid" });
      }
    } catch (e) {
      res.status(500);
      res.json({ error: "Internal Server Error", description: "Error while querying database" });
    }
  } else {
    res.status(401);
    res.json({ error: "Unauthorized", description: "User token not provided" });
  }
  res.end();
});

router.post("/:id/like", async (req, res) => {
  try {
    const request: { token: string; set: boolean } = req.body;
    if (request.hasOwnProperty("token") && request.hasOwnProperty("set")) {
      const token = request.token;
      const recipeId = req.params.id;
      const uploader = await User.findOne({ token });
      const recipe = await Recipe.findById(recipeId);

      if (uploader && recipe) {
        if (request.set) {
          // Set the like for this user
          if (!recipe.likes.includes(uploader._id)) recipe.likes.push(uploader._id);
          await recipe.save();
          res.status(200);
          res.json({ likes: recipe.likes.length });
        } else {
          // Unset the like for this user
          const i = recipe.likes.findIndex(uploader._id);
          recipe.likes.splice(i, 1);
          await recipe.save();
          res.status(200);
          res.json({ likes: recipe.likes.length });
        }
      } else {
        if (!uploader) {
          res.status(401);
          res.json({ error: "Unauthorized", description: "User token invalid" });
        } else {
          res.status(404);
          res.json({ error: "Not Found", description: `No recipe with id ${recipeId} found` });
        }
      }
    } else {
      res.status(401);
      res.json({ error: "Unauthorized", description: "User token not provided" });
    }
  } catch (e) {
    res.status(500);
    res.json({ error: "Internal Server Error", description: "Error while querying database" });
  }
});

export default router;
