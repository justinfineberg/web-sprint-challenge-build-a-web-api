// add middlewares here related to actions
const Actions = require('./actions-model')

async function validateActionsId(req, res, next){
    try {
        const action = await Actions.get(req.params.id)
        if (!action){
            res.status(404).json({message: "action not found"})
        } else {
            req.action = action 
            next()
        }
    } catch (err){
        next(err)
    }
}

async function validateActionBody (req, res, next){
    try {
        if (!req.body.notes || !req.body.description || !req.body.project_id){
            res.status(400).json({message: "missing info"})
        } else {
            next()
        }
    } catch (err){
        next(err)
    }
}

module.exports = {
    validateActionsId,
    validateActionBody
}