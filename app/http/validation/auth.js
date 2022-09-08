const { body } = require("express-validator")
function registerValidator() {
  return [
    body("username").notEmpty().isLength({ min: 4, max: 25 }).custom((value, ctx) => {
      if (value) {
        const checkUsername = /^[a-z]+[a-z0-9 \_|.]{2,}/gi
        if (checkUsername.test(value)) {
          return true
        }
        throw "username invalid"
      }
      throw "UserName cannot be Empty"
    }),
    body("email").not().isEmail().withMessage("invalid Email"),
    body("mobile").not().isMobilePhone("fa-IR").withMessage("phone  number is invalid"),
    body("password").isLength({ min: 6, max: 16 }).withMessage("Password must be between 6 - 16 character ")
      .custom((value, ctx) => {
        if (!value) throw "password cannot be empty"
        if (value !== ctx?.req?.body?.confirm_password) throw "password not match"
        return true
      })
  ]
}

module.exports = {
  registerValidator
}