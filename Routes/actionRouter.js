const express = require("express");
const Action = require("../data/helpers/actionModel");
const router = express.Router();
router.use(express.json());

// GET REQUEST
router.get("/:id", (req, res) => {
  const id = req.params.id;
  !id
    ? res.status(400).json({
        message: "that id does not exist"
      })
    : Action.get(id)
        .then(action => {
          res.status(200).json(action);
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({
            errorMessage: "error fetching actions"
          });
        });
});

router.get("/", (req, res) => {
  id = req.params.id;
  Action.get()
    .then(action => {
      res.status(200).json(action);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "error fetching post"
      });
    });
});

// POST REQUEST
router.post("/:id/actions",validateAction, (req, res) => {
  req.body.project_id = req.params.id;
  const body = req.body;

  Action.insert(body)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(error => {
      console.log(error);
      res.status(200).json({
        errorMessage: "error posting action"
      });
    });
});

// PUT REQUEST
router.put("/:id", validateActionId, (req, res) => {
  const id = req.params.id;
  const body = req.body;
  Action.update(id, body)
    .then(update => {
      res.status(200).json(update);
    })
    .catch(error => {
      console.log(error);
      res.status(200).json({
        errorMessage: "error updating action"
      });
    });
});

// DELETE REQUEST
router.delete("/:id",validateActionId, (req, res) => {
  const id = req.params.id;

  Action.remove(id)
    .then(action => {
      action
        ? res.status(200).json({
            message: "action was terminated"
          })
        : res.status(500).json({
            message: "action not found"
          });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "error deleting action"
      });
    });
});

// middleware

function validateActionId(req, res, next) {
  const id = req.params.id;
  Action.getById(id).then(action => {
    if (action) {
      req.action = action;
      next();
    } else {
      res.status(404).json({
        errorMessage: "invalid action id"
      });
    }
  });
}
function validateAction(req,res,next){
    !req.body ? res.status(400).json({
        message: "missing action data"
    }) : !req.body.description ? res.status(400).json({
        message: "missing action description"
    }) : !req.body.notes ? res.status(400).json({
        message: "missing action notes"
    }) : next()
}

module.exports = router;
