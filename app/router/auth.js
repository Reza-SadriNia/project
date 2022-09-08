const router = require("express").Router()
const { AuthController } = require("../http/controllers/auth.controller")
const { expressValidatorMapper } = require("../http/middleware/checkErrors")
const { registerValidator } = require("../http/validation/auth")

router.post("/register", registerValidator(), expressValidatorMapper, AuthController.register)



module.exports = {
  authRoutes: router
}