const models = require('../models');

const sendError = (err, res) => {
  res.status(500).send(`Error while doing operation: ${err.name}, ${err.message}`);
};

exports.findAll = function findAll(req, res) {
  models.ProjectType.findAll({})
  .then((projectTypes) => {
    res.json(projectTypes);
  })
  .catch((err) => {
    sendError(err, res);
  });
};
