const { body } = require("express-validator");
const path = require("path")

function imageValidator() {
  return [
    body("image").custom((file, { req }) => {
      if (Object.keys(req.file).length == 0) throw "please choose a picture"
      const ext = path.extname(req.file.orginalname)
      const exts = [".png", ".jpg", ".jpeg", ".gif"]
      if (!exts.includes(ext)) throw "choose a valid picture Format"
      const maxSize = 2 * 1024 * 1024
      if (req.file.size > maxSize) throw "The file size cannot be more than 2 MB"
      return true
    })
  ]
}

module.exports = {
  imageValidator
}