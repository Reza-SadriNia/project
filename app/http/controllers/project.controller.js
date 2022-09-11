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
  async getAllProject(req, res, next) {
    try {
      const owner = req.user._id
      const projects = await ProjectModel.find({ owner },
        {
          image: 0,
          private: 0,
          __v: 0,
          createdAt: 0,
          updatedAt: 0
        })
      return res.status(200).json({
        status: 200,
        success: true,
        projects
      })
    } catch (error) {
      next(error)
    }
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