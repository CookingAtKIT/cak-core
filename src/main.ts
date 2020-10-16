import express from "express";
import { loadConfig } from "./structs/config";
import { logger } from "./structs/logger";
import cors from "cors";

// Express Routers
import landingRouter from "./routes/index";
import recipeRouter from "./routes/recipe";

const app = express();
const config = loadConfig();

app.use(logger);
app.use(cors());

app.use("/recipe", recipeRouter);
app.use("/", landingRouter);

app.listen(config.port, () => {
  console.log("Server listening on port " + config.port);
});
