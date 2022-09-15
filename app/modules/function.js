const bcrypt = require('bcrypt')
const fs = require('fs')
const jwt = require("jsonwebtoken")
const path = require("path")

function hashString(str) {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(str, salt)
}

function tokenGenerator(payload) {
  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "3days" })
  return token
}

function verifyjwtToken(token) {
  const result = jwt.verify(token, process.env.SECRET_KEY)
  if (!result?.username) throw { status: 401, message: "Please login To Your Account" }
  return result
}

function createUploadpath() {
  let d = new Date()
  const Year = "" + d.getFullYear()
  const Month = "" + d.getMonth()
  const Day = "" + d.getDate()
  const uploadPath = path.join(__dirname, "..", "..", "public", "uploads", Year, Month, Day)
  fs.mkdirSync(uploadPath, { recursive: true })
  return path.join("public", "uploads", Year, Month, Day)
}

function createLink(fileaddress, req) {
  // console.log(req);
  return req.protocol + "://" + req.get("host") + "/" + (fileaddress.replace(/[\\\\]/gm, "/"))
}

module.exports = {
  hashString,
  tokenGenerator,
  verifyjwtToken,
  createUploadpath,
  createLink,
}