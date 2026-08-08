
import { token } from "morgan";
import { UserAlreadyExists } from "../../Core/Errors/UserAlreadyExists.js";

export class AuthController {
  constructor(authServicePort) {
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
      return res.status(201).json({ user:result.user , token: result.token });
    } catch (error) {
      if (error instanceof UserAlreadyExists) {
        return res.status(409).json({ error: "User already exists" });
      }

      return res.status(500).json({error:"Error While saving the user"})
    }
  }
}
