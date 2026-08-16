import { Router } from "express";

export class AuthRoutes {
  constructor(authController, registerValidator, loginValidator) {
    this.authController = authController;
    this.registerValidator = registerValidator;
    this.loginValidator = loginValidator;
    this.router = Router();
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.post(
      "/register",
      this.registerValidator.validateRegisterInput,
      this.authController.register.bind(this.authController),
    );
    this.router.post(
      "/login",
      this.loginValidator.validateLoginInput,
      this.authController.login.bind(this.authController),
    );

    this.router.post(
      "/logout",
      this.authController.logout.bind(this.authController),
    );
  }

  getRouter() {
    return this.router;
  }
}
