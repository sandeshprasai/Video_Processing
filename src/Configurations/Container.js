import { Environment } from "./Environment.js";
import { PrismaClient } from "@prisma/client";

// Routes
import { VideoRoutes } from "../Adapter/API/Routes/VideoRoutes.js";
import { VideoWebHookRoutes } from "../Adapter/API/Routes/VideoWebHookRoutes.js";

// Controllers
import { AuthController } from "../Adapter/API/Controller/AuthController.js";
import { VideoController } from "../Adapter/API/Controller/VideoController.js";
import { VideoWebHookController } from "../Adapter/API/Controller/VideoWebHookController.js";

// Middleware
import { AuthMiddleware } from "../Adapter/API/Middleware/AuthMiddleware.js";

// Services
import { AuthService } from "../Core/Auth/Services/AuthService.js";
import { VideoService } from "../Core/Video/Services/VideoService.js";
import { VideoWebHookServices } from "../Core/Video/Services/VideoWebHookServices.js";

// Repositories
import { UserRepository } from "../Adapter/Persistence/Repositories/UserRepository.js";
import { VideoRepository } from "../Adapter/Persistence/Repositories/VideoRepository.js";
import { VideoMapper } from "../Adapter/Persistence/Repositories/Mapper/VideoMapper.js";

// Auth
import { AuthProvider } from "../Adapter/Auth/AuthProvider.js";
import { PasswordHasher } from "../Adapter/Auth/PasswordHasher.js";

// Storage
import { MiniIoStorage } from "../Adapter/Storage/MiniIoStorage.js";

export class Container {
  constructor() {
    this.instances = {};
  }

  async Build() {
    // Infrastructure
    const env = new Environment();
    const db = new PrismaClient();

    try {
      await db.$connect();

      console.log("[Database]: Connected successfully to PostgreSQL");
    } catch (error) {
      console.error("[Database]: Connection failed!");
      console.error(error.message);

      process.exit(1);
    }

    // Repositories
    const userRepository = new UserRepository(db);

    const videoRepository = new VideoRepository(db, VideoMapper);

    // Auth
    const authProvider = new AuthProvider(
      env.get("jwtSecret"),
      env.get("jwtExpiresIn") || "1d",
    );

    const passwordHasher = new PasswordHasher();

    // Storage
    const videoStorage = new MiniIoStorage(env);

    // Services
    const authService = new AuthService(
      userRepository,
      authProvider,
      passwordHasher,
    );

    const videoService = new VideoService(videoRepository, videoStorage);

    const videoWebHookService = new VideoWebHookServices(videoRepository);

    // Middleware
    const authMiddleware = new AuthMiddleware(authProvider);

    // Controllers
    const authController = new AuthController(authService, passwordHasher);

    const videoController = new VideoController(videoService);

    const videoWebHookController = new VideoWebHookController(
      videoWebHookService,
    );

    // Routes
    const videoRoutes = new VideoRoutes(videoController, authMiddleware);

    const videoWebHookRoutes = new VideoWebHookRoutes(videoWebHookController);

    this.instances = {
      // Infrastructure
      env,
      db,

      // Repositories
      userRepository,
      videoRepository,

      // Auth
      authProvider,
      passwordHasher,

      // Storage
      videoStorage,

      // Services
      authService,
      videoService,
      videoWebHookService,

      // Middleware
      authMiddleware,

      // Controllers
      authController,
      videoController,
      videoWebHookController,

      // Routes
      videoRoutes,
      videoWebHookRoutes,
    };

    console.log("[Container]: Dependencies initialized");

    return this;
  }

  get(key) {
    return this.instances[key];
  }
}
