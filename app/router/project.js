const { ProjectController } = require("../http/controllers/project.controller")
const { createProjectValidator } = require("../http/validation/project")
const { expressValidatorMapper } = require("../http/middleware/checkErrors")
const { checklogin } = require("../http/middleware/autologin")
const { uploadfile } = require("../modules/express-fileupload")
const fileUpload = require("express-fileupload")
const router = require("express").Router()

router.post("/create",
  fileUpload(),
  checklogin,
  uploadfile,
  createProjectValidator(),
  expressValidatorMapper,
  ProjectController.createProject
)
router.post("/listOfProject",
  checklogin,
  expressValidatorMapper,
  ProjectController.getAllProject
)


module.exports = {
  projectRoutes: router
}