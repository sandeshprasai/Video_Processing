import crypto from "node:crypto";

import { VideoStatus } from "../../../Commons/Constants/VideoStatus.js";

export class VideoService {
  constructor(videoRepositoryPort, videoStoragePort) {
    this.videoRepositoryPort = videoRepositoryPort;
    this.videoStoragePort = videoStoragePort;
  }

  async createUploadUrl(userId, fileName, mimeType, size) {
    const storageKey = this.generateStorageKey(userId, fileName);

    const video = {
      userId,
      originalFileName: fileName,
      mimeType,
      size,
      storageKey,
      status: VideoStatus.UPLOADING,
    };

    const savedVideo = await this.videoRepositoryPort.create(video);

    const uploadUrl = await this.videoStoragePort.createUploadUrl(storageKey);

    return {
      video: savedVideo,
      uploadUrl,
      expiresIn: 900,
    };
  }

  generateStorageKey(userId, fileName) {
    const extension = fileName.includes(".")
      ? fileName.substring(fileName.lastIndexOf("."))
      : "";

    return `videos/${userId}/${crypto.randomUUID()}${extension}`;
  }
}
