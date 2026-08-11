import crypto from "node:crypto";

import { VideoStatus } from "../../../Commons/Constants/VideoStatus.js";

export class VideoService {
  constructor(videoRepositoryPort, videoStoragePort) {
    this.videoRepositoryPort = videoRepositoryPort;
    this.videoStoragePort = videoStoragePort;
  }

  async createUploadUrl(userId, fileName, mimeType, fileSize) {
    const storageKey = this.generateStorageKey(userId, fileName);

    const Video = {
      userId,
      originalFileName: fileName,
      mimeType,
      fileSize,
      storageKey,
      status: VideoStatus.UPLOADING,
    };

    const savedVideo = await this.videoRepositoryPort.create(Video);

    const uploadUrl = this.videoStoragePort.createUploadUrl(storageKey);

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
