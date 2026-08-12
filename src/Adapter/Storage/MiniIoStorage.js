import { Client } from "minio";

import { VideoStoragePort } from "../../Core/Video/Ports/VideoStoragePort.js";

export class MiniIoStorage extends VideoStoragePort {
  constructor(environment) {
    super();
    this.environment = environment;
    this.client = new Client({
      endPoint: environment.get("minioEndpoint"),
      port: Number(environment.get("minioPort")),
      useSSL: environment.get("minioUseSSL") === true,
      accessKey: environment.get("minioAccessKey"),
      secretKey: environment.get("minioSecretKey"),
    });
    this.bucket = environment.get("minioBucket");
  }
  async createUploadUrl(storageKey, contentType) {
    const expiresIn = 15 * 60; // 15 minutes

    const uploadUrl = await this.client.presignedPutObject(
      this.bucket,
      storageKey,
      expiresIn,
    );

    return uploadUrl;
  }
}
