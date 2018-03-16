const models = require('../models');
const ProjectProgressBatchCreate = require('../helpers/batch_create/project_progress');

const sendError = (err, res) => {
  res.status(500).send(`Error while doing operation: ${err.name}, ${err.message}`);
};

exports.findAll = function findAll(req, res) {
  const searchText = req.query.searchText ? `%${req.query.searchText}%` : '%%';
  const limit = req.query.pageSize ? parseInt(req.query.pageSize, 10) : 10;
  const currentPage = req.query.currentPage ? parseInt(req.query.currentPage, 10) : 1;
  const offset = (currentPage - 1) * limit;
  models.ProjectProgress.findAndCountAll({
    where: {},
    order: [[models.Project, 'code'], 'month'],
    include: [
      {
        model: models.Project,
        where: {
          $or: [
            { code: { $ilike: searchText } },
            { name: { $ilike: searchText } },
          ],
        },
      },
    ],
    limit,
    offset,
  })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.batchCreate = (req, res) => {
  ProjectProgressBatchCreate.process(req.body)
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    res.json(err);
  });
};
