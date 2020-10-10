import * as fs from "fs"
import * as path from "path"
import yaml from "yaml"

export interface Config {
  port: number
}

export function loadConfig() {
  const port = process.env.PORT || 3000
  const config = {
    port: port
  }

  if (!("port" in config) || typeof config.port !== "number")
    throw new TypeError("Invalid config file: port must be defined and must be a number")

  return config as Config
}
