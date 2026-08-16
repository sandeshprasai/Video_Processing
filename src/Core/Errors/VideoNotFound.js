export class VideoNotFound extends Error {
  constructor(statusCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.statudCode = statudCode;
  }
}
