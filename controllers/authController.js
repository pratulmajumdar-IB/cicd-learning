const authService = require("../services/authService");
const { registerSchema, loginSchema } = require("../validators/authValidator");

const register = async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.details.map((detail) => detail.message),
      });
    }
    const { name, email, age, password } = value;
    const user = await authService.registerUser(name, email, age, password);
    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.details.map((detail) => detail.message),
      });
    }
    const { email, password } = value;
    const result = await authService.loginUser(email, password);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(401).json({
      message: "Invalid email or password",
    });
  }
};

module.exports = {
  register,
  login,
};
