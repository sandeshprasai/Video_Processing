import { Video } from "../../../../Core/Video/Domain/Video.js";
import { VideoEntity } from "../../Entities/VIdeoEntity.js";

export class VideoMapper {
  static toDomain(VideoEntity) {
    if (!VideoEntity) return null;

    return new Video({
      id: VideoEntity.id,
      userId: VideoEntity.userId,
      originalFileName: VideoEntity.originalFileName,
      storageKey: VideoEntity.storageKey,
      mimeType: VideoEntity.mimeType,
      size: Number(VideoEntity.size),
      duration: VideoEntity.duration,
      createdAt: VideoEntity.createdAt,
      updatedAt: VideoEntity.updatedAt,
    });
  }

  static toEntity(Video) {
    if (!Video) return null;

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
