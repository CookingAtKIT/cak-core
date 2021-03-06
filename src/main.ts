import express from "express";
import { loadConfig } from "./structs/config";
import { logger } from "./structs/logger";
import cors from "cors";

// Express Routers
import dockerRouter from "./routes/docker";
import uploadRouter from "./routes/upload";
import recipeRouter from "./routes/recipe";
import authRouter from "./routes/auth";
import landingRouter from "./routes/index";
import { createModels } from "./structs/database";

const app = express();
const config = loadConfig();

app.use(express.json());
app.use(logger);
app.use(cors());

app.use("/auth", authRouter);
app.use("/docker", dockerRouter);
app.use("/upload", uploadRouter);
app.use("/recipe", recipeRouter);
app.use("/", landingRouter);

createModels();

app.listen(config.port, () => {
  console.log("Server listening on port " + config.port);
});
