
export class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  async register(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password is required" });
      }

      const result = await this.authService.register(email, password);
      return res.status(201).json({ result });
    } catch (error) {
        return res.status(400).json({error:"Error while saving user"});
    }
  }
}
