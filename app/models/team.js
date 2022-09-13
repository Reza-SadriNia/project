const mongoose = require("mongoose")
const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  username: { type: String, required: true, unique: true },
  users: { type: [mongoose.Types.ObjectId], default: [] },
  projects: { type: String },
  owner: { type: mongoose.Types.ObjectId, default: ["USER"], required: true },
}, {
  timestamps: true
})

const TeamModel = mongoose.model("team", TeamSchema)

module.exports = TeamModel