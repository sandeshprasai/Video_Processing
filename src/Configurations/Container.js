import { Environment } from "./Environment.js";
import { PrismaClient } from "@prisma/client";

import { UserRepository } from "../Adapter/Persistence/Repositories/UserRepository.js";
import { AuthProvider } from "../Adapter/Auth/AuthProvider.js";
import { AuthService } from "../Core/Auth/Services/AuthService.js";
import { AuthController } from "../Adapter/API /AuthController.js";

export class Container {
  constructor() {
    this.instances = {};
  }

  async Build() {
    const env = new Environment();
    const db = new PrismaClient();
    try {
      await db.$connect();
      console.log("[Database]: Connected successfully to PostgreSQL");
    } catch (error) {
      console.error(" [Database]: Connection failed!");
      console.error(error.message);
      process.exit(1);
    }

    const userRepository = new UserRepository(db);

    const authProvider = new AuthProvider(
      env.get("jwtSecret"),
      env.get("jwtExpiresIn") || "1d",
    );

    const authService = new AuthService(userRepository, authProvider);


    const authController = new AuthController(authService)

    this.instances = {
      env,
      db,
      userRepository,
      authProvider,
      authService,
      authController
    };

    return this;
  }

  get(key) {
    return this.instances[key];
  }
}
