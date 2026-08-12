import { Environment } from "./Environment.js";
import { PrismaClient } from "@prisma/client";

import { UserRepository } from "../Adapter/Persistence/Repositories/UserRepository.js";
import { AuthProvider } from "../Adapter/Auth/AuthProvider.js";

import { AuthService } from "../Core/Auth/Services/AuthService.js";
import { AuthController } from "../Adapter/API/Controller/AuthController.js";

import { PasswordHasher } from "../Adapter/Auth/PasswordHasher.js";

import { VideoRepository } from "../Adapter/Persistence/Repositories/VideoRepository.js";
import { VideoMapper } from "../Adapter/Persistence/Repositories/Mapper/VideoMapper.js";

import { MiniIoStorage } from "../Adapter/Storage/MiniIoStorage.js";
import { VideoService } from "../Core/Video/Services/VideoService.js";
import { VideoController } from "../Adapter/API/Controller/VideoController.js";

import { VideoRoutes } from "../Adapter/API/Routes/VideoRoutes.js";

import { AuthMiddleware } from "../Adapter/API/Middleware/AuthMiddleware.js";

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
    const videoRepository = new VideoRepository(db, VideoMapper);
    const videoStorage = new MiniIoStorage(env);

    const videoService = new VideoService(videoRepository, videoStorage);

    const authProvider = new AuthProvider(
      env.get("jwtSecret"),
      env.get("jwtExpiresIn") || "1d",
    );
    const passwordHasher = new PasswordHasher();
    const authService = new AuthService(
      userRepository,
      authProvider,
      passwordHasher,
    );
    const authController = new AuthController(authService, passwordHasher);
    const videoController = new VideoController(videoService);
    const authMiddleware = new AuthMiddleware(authProvider);
    const videoRoutes = new VideoRoutes(videoController, authMiddleware);

    this.instances = {
      env,
      db,

      userRepository,
      videoRepository,

      authProvider,
      passwordHasher,
      authService,
      authController,
      authMiddleware,

      videoStorage,
      videoService,
      VideoController,

      videoRoutes,
    };
    console.log("[Container]: Video dependencies initialized");
    return this;
  }

  get(key) {
    return this.instances[key];
  }
}
