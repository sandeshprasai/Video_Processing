import { VideoStatus } from "../../../Commons/Constants/VideoStatus.js";

export class Video {
  constructor({ id, userId, originalFileName, storageKey, mimeType, size }) {
    this.id = id;
    this.userId = userId;
    this.originalFileName = originalFileName;
    this.storageKey = storageKey;
    this.mimeType = mimeType;
    this.size = size;
    this.status = VideoStatus.UPLOADING;
    this.duration = null;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
