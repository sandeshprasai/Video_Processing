import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";

import {User} from "../Domain/User.js";
import { AuthServicePort } from "../Ports/AuthServicePort.js";
import { UserAlreadyExists } from "../../Errors/UserAlreadyExists.js";

export class AuthService extends AuthServicePort {
  constructor(userRepositoryPort, authProviderPort) {
    super();
    this.userRepositoryPort = userRepositoryPort;
    this.authProviderPort = authProviderPort;
  }

  async register(email, password) {
    const existingUser = await this.userRepositoryPort.findByEmail(email);
    if (existingUser) {
      throw new UserAlreadyExists(409,"User Already Exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      id: randomUUID(),
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    const savedUser = await this.userRepositoryPort.Save(newUser);
    const token = this.authProviderPort.generateToken({ userId: savedUser.id });
    return { user: savedUser, token };
  }
}
