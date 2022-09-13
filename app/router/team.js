const { TeamController } = require("../http/controllers/team.controller")
const { checklogin } = require("../http/middleware/autologin")
const { createteamValidation } = require("../http/validation/team")
const { expressValidatorMapper } = require("../http/middleware/checkErrors")
const router = require("express").Router()

router.post("/craete", checklogin, createteamValidation(), expressValidatorMapper, TeamController.createTeam)
router.get("/getListOfTeams", checklogin, expressValidatorMapper, TeamController.getListOfTeams)

module.exports = {
  teamRoutes: router
}