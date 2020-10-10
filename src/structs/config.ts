import * as fs from "fs"
import * as path from "path"
import yaml from "yaml"

export interface Config {
  port: number
}

export function loadConfig() {
  const file = fs.readFileSync(path.resolve(__dirname + "../../../config.yaml"), "utf8")
  const config = yaml.parse(file)

  if (!("port" in config) || typeof config.port !== "number")
    throw new TypeError("Invalid config file: port must be defined and must be a number")

  return config as Config
}
