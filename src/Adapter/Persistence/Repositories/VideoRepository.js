import { VideoRepositoryPort } from "../../../Core/Video/Ports/VideoRepositoryPort.js";

export class VideRepository extends VideoRepositoryPort {
  constructor(prisma, videoMapper) {
    super();
    this.prisma = prisma;
    this.videoMapper = videoMapper;
  }

  async create(video) {
    const entity = this.videoMapper.toEntity(video);
    const videoEntity = await this.prisma.video.create({ entity });
    return this.videoMapper.toDomain(entity);
  }

  async findById(videoId) {
    const videoEntity = await this.prisma.video.findUnique({
      where: {
        id: videoId,
      },
    });
    return this.videoMapper.toDomain(videoEntity);
  }

  async update(video) {
    const data = this.videoMapper.toEntity(video);
    const entity = await this.prisma.video.update({
      while: {
        id: video.id,
      },
      data,
    });
    return this.videoMapper.toDomain(entity);
  }

  async delete(videoId) {
    await this.prisma.video.delete({
      where: {
        id: videoId,
      },
    });
  }
}
