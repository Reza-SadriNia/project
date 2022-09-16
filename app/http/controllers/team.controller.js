const autoBind = require("auto-bind");
const { TeamModel } = require("../../models/team");
const { UserModel } = require("../../models/user");

class TeamController {
  constructor() {
    autoBind(this)
  }
  async createTeam(req, res, next) {
    try {
      const { name, description } = req.body
      const owner = req.user._id
      // const findusername = await UserModel.findOne({ owner })
      // const username = findusername.username
      const username = req.user.username
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
  async findUserInTeam(teamId, userId) {
    const result = await TeamModel.findOne({
      $or: [{ owner: userId }, { users: userId }],
      _id: teamId
    })
    return !!result
  }
  async inviteUserToTeam(req, res, next) {
    try {
      const userId = req.user._id
      console.log(userId);
      const { username, teamId } = req.params
      console.log(username, teamId);
      const team = await this.findUserInTeam(teamId, userId)
      if (!team) throw { status: 400, message: "Team Not Found For Invite" }
      const user = await UserModel.findOne({ username })
      if (!user) throw { status: 400, message: "User Not Found For Invite" }
      const userInvited = await this.findUserInTeam(teamId, user._id)
      if (userInvited) throw { status: 400, message: "This User exist in Team" };
      const request = {
        caller: req.user.username,
        requestDate: new Date(),
        teamId,
        status: "Pending"
      }
      const updateUserResult = await UserModel.updateOne({ username },
        { $push: { inviteRequest: request } }
      )
      if (updateUserResult.modifiedCount == 0) throw { status: 500, message: "Invite Faild!" }
      return res.status(200).json({
        status: 200,
        success: true,
        message: "Invite Success"
      })
    } catch (error) {
      next(error)
    }
  }
  async updateTeam(req, res, next) {
    try {
      const data = { ...req.body }
      Object.keys(data).forEach(key => {
        if (!data[key]) delete data[key]
        if (["", " ", undefined, null, NaN].includes(data[key])) delete data[key]
      })
      const userId = req.user._id
      const { teamId } = req.params
      const team = await TeamModel.findOne({ _id: teamId, owner: userId })
      if (!team) throw { status: 404, message: "Team Not Found !" }
      const updateResult = await TeamModel.updateOne({ _id: teamId }, { $set: data })
      if (updateResult.modifiedCount == 0) throw { status: 500, message: "update Faild" }
      return res.status(200).json({
        status: 200,
        success: true,
        message: "Update Success"
      })
    } catch (error) {
      next(error)
    }
  }
  removeTeamById() {

  }
  remvoeUserFromTeam() {

  }
}

module.exports = {
  TeamController: new TeamController
}