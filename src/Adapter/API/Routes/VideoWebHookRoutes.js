import { Router } from "express";

export class VideoWebHookRoutes {
  constructor(videoWebHookController) {
    this.videoWebHookController = videoWebHookController;
    this.router = Router();
    this.videoWebHookRoutes();
  }
  videoWebHookRoutes() {
    this.router.post(
      "/webhooks/minio",
      this.videoWebHookController.completeUpload.bind(
        this.videoWebHookController,
      ),
    );
  }
  getRouter() {
    return this.router;
  }
}
