const mongoose = require("mongoose")

const InviteRequest = new mongoose.Schema({
  teamId: { type: mongoose.Types.ObjectId, required: true },
  caller: { type: String, required: true, lowercase: true },
  dateRequest: { type: Date, default: new Date() },
  status: { type: String, default: "Pending" }
})

const UserSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  username: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, unique: true },
  roles: { type: [String], default: ["USER"] },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile_image: { type: String, required: false },
  skills: { type: [String], default: [] },
  teams: { type: [mongoose.Types.ObjectId], default: [] },
  token: { type: String, default: "" },
  inviteRequest: {
    type: [InviteRequest]
  }
}, {
  timestamps: true
})

const UserModel = mongoose.model("user", UserSchema)

module.exports = { UserModel }