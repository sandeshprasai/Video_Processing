import express from "express";
import cookieParser from "cookie-parser";

import { LoginValidator } from "../Adapter/API/Middleware/ValidateLoginInput.js";
import { RegisterValidator } from "../Adapter/API/Middleware/RegisterValidation.js";
export class Application {
  constructor(container) {
    this.app = express();
    this.container = container;
  }

  setup() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());

    const authRoutes = this.container.get("authRoutes");
    const authController = this.container.get("authController");
    const videoRoutes = this.container.get("videoRoutes");
    const videoWebHookRoutes = this.container.get("videoWebHookRoutes");

    this.app.get("/health", (req, res) => {
      res.json({ status: "Up", timestamp: new Date() });
    });
    this.app.use("/api/v1/auth", authRoutes.getRouter());
    this.app.use("/api/v1/videos", videoRoutes.getRouter());
    this.app.use("/api/v1/videos", videoWebHookRoutes.getRouter());
    return this.app;
  }
}
