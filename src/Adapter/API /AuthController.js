import { UserAlreadyExists } from "../../Core/Errors/UserAlreadyExists.js";
import { UserNotFound } from "../../Core/Errors/UserNotFound.js";

export class AuthController {
  constructor(authServicePort , passwordHasherPort) {
    this.authServicePort = authServicePort;
  }

  async register(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password is required" });
      }

      const result = await this.authServicePort.register(email, password);
      res.cookie("access-token", result.token, {
        maxAge: 60*60*1000*24,
        httpOnly: true,
        secure: true,
        sameSite: "lax",
      });
      return res.status(201).json({ user: result.user });
    } catch (error) {
      if (error instanceof UserAlreadyExists) {
        return res.status(409).json({ error: "User already exists" });
      }

      return res.status(500).json({ error: "Error While saving the user" });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await this.authServicePort.login(email, password);
      res.cookie("access-token", result.token, {
        maxAge: 60*60*1000*24,
        httpOnly: true,
        secure: true,
        sameSite: "lax",
      });
      return res.status(200).json({ user: result.user });
    } catch (error) {
      if (error instanceof UserNotFound) {
        return res.status(400).json({ error: "Invalid Email or Password" });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
