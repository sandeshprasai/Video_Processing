import { Router } from "express";

export class VideoRoutes {
  constructor(videoController, authMiddleware) {
    this.videoController = videoController;
    this.authMiddleware = authMiddleware;
    this.router = Router();
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.post(
      "/upload-url",
      this.authMiddleware.authenticate.bind(this.authMiddleware),
      this.videoController.createUploadUrl.bind(this.videoController),
    );
  }
  getRouter() {
    return this.router;
  }
}
