import { PasswordHasherPort } from "../../Core/Auth/Ports/PasswordHasherPort.js";
import bcrypt from "bcryptjs";

export class PasswordHasher extends PasswordHasherPort {
  async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }
  async verifyPassword(password, hash) {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  }
}
