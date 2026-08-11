import { Client } from "minio";

import { VideoStoragePort } from "../../Core/Video/Ports/VideoRepositoryPort.js";

export class MiniIoStorage extends VideoStoragePort {
  constructor(environment) {
    super();
    this.environment = environment;
    this.client = new Client({
      endPoint: environment.get("minioEndpoint"),
      port: Number(environment.get("port")),
      useSSL: environment.get("minioUseSSL") === true,
      accessKey: environment.get("minioAccessKey"),
      secretKey: environment.get("minioSecretKey"),
    });
    this.bucket = environment.get("miniioBucket");
  }
}
