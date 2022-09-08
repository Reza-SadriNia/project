const { validationResult } = require("express-validator")
const { expressValidatorMapper } = require("../../modules/function")

class AuthController {
  register(req, res, next) {
    const { username, password, email, mobile } = req.body
    return res.json(req.body)
  }
  login() {

  }
  resetpassword() {

  }

}

module.exports = {
  AuthController: new AuthController
}