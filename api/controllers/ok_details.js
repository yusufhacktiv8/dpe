const models = require('../models');

const sendError = (err, res) => {
  res.status(500).send(`Error while doing operation: ${err.name}, ${err.message}`);
};

exports.getData = function findAll(req, res) {
  const year = req.params.year;
  const month = req.params.month;

  models.ProjectProgress.findAll({
    where: { year, month },
    order: [[models.Project, 'code'], 'month', 'year'],
    include: [
      {
        model: models.Project,
      },
    ],
  })
  .then((result) => {
    res.json(result.map((obj) => {
      return {
        projectName: obj.Project.name,
        projectType: obj.Project.ProjectTypeId,
        prognosaLk: obj.prognosaLk,
        prognosaOk: obj.prognosaOk,
        prognosaOp: obj.prognosaOp,
        realisasiLk: obj.realisasiLk,
        realisasiOk: obj.realisasiOk,
        realisasiOp: obj.realisasiOp,
        rkapLk: obj.rkapLk,
        rkapOk: obj.rkapOk,
        rkapOp: obj.rkapOp,
      };
    }));
  })
  .catch((err) => {
    sendError(err, res);
  });
};
