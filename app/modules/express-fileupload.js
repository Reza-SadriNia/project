const path = require("path")
const { createUploadpath } = require("./function")


const uploadfile = async (req, res, next) => {
  try {
    if (req.file || Object.keys(req.files).length == 0) throw { status: 400, message: "Please choose a picture for Project" }
    let image = req.files.image
    let type = path.extname(image.name)
    if (![".png", ".jpg", "jpeg"].includes(type)) throw { status: 400, message: "invlaid format image" }
    const imagepath = path.join(createUploadpath(), (Date.now() + path.extname(image.name)))
    req.body.image = imagepath.substring(7)
    let uploadpath = path.join(__dirname, "..", "..", imagepath)
    // console.log(uploadpath);
    image.mv(uploadpath, (err) => {
      if (err) throw { status: 500, message: "upload project picture faild!" }
      next()
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  uploadfile
}