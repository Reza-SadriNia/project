const { UserController } = require("../http/controllers/user.controller")
const { checklogin } = require("../http/middleware/autologin")
const { imageValidator } = require("../http/validation/user")
const { upload_multer } = require("../modules/multer")
const router = require("express").Router()

router.get("/profile", checklogin, UserController.getProfile)
router.post("/profile", checklogin, UserController.editProfile)
router.post("/profile-image", imageValidator(), upload_multer.single("image"),
  checklogin,
  UserController.uploadProfileImage
)
router.get("/invite-requests", checklogin, UserController.getAllRequest)
router.get("/requests/:status", checklogin, UserController.getRequestsByStatus)

module.exports = {
  userRoutes: router
}