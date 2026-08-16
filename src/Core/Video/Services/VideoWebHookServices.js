import { VideoStatus } from "../../../Commons/Constants/VideoStatus.js";
import { VideoNotFound } from "../../Errors/VideoNotFound.js";
import { VideoWebHookPort } from "../Ports/VideoWebHookPort.js";

export class VideoWebHookServices extends VideoWebHookPort {
  constructor(videoRepository) {
    super();
    this.videoRepository = videoRepository;
  }
  async completeUpload(key) {
    const video = await this.videoRepository.findByStorageKey(key);
    if (!video) {
      throw new VideoNotFound(404, "Video Not Found");
    }
    video.status = VideoStatus.PROCESSING;
    await this.videoRepository.update(video);
  }
}
