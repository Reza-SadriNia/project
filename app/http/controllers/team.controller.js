const TeamModel = require("../../models/team");
const { UserModel } = require("../../models/user");

class TeamController {
  async createTeam(req, res, next) {
    try {
      const { name, description } = req.body
      const owner = req.user._id
      const findusername = await UserModel.findOne({ owner })
      const username = findusername.username
      const team = await TeamModel.create({ name, description, owner, username })
      if (!team) throw { status: 500, message: "create team faild" }
      return res.status(201).json({
        status: 201,
        success: true,
        message: "create team success"
      })
    } catch (error) {
      next(error)
    }
  }
  async getListOfTeams(req, res, next) {
    try {
      const teams = await TeamModel.find({})
      return res.status(200).json(teams)
    } catch (error) {
      next(error)
    }
  }
  inviteUserToTeam() {

  }
  removeTeam() {

  }
  updateTeam() {

  }
  removeTeamById() {

  }
  remvoeUserFromTeam() {

  }
}

module.exports = {
  TeamController: new TeamController
}