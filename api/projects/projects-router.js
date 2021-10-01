// Write your "projects" router here!
const express = require("express");
const router = express.Router();
const Projects = require("./projects-model");
const {
  validateProjectId,
  validateProjectBody,
} = require("./projects-middleware");

router.get("/", async (req, res) => {
  try {
    const projects = await Projects.get();
    if (!projects) {
        res.send([])
    } else {
      res.json(projects);
    }
  } catch (err) {
    res.json(err);
  }
});

router.get("/:id", validateProjectId, async (req, res, next) => {
  try {
    res.json(req.project);
  } catch (err) {
    next(err);
  }
});

router.post("/", validateProjectBody, async (req, res, next) => {
  try {
    const project = await Projects.insert(req.body);
    res.json(project);
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:id",
  validateProjectId,
  validateProjectBody,
  async (req, res, next) => {
    try {
      console.log("herer");
      const project = await Projects.update(req.params.id, req.body);
      res.json(project);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", validateProjectId, async (req, res, next) => {
  const deleted = await Projects.remove(req.params.id);
  res.send();
});

router.get("/:id/actions", validateProjectId, async (req, res, next) => {
  const actions = await Projects.getProjectActions(req.params.id);
  res.json(actions);
});

module.exports = router;
