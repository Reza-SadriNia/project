const { hashString } = require("../../modules/function")
const { UserModel } = require("../../models/user")

class AuthController {
  async register(req, res, next) {
    try {
      const { username, password, email, mobile } = req.body
      const hash_password = hashString(password)
      const user = await UserModel.create({
        username,
        password: hash_password,
        email,
        mobile
      })
      // .catch(err => {
      //   if (err?.code == 11000) throw {
      //     status: 400,
      //     message: "Duplicate values"
      //   }
      //   // console.log(JSON.stringify(err, null, 2));
      // })
      return res.json(user)
    } catch (error) {
      next(error)
    }
  }
  login() {

  }
  resetpassword() {

  }

}

module.exports = {
  AuthController: new AuthController
}