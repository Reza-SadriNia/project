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
  async getTeamById(req, res, next) {
    try {
      const TeamId = req.params.id
      const findResult = await TeamModel.findOne({ TeamId }, { __v: 0 })
      if (!findResult) throw { status: 400, message: "Team Not Found !" }
      return res.status(200).json(findResult)
    } catch (error) {
      next(error)
    }
  }
  async getMyTeams(req, res, next) {
    try {
      const userId = req.user._id
      const teams = await TeamModel.find({
        $or: [
          { owner: userId },
          { users: userId }
        ]
      })
      if (!teams) throw { status: 400, message: "Your Not in Any Teams" }
      return res.status(200).json(teams)
    } catch (error) {
      next(error)
    }
  }
  async removeTeam(req, res, next) {
    try {
      const TeamId = req.params.id
      const team = await TeamModel.findById(TeamId)
      if (!team) throw { status: 400, message: "Team Not Found !" }
      const deleteResult = await TeamModel.deleteOne({ _id: TeamId })
      if (deleteResult.deletedCount == 1) return res.status(200).json({
        status: 200,
        success: true,
        message: "Delete Success"
      })
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Delete Faild"
      })
    } catch (error) {
      next(error)
    }
  }
  inviteUserToTeam() {

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