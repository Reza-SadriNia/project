const { ProjectController } = require("../http/controllers/project.controller")
const { createProjectValidator } = require("../http/validation/project")
const { expressValidatorMapper } = require("../http/middleware/checkErrors")
const { checklogin } = require("../http/middleware/autologin")
const router = require("express").Router()

router.post("/create", checklogin, createProjectValidator(), expressValidatorMapper, ProjectController.createProject)

module.exports = {
  projectRoutes: router
}