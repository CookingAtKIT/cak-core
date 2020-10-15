import express from "express";
import { loadConfig } from "./structs/config";
import { logger } from "./structs/logger";

// Express Routers
import landingRouter from "./routes/index";
import recipeRouter from "./routes/recipe";

const app = express();
const config = loadConfig();

app.use(logger);

app.use("/recipe", recipeRouter);
app.use("/", landingRouter);

app.listen(config.port, () => {
  console.log("Server listening on port " + config.port);
});
