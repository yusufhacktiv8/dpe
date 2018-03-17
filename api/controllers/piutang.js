const models = require('../models');
const UmurPiutangBatchCreate = require('../helpers/batch_create/umur_piutang');

const sendError = (err, res) => {
  res.status(500).send(`Error while doing operation: ${err.name}, ${err.message}`);
};

exports.findAndCountAll = function findAndCountAll(req, res) {
  const searchText = req.query.searchText ? `%${req.query.searchText}%` : '%%';
  const limit = req.query.pageSize ? parseInt(req.query.pageSize, 10) : 10;
  const currentPage = req.query.currentPage ? parseInt(req.query.currentPage, 10) : 1;
  const offset = (currentPage - 1) * limit;
  models.Piutang.findAndCountAll({
    where: {},
    order: [[models.Project, 'code'], 'month', 'year'],
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

exports.findAll = function findAll(req, res) {
  const year = req.params.year;
  const month = req.params.month;
  models.Piutang.findAll({
    where: { year, month },
    order: [[models.Project, 'code'], 'month', 'year'],
    include: [
      {
        model: models.Project,
        where: {},
      },
    ],
  })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.batchCreate = (req, res) => {
  UmurPiutangBatchCreate.process(req.body)
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    res.json(err);
  });
};
