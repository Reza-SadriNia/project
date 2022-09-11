const { ProjectModel } = require("../../models/project")

class ProjectController {
  async createProject(req, res, next) {
    try {
      const { title, text, image, tags } = req.body
      const owner = req.user._id
      const result = await ProjectModel.create({ title, text, image, owner, tags })
      if (!result) throw { status: 400, message: "Faild in Create Project" }
      return res.status(201).json({
        status: 201,
        success: true,
        message: "Create Project Success"
      })
    } catch (error) {
      next(error)
    }
  }
  getAllProject() {

  }
  getProjectById() {

  }
  getAllProjectOfTeam() {

  }
  getProjectOfUser() {

  }
  updateProject() {

  }
  removeProject() {

  }

}

module.exports = {
  ProjectController: new ProjectController
}