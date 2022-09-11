const autoBind = require("auto-bind")
const { ProjectModel } = require("../../models/project")

class ProjectController {
  constructor() {
    autoBind(this)
  }
  // Function Of FindProject
  async findProject(owner, projectId) {
    const project = await ProjectModel.findOne({ owner, _id: projectId })
    if (!project) throw { status: 404, message: "NotFound Project" }
    return project
  }

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

  // Get All Project Of Owner 
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

  // Scearch Project By ID
  async getProjectById(req, res, next) {
    try {
      const owner = req.user._id
      const projectId = req.params.id
      const project = await this.findProject(owner, projectId)
      res.status(200).json({
        status: 200,
        success: true,
        project
      })
    } catch (error) {
      next(error)
    }
  }

  // Remove Project By ID
  async removeProject(req, res, next) {
    try {
      const owner = req.user._id
      const projectId = req.params.id
      const project = await this.findProject(owner, projectId)
      const deleteresult = await ProjectModel.deleteOne({ _id: project })
      if (deleteresult.deletedCount == 0) throw { status: 400, message: "The project was not deleted" }
      res.status(200).json({
        status: 200,
        success: true,
        message: "The project was deleted"
      })
    } catch (error) {
      next(error)
    }
  }
  getAllProjectOfTeam() {

  }
  getProjectOfUser() {

  }
  updateProject() {

  }

}

module.exports = {
  ProjectController: new ProjectController
}