// add middlewares here related to projects
const Projects = require('./projects-model')

async function validateProjectId(req, res, next) {
    try{
      const project = await Projects.get(req.params.id)
      if (!project){
        res.status(404).json({ message: "project not found" })
      } else {
        req.project = project
        next()
      }
    } catch (err){
      next(err)
    }
  }

  async function validateProjectBody(req, res, next){
      try{
        if (!req.body.name || !req.body.description || !req.body.hasOwnProperty('completed')){
            res.status(400).json({message: "missing stuff"})
        } else {
            next()
        }
      } catch (err){
          next(err)
      }
  }

  module.exports = {
      validateProjectId,
      validateProjectBody
  }