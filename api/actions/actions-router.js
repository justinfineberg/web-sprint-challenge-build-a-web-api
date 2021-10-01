// Write your "actions" router here!
const express = require("express");
const router = express.Router();
const Actions = require("./actions-model");
const {
  validateActionsId,
  validateActionBody,
} = require("./actions-middlware");

router.get("/", async (req, res) => {
  try {
    const actions = await Actions.get();
    if (!actions) {
      res.send([]);
    } else {
      res.json(actions);
    }
  } catch (err) {
    res.json(err);
  }
});

router.get("/:id", validateActionsId, async (req, res, next) => {
  try {
    res.json(req.action);
  } catch (errr) {
    next(err);
  }
});

router.post("/", validateActionBody, async (req, res, next) => {
  try {
    const action = await Actions.insert(req.body);
    res.json(action);
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:id",
  validateActionsId,
  validateActionBody,
  async (req, res, next) => {
    try {
      const action = await Actions.update(req.params.id, req.body);
      res.json(action);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", validateActionsId, async (req, res, next) => {
  const deleted = await Actions.remove(req.params.id);
  res.send();
});

module.exports = router;
