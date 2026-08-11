import { Video } from "../../../../Core/Video/Domain/Video.js";
import { VideoEntity } from "../../Entities/VideoEntity.js";

export class VideoMapper {
  static toDomain(videoEntity) {
    if (!videoEntity) return null;

    return new Video({
      id: videoEntity.id,
      userId: videoEntity.userId,
      originalFileName: videoEntity.originalFileName,
      storageKey: videoEntity.storageKey,
      mimeType: videoEntity.mimeType,
      size: Number(videoEntity.size),
      status: videoEntity.status,
      duration: videoEntity.duration,
      createdAt: videoEntity.createdAt,
      updatedAt: videoEntity.updatedAt,
    });
  }

  static toEntity(video) {
    if (!video) return null;

    return new VideoEntity({
      id: video.id,
      userId: video.userId,
      originalFileName: video.originalFileName,
      storageKey: video.storageKey,
      mimeType: video.mimeType,
      size: BigInt(video.size),
      status: video.status,
      duration: video.duration,
      createdAt: video.createdAt,
      updatedAt: video.updatedAt,
    });
  }
}