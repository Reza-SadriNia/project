const { hashString, tokenGenerator } = require("../../modules/function")
const { UserModel } = require("../../models/user")
const bcrypt = require("bcrypt")

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
  async login(req, res, next) {
    try {
      const { username, password } = req.body
      // console.log(req.headers);
      const user = await UserModel.findOne({ username })
      if (!user) throw { status: 401, message: "username or password its wrong" }

      const compareresult = bcrypt.compareSync(password, user.password)
      if (!compareresult) throw { status: 401, message: "username or password its wrong" }
      const token = tokenGenerator({ username })
      user.token = token
      await user.save()

      return res.status(200).json({
        status: 200,
        success: true,
        message: "login Success",
        token: tokenGenerator({ username })
      })
    } catch (error) {
      next(error)
    }
  }
  resetpassword() {

  }

}

module.exports = {
  AuthController: new AuthController
}