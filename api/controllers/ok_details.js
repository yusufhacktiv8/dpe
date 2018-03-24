const sequelize = require('sequelize');
const models = require('../models');

const sendError = (err, res) => {
  res.status(500).send(`Error while doing operation: ${err.name}, ${err.message}`);
};

const getLatesRealizationMonth = (year) => {
  return new Promise((resolve, reject) => {
    models.ProjectProgress.findAll({
      where: { year, realisasiOk: { $gt: 0 } },
      attributes: [
        'month',
        [sequelize.fn('sum', sequelize.col('realisasiOk')), 'sum_realisasi_ok'],
      ],
      group: ['month'],
    })
    .then((rows) => {
      if (rows.length > 0) {
        let maxMonth = 1;
        for (let i = 0; i < rows.length; i += 1) {
          const projectProgressSum = rows[i].dataValues;
          if (projectProgressSum.sum_realisasi_ok > 0 && projectProgressSum.month >= maxMonth) {
            maxMonth = projectProgressSum.month;
          }
        }
        resolve(maxMonth);
      } else {
        resolve(1);
      }
    })
    .catch((err) => {
      console.error(err);
      reject(err);
    });
  });
};

const findProjectProgresses = (year, month) => {
  return new Promise((resolve, reject) => {
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
      resolve(result.map((obj) => {
        return {
          projectCode: obj.Project.code,
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
      reject(err);
    });
  });
};

exports.getData = function findAll(req, res) {
  const year = req.params.year;
  const month = req.params.month;

  const tempResultMap = {};
  const result = [];

  getLatesRealizationMonth(year)
  .then((latestRealizationMonth) => {
    findProjectProgresses(year, month)
    .then((projectProgresses) => {
      for (let i = 0; i < projectProgresses.length; i += 1) {
        const projectProgress = projectProgresses[i];
        if (!(projectProgress.projectCode in tempResultMap)) {
          tempResultMap[projectProgress.projectCode] = {
            projectcode: projectProgress.projectcode,
            projectName: projectProgress.projectName,
            projectType: projectProgress.projectType,
            prognosaLk: projectProgress.prognosaLk,
            prognosaOk: projectProgress.prognosaOk,
            prognosaOp: projectProgress.prognosaOp,
            realisasiLk: projectProgress.realisasiLk,
            realisasiOk: projectProgress.realisasiOk,
            realisasiOp: projectProgress.realisasiOp,
            rkapLk: projectProgress.rkapLk,
            rkapOk: projectProgress.rkapOk,
            rkapOp: projectProgress.rkapOp,
          };
        } else {
          if (projectProgress.month > latestRealizationMonth) {
            tempResultMap[projectProgress.projectCode].prognosaLk = tempResultMap[projectProgress.projectCode].prognosaLk + projectProgress.prognosaLk;
            tempResultMap[projectProgress.projectCode].prognosaOk = tempResultMap[projectProgress.projectCode].prognosaOk + projectProgress.prognosaOk;
            tempResultMap[projectProgress.projectCode].prognosaOp = tempResultMap[projectProgress.projectCode].prognosaOp + projectProgress.prognosaOp;
          } else {
            tempResultMap[projectProgress.projectCode].prognosaLk = tempResultMap[projectProgress.projectCode].prognosaLk + projectProgress.realisasiLk;
            tempResultMap[projectProgress.projectCode].prognosaOk = tempResultMap[projectProgress.projectCode].prognosaOk + projectProgress.realisasiOk;
            tempResultMap[projectProgress.projectCode].prognosaOp = tempResultMap[projectProgress.projectCode].prognosaOp + projectProgress.realisasiOp;
          }
          tempResultMap[projectProgress.projectCode].realisasiLk = tempResultMap[projectProgress.projectCode].realisasiLk + projectProgress.realisasiLk;
          tempResultMap[projectProgress.projectCode].realisasiOk = tempResultMap[projectProgress.projectCode].realisasiOk + projectProgress.realisasiOk;
          tempResultMap[projectProgress.projectCode].realisasiOp = tempResultMap[projectProgress.projectCode].realisasiOp + projectProgress.realisasiOp;

          tempResultMap[projectProgress.projectCode].rkapLk = tempResultMap[projectProgress.projectCode].rkapLk + projectProgress.rkapLk;
          tempResultMap[projectProgress.projectCode].rkapOk = tempResultMap[projectProgress.projectCode].rkapOk + projectProgress.rkapOk;
          tempResultMap[projectProgress.projectCode].rkapOp = tempResultMap[projectProgress.projectCode].rkapOp + projectProgress.rkapOp;
        }
      }
      Object.keys(tempResultMap).forEach((key) => {
        result.push(tempResultMap[key]);
      });
      res.json(result);
    })
    .catch((err) => {
      sendError(err, res);
    });
  });
};
