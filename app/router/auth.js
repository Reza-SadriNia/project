const router = require("express").Router()
const { AuthController } = require("../http/controllers/auth.controller")
const { expressValidatorMapper } = require("../http/middleware/checkErrors")
const { registerValidator, loginValidation } = require("../http/validation/auth")

router.post("/register",
  registerValidator(),
  expressValidatorMapper,
  AuthController.register
)

router.post("/login",
  loginValidation(),
  expressValidatorMapper,
  AuthController.login
)



module.exports = {
  authRoutes: router
}