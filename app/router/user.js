const { UserController } = require("../http/controllers/user.controller")
const { checklogin } = require("../http/middleware/autologin")
const router = require("express").Router()

router.get("/profile", checklogin, UserController.getProfile)
router.post("/profile", checklogin, UserController.editProfile)

module.exports = {
  userRoutes: router
}