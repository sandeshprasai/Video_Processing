import Joi from "joi";

export class LoginValidator {
  constructor() {
    this.loginSchema = Joi.object({
      email: Joi.string().trim().email().required().messages({
        "string.empty": "Email is required",
        "any.required": "Email is required",
      }),
      password: Joi.string()
        .min(6)
        .max(20)
        .pattern(/^\S+$/)
        .required()
        .messages({
          "string.empty": "Password is required",
          "string.min": "Password must be at least 6 characters",
          "string.max": "Password must not exceed 20 characters",
          "string.pattern.base": "Password must not contain whitespace",
          "any.required": "Password is required",
        }),
    });
  }

  validateLoginInput = async (req, res, next) => {
    try {
      const validatedData = await this.loginSchema.validateAsync(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      req.body = validatedData;
      next();
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  };
}
