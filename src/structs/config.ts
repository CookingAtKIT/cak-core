export interface Config {
  port: number;
}

export interface MinioConfiguration {
  endPoint: string;
  port: number;
  useSSL: boolean;
  accessKey: string;
  secretKey: string;
}

export interface MongoConfiguration {
  server: string;
  port: number;
  path: string;
  username: string;
  password: string;
  retryRewrites: boolean;
}

export function loadConfig(): Config {
  const port = process.env.PORT || 3000;
  const config = {
    port: port
  };

  if (!("port" in config) || typeof config.port !== "number")
    throw new TypeError("Invalid config file: port must be defined and must be a number");

  return config as Config;
}

export function minioConfig(): MinioConfiguration {
  const config = {
    endPoint: process.env.MINIO_ENDPOINT || "",
    port: process.env.MINIO_PORT || 9000,
    useSSL: process.env.MINIO_USE_SSL || true,
    accessKey: process.env.MINIO_ACCESS_KEY || "",
    secretKey: process.env.MINIO_SECRET_KEY || ""
  };

  return config as MinioConfiguration;
}

export function mongoConfig(): MongoConfiguration {
  const config = {
    server: process.env.MONGO_ENDPOINT || "localhost",
    port: process.env.MONGO_PORT || 27017,
    path: process.env.MONGO_PATH || "/",
    retryRewrites: process.env.MONGO_RETRY_WRITES || true,
    username: process.env.MONGO_USERNAME || "",
    password: process.env.MONGO_PASSWORD || ""
  };

  return config as MongoConfiguration;
}
