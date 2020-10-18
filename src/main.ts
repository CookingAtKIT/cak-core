import express from "express";
import { loadConfig } from "./structs/config";
import { logger } from "./structs/logger";
import cors from "cors";

// Express Routers
import landingRouter from "./routes/index";
import recipeRouter from "./routes/recipe";
import dockerRouter from "./routes/docker";

const app = express();
const config = loadConfig();

app.use(express.json());
app.use(logger);
app.use(cors());

app.use("/docker", dockerRouter);
app.use("/recipe", recipeRouter);
app.use("/", landingRouter);

app.listen(config.port, () => {
  console.log("Server listening on port " + config.port);
});
