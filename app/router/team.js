const { TeamController } = require("../http/controllers/team.controller")
const { checklogin } = require("../http/middleware/autologin")
const { createteamValidation } = require("../http/validation/team")
const { expressValidatorMapper } = require("../http/middleware/checkErrors")
const { mongoIdValidator } = require("../http/validation/public")
const router = require("express").Router()

router.post("/craete", checklogin, createteamValidation(), expressValidatorMapper, TeamController.createTeam)
router.get("/getListOfTeams", checklogin, expressValidatorMapper, TeamController.getListOfTeams)
router.get("/", checklogin, TeamController.getMyTeams)
router.get("/invite/:teamId/:username", checklogin, expressValidatorMapper, TeamController.inviteUserToTeam)
router.delete("/remove/:id", checklogin, mongoIdValidator(), expressValidatorMapper, TeamController.removeTeam)
router.get("/:id", checklogin, mongoIdValidator(), expressValidatorMapper, TeamController.getTeamById)



module.exports = {
  teamRoutes: router
}