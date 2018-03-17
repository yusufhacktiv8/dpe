const models = require('../models');
const CashFlowBatchCreate = require('../helpers/batch_create/cash_flow');

const sendError = (err, res) => {
  res.status(500).send(`Error while doing operation: ${err.name}, ${err.message}`);
};

exports.findAndCountAll = function findAndCountAll(req, res) {
  const searchText = req.query.searchText ? `%${req.query.searchText}%` : '%%';
  const limit = req.query.pageSize ? parseInt(req.query.pageSize, 10) : 10;
  const currentPage = req.query.currentPage ? parseInt(req.query.currentPage, 10) : 1;
  const offset = (currentPage - 1) * limit;
  models.CashFlowItem.findAndCountAll({
    where: {},
    order: [[models.CashFlow, 'typeCode'], 'month', [models.CashFlow, 'year']],
    include: [
      {
        model: models.CashFlow,
        where: {},
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

  models.CashFlowItem.findAll({
    where: { month },
    order: [[models.CashFlow, 'typeCode'], 'month', [models.CashFlow, 'year']],
    include: [
      {
        model: models.CashFlow,
        where: { year },
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
  CashFlowBatchCreate.process(req.body)
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    res.json(err);
  });
};
