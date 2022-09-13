const { body } = require("express-validator")
const TeamModel = require("../../models/team")

function createteamValidation() {
  return [
    body("name").isLength({ min: 5, max: 15 }).withMessage("team name between 5 - 15 char"),
    body("description").notEmpty().withMessage("description cannot Be Empty"),
    body("username").custom(async (username) => {
      const usernameRegex = /^[a-z]+[a-z0-9\.\-]{3,}$/gim
      if (usernameRegex.test(username)) {
        const team = await TeamModel.findOne({ username })
        if (team) throw "username exist"
        return true
      }
      throw "username its wrong"
    })
  ]
}

module.exports = {
  createteamValidation
}