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
    endPoint: "play.min.io",
    port: 9000,
    useSSL: true,
    accessKey: "Q3AM3UQ867SPQQA43P2F",
    secretKey: "zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG"
  };

  return config as MinioConfiguration;
}
