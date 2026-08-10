export class VideoEntity {
  constructor({
    id,
    userId,
    originalFileName,
    storageKey,
    mimeType,
    size,
    status,
    duration,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.userId = userId;
    this.originalFileName = originalFileName;
    this.storageKey = storageKey;
    this.mimeType = mimeType;
    this.size = size;
    this.status = status;
    this.duration = duration;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
