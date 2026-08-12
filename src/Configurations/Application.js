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

    const loginValidator = new LoginValidator();
    const registerValidator = new RegisterValidator();

    const authController = this.container.get("authController");
    const videoRoutes = this.container.get("videoRoutes");

    this.app.get("/health", (req, res) => {
      res.json({ status: "Up", timestamp: new Date() });
    });

    this.app.post(
      "/api/v1/auth/register",
      registerValidator.validateRegisterInput,
      authController.register.bind(authController),
    );
    this.app.post(
      "/api/v1/auth/login",
      loginValidator.validateLoginInput,
      authController.login.bind(authController),
    );

    this.app.post(
      "/api/v1/auth/logout",
      authController.logout.bind(authController),
    );

    this.app.use("/videos", videoRoutes.getRouter());

    return this.app;
  }
}
