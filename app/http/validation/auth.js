const { body } = require("express-validator")
const { UserModel } = require("../../models/user")

function registerValidator() {
  return [
    body("username").custom(async (value, ctx) => {
      // console.log(value, ctx.req.body);
      if (value) {
        const checkUsername = /^[a-z]+[a-z0-9\.\_]{2,}/gi
        if (checkUsername.test(value)) {
          const user = await UserModel.findOne({ username: value })
          if (user) throw "Duplicate Username"
          return true
        }
        throw "username invalid"
      } else {
        throw "UserName cannot be Empty"
      }
    }),
    body("email").isEmail().withMessage("invalid Email")
      .custom(async email => {
        const user = await UserModel.findOne({ email })
        if (user) throw "Duplicate email address"
        return true
      }),
    body("mobile").isMobilePhone("fa-IR").withMessage("phone number is invalid")
      .custom(async mobile => {
        const user = await UserModel.findOne({ mobile })
        if (user) throw "Duplicate Mobile Number"
        return true
      }),
    body("password").custom((value, ctx) => {
      // console.log(value, ctx.req.body);
      if (!value) throw "password cannot be empty"
      if (value !== ctx?.req?.body?.confirm_password) throw "password not match"
      return true
    })
  ]
}

module.exports = {
  registerValidator
}