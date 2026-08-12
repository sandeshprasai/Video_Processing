export class VideoController {
  constructor(videoService) {
    this.videoService = videoService;
  }

  async createUploadUrl(req, res) {
    try {
      const { fileName, mimeType, duration, size } = req.body;
      if (!fileName || !mimeType || !size) {
        return res.status(400).json({
          error: "fileName, mimeType and size are required",
        });
      }

      const userId = req.user.id;

      const result = await this.videoService.createUploadUrl(
        userId,
        fileName,
        mimeType,
        size,
      );

      return res
        .status(201)
        .json({ video: result.video, uploadUrl: result.uploadUrl });
    } catch (error) {
      console.error("[VideoController] : ", error);

      return res
        .status(500)
        .json({ error: "Unable to create video Upload URL" });
    }
  }
}
