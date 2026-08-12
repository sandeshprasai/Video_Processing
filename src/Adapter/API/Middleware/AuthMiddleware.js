export class AuthMiddleware {
  constructor(authProvider) {
    this.authProvider = authProvider;
  }

  authenticate(req, res, next) {
    try {
      const token = req.cookies?.["access-token"];

      if (!token) {
        return res.status(401).json({
          error: "Authentication required",
        });
      }
      const payload = this.authProvider.verifyToken(token);
      req.user = { id: payload.userId };
      next();
    } catch (error) {}
  }
}
