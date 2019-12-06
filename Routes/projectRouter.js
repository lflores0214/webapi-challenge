const express = require("express");
const Project = require("../data/helpers/projectModel");
const router = express.Router();

router.use(express.json());
// GET REQUESTS

router.get("/", (req, res) => {
  Project.get()
    .then(proj => {
      res.status(200).json(proj);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "error fetching projects"
      });
    });
});
//get project by id
router.get("/:id", validateProjectId, (req, res) => {
  const id = req.params.id;

  Project.get(id)
    .then(proj => {
      res.status(200).json(proj);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "error fetching post"
      });
    });
});

//POST REQUESTS
//post a new project
router.post("/",validateProject, (req, res) => {
  body = req.body;
  Project.insert(body)
    .then(proj => {
      res.status(201).json(proj);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "error posting project"
      });
    });
});

//PUT Requests
//update a project
router.put("/:id", validateProjectId, validateProject, (req, res) => {
  const id = req.params.id;
  const body = req.body;
  Project.update(id, body)
    .then(changes => {
      res.status(200).json(changes);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "error updating project"
      });
    });
});

//DELETE REQUESTS
// delete a project
router.delete("/:id", validateProjectId, (req, res) => {
  id = req.params.id;
  Project.remove(id).then(proj => {
    proj
      ? res.status(200).json({
          message: "project was destroyed"
        })
      : res.status(500).json({
          errorMessage: "error deleting project"
        });
  });
});

// middleware

function validateProjectId(req, res, next) {
  const id = req.params.id;
  Project.getById(id)
    .then(proj => {
      if (proj) {
        req.project = proj;
        next();
      } else {
        res.status(404).json({
          errorMessage: "invalid project id"
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "error fetching project"
      });
    });
}
function validateProject(req, res, next) {
  !req.body
    ? res.status(400).json({
        message: "missing project data"
      })
    : !req.body.name
    ? res.status(400).json({
        message: "missing project name"
      })
    : !req.body.description
    ? res.status(400).json({
        message: "missing project description"
      })
    : next();
}
module.exports = router;
