import * as fs from "fs";
import morgan from "morgan";
import * as path from "path";

const writeStream = fs.createWriteStream(path.resolve("access.log"), { flags: "a" });
export const logger = morgan("combined", { stream: writeStream });
