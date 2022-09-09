const { UserModel } = require("../../models/user")
const { verifyjwtToken } = require("../../modules/function")

const checklogin = async (req, res, next) => {
  try {
    const authorization = req?.headers?.authorization
    console.log(authorization);
    if (!authorization) throw { status: 401, message: "authorization not Found" }
    let token = authorization.split(" ")?.[1]
    if (!token) throw { status: 401, message: "token not found" }
    const result = verifyjwtToken(token)
    const { username } = result
    console.log(result);
    const user = await UserModel.findOne({ username }, { password: 0 })
    if (!user) throw { status: 401, message: "user not found" }
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  checklogin
}