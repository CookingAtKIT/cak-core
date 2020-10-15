import express from "express";
import { loadConfig } from "./structs/config";

// Express Routers
import landingRouter from "./routes/index";
import recipeRouter from "./routes/recipe";

const app = express();
const config = loadConfig();

app.use(express.json());

app.use("/recipe", recipeRouter);
app.use("/", landingRouter);

app.listen(config.port, () => {
  console.log("Server listening on port " + config.port);
});
