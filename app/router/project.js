const { ProjectController } = require("../http/controllers/project.controller")
const { createProjectValidator } = require("../http/validation/project")
const { expressValidatorMapper } = require("../http/middleware/checkErrors")
const { checklogin } = require("../http/middleware/autologin")
const { uploadfile } = require("../modules/express-fileupload")
const fileUpload = require("express-fileupload")
const { mongoIdValidator } = require("../http/validation/public")
const router = require("express").Router()

router.post("/create",
  fileUpload(),
  checklogin,
  uploadfile,
  createProjectValidator(),
  expressValidatorMapper,
  ProjectController.createProject
)
router.get("/listOfProject",
  checklogin,
  expressValidatorMapper,
  ProjectController.getAllProject
)
router.get("/getProjectById/:id",
  checklogin,
  mongoIdValidator(), // Check MongoID
  expressValidatorMapper,
  ProjectController.getProjectById
)
router.delete("/removeProject/:id",
  checklogin,
  mongoIdValidator(), // Check MongoID
  expressValidatorMapper,
  ProjectController.removeProject
)
router.put("/updateProject/:id",
  checklogin,
  mongoIdValidator(), // Check MongoID
  expressValidatorMapper,
  ProjectController.updateProject
)
router.patch("/updateProjectProfile/:id",
  fileUpload(),
  checklogin,
  uploadfile,
  mongoIdValidator(), // Check MongoID
  expressValidatorMapper,
  ProjectController.updateProjectImage
)


module.exports = {
  projectRoutes: router
}