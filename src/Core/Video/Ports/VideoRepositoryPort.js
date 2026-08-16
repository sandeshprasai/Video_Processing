import { Video } from "../Domain/Video.js";

export class VideoRepositoryPort {
  create(video) {
    throw new Error("Method Not Implemented");
  }
  findById(videId) {
    throw new Error("Method Not Implemented");
  }
  update(video) {
    throw new Error("Method Not Implemented");
  }
  delete(videId) {
    throw new Error("Method Not Implemented");
  }
  findByStorageKey(storageKey) {
    throw new Error("Method Not Implemented");
  }
}
