const { UserModel } = require("../../models/user")
const { createLink } = require("../../modules/function")

class UserController {
  getProfile(req, res, next) {
    try {
      const user = req.user
      user.profile_image = createLink(user.profile_image, req)
      return res.status(200).json({
        status: 200,
        success: true,
        user
      })
    } catch (error) {
      next(error)
    }
  }
  async editProfile(req, res, next) {
    try {
      let data = req.body
      const userId = req.user._id
      let fields = ['first_name', 'last_name', 'skills']
      let badvalues = ["", " ", null, undefined, 0, -1, NaN, {}, []]

      Object.entries(data).forEach(([key, value]) => {
        if (!fields.includes(key)) delete data[key]
        if (badvalues.includes(value)) delete data[key]
      })

      // console.log(data);
      const result = await UserModel.updateOne({ _id: userId }, { $set: data })
      if (result.modifiedCount > 0) {
        return res.status(200).json({
          status: 200,
          success: true,
          message: "update success"
        })
      }
      throw {
        status: 400,
        message: "update Failed!"
      }
    } catch (error) {
      next(error)
    }
  }
  async uploadProfileImage(req, res, next) {
    try {
      const UserId = req.user._id
      const filepath = req.file?.path?.substring(7)
      const result = await UserModel.updateOne({ _id: UserId }, { $set: { profile_image: filepath } })
      if (result.modifiedCount > 0) return res.status(200)
        .json({
          status: 200,
          success: true,
          message: "Update success"
        })
      throw { status: 400, message: "update faild!" }
    } catch (error) {
      next(error)
    }
  }
  async getAllRequest(req, res, next) {
    try {
      const userId = req.user._id
      const { inviteRequest } = await UserModel.findById(userId, { inviteRequest: 1 })
      return res.status(200).json({ requests: inviteRequest })
    } catch (error) {
      next(error)
    }
  }
  async getRequestsByStatus(req, res, next) {
    try {
      const userId = req.user._id
      const { status } = req.params
      const requests = await UserModel.aggregate([
        {
          $match: { _id: userId }
        },
        {
          $project: {
            inviteRequest: 1,
            _id: 0,
            inviteRequest: {
              $filter: {
                input: "$inviteRequest",
                as: "request",
                cond: {
                  $eq: ["$$request.status", status]
                }
              }
            }
          }
        }
      ])
      return res.status(200).json({
        status: 200,
        success: true,
        requests: requests?.[0]?.inviteRequest || []
      })
    } catch (error) {
      next(error)
    }
  }
  async changeStatusRequest(req, res, next) {
    try {
      const { id, status } = req.params
      const request = await UserModel.findOne({ "inviteRequest._id": id })
      if (!request) throw { status: 400, message: "Request Not Found!" }
      const findRequset = request.inviteRequest.find(item => item.id == id)
      if (findRequset.status !== "Pending") throw { status: 400, message: "Request Isn`t Pending..." }
      if (!["Accepted", "Rejected"].includes(status)) throw { status: 400, message: "Status Invalid" }
      const updateResult = await UserModel.updateOne({ "inviteRequest._id": id }, {
        $set: { "inviteRequest.$.status": status }
      })
      if (updateResult.modifiedCount == 0) throw { status: 500, message: "Change Faild!" }
      return res.status(200).json({
        status: 200,
        success: true,
        message: "change Success"
      })
    } catch (error) {
      next(error)
    }
  }
  addSkills() {

  }
  editSkills() {

  }
  acceptInviteInTeam() {

  }
  rejectInviteInTeam() {

  }
}

module.exports = {
  UserController: new UserController
}