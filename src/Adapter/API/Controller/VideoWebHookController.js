export class VideoWebHookController {
  constructor(videoWebHookService) {
    this.videoWebHookService = videoWebHookService;
  }

  async completeUpload(req, res) {
    const record = req.body?.Records?.[0];

    if (!record) {
      return res.status(400).json({
        message: "No MinIO record found",
      });
    }

    const bucket = record.s3.bucket.name;
    const key = decodeURIComponent(record.s3.object.key);

    await this.videoWebHookService.completeUpload(key);

    return res.status(200).json({
      received: true,
      bucket,
      key,
    });
  }
}
