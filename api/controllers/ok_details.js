const sequelize = require('sequelize');
const _ = require('lodash');
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
      where: { year, month: { $lte: month } },
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
          projectType: obj.ProjectTypeId,
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

const rkapData = (year) => {
  return new Promise((resolve, reject) => {
    const result = [];
    const tempResultMap = {};
    findProjectProgresses(year, 12)
    .then((projectProgresses) => {
      for (let i = 0; i < projectProgresses.length; i += 1) {
        const projectProgress = projectProgresses[i];
        if (!(projectProgress.projectCode in tempResultMap)) {
          tempResultMap[projectProgress.projectCode] = {
            projectCode: projectProgress.projectCode,
            projectName: projectProgress.projectName,
            projectType: projectProgress.projectType,
            rkapLk: projectProgress.rkapLk,
            rkapOk: projectProgress.rkapOk,
            rkapOp: projectProgress.rkapOp,
          };
        } else {
          tempResultMap[projectProgress.projectCode].rkapLk += projectProgress.rkapLk;
          tempResultMap[projectProgress.projectCode].rkapOk += projectProgress.rkapOk;
          tempResultMap[projectProgress.projectCode].rkapOp += projectProgress.rkapOp;
        }
      }
      Object.keys(tempResultMap).forEach((key) => {
        result.push(tempResultMap[key]);
      });
      resolve(result);
    })
    .catch((err) => {
      reject(err);
    });
  });
};

const realisasiData = (year, month) => {
  return new Promise((resolve, reject) => {
    const result = [];
    const tempResultMap = {};
    findProjectProgresses(year, month)
    .then((projectProgresses) => {
      for (let i = 0; i < projectProgresses.length; i += 1) {
        const projectProgress = projectProgresses[i];
        if (!(projectProgress.projectCode in tempResultMap)) {
          tempResultMap[projectProgress.projectCode] = {
            projectCode: projectProgress.projectCode,
            realisasiLk: projectProgress.realisasiLk,
            realisasiOk: projectProgress.realisasiOk,
            realisasiOp: projectProgress.realisasiOp,
          };
        } else {
          tempResultMap[projectProgress.projectCode].realisasiLk += projectProgress.realisasiLk;
          tempResultMap[projectProgress.projectCode].realisasiOk += projectProgress.realisasiOk;
          tempResultMap[projectProgress.projectCode].realisasiOp += projectProgress.realisasiOp;
        }
      }
      Object.keys(tempResultMap).forEach((key) => {
        result.push(tempResultMap[key]);
      });
      resolve(result);
    })
    .catch((err) => {
      reject(err);
    });
  });
};

const prognosaData = (year, month, latestRealizationMonth) => {
  return new Promise((resolve, reject) => {
    const result = [];
    const tempResultMap = {};
    findProjectProgresses(year, month)
    .then((projectProgresses) => {
      for (let i = 0; i < projectProgresses.length; i += 1) {
        const projectProgress = projectProgresses[i];
        if (!(projectProgress.projectCode in tempResultMap)) {
          if (projectProgress.month > latestRealizationMonth) {
            tempResultMap[projectProgress.projectCode] = {
              projectCode: projectProgress.projectCode,
              prognosaLk: projectProgress.prognosaLk,
              prognosaOk: projectProgress.prognosaOk,
              prognosaOp: projectProgress.prognosaOp,
            };
          } else {
            tempResultMap[projectProgress.projectCode] = {
              projectCode: projectProgress.projectCode,
              prognosaLk: projectProgress.realisasiLk,
              prognosaOk: projectProgress.realisasiOk,
              prognosaOp: projectProgress.realisasiOp,
            };
          }
        } else {
          if (projectProgress.month > latestRealizationMonth) {
            tempResultMap[projectProgress.projectCode].prognosaLk += projectProgress.prognosaLk;
            tempResultMap[projectProgress.projectCode].prognosaOk += projectProgress.prognosaOk;
            tempResultMap[projectProgress.projectCode].prognosaOp += projectProgress.prognosaOp;
          } else {
            tempResultMap[projectProgress.projectCode].prognosaLk += projectProgress.realisasiLk;
            tempResultMap[projectProgress.projectCode].prognosaOk += projectProgress.realisasiOk;
            tempResultMap[projectProgress.projectCode].prognosaOp += projectProgress.realisasiOp;
          }
        }
      }
      Object.keys(tempResultMap).forEach((key) => {
        result.push(tempResultMap[key]);
      });
      resolve(result);
    })
    .catch((err) => {
      reject(err);
    });
  });
};

exports.getData = function findAll(req, res) {
  const year = req.params.year;
  const month = req.params.month;

  getLatesRealizationMonth(year)
  .then((latestRealizationMonth) => {
    rkapData(year).then((rkapDataResult) => {
      realisasiData(year, month)
      .then((realisasiDataResult) => {
        for (let i = 0; i < realisasiDataResult.length; i += 1) {
          const realisasi = realisasiDataResult[i];
          const rkap = _.find(rkapDataResult, (obj) => {
            return obj.projectCode === realisasi.projectCode;
          });
          rkap.realisasiLk = realisasi.realisasiLk;
          rkap.realisasiOk = realisasi.realisasiOk;
          rkap.realisasiOp = realisasi.realisasiOp;
        }
        prognosaData(year, month, latestRealizationMonth)
        .then((prognosaDataResult) => {
          for (let i = 0; i < prognosaDataResult.length; i += 1) {
            const prognosa = prognosaDataResult[i];
            const rkap = _.find(rkapDataResult, (obj) => {
              return obj.projectCode === prognosa.projectCode;
            });
            rkap.prognosaLk = prognosa.prognosaLk;
            rkap.prognosaOk = prognosa.prognosaOk;
            rkap.prognosaOp = prognosa.prognosaOp;
          }
          res.json(rkapDataResult);
        });
      });
    });
    // console.log('Total RKAP OK: ', result.reduce((total, obj) => {
    //   return total + parseFloat(obj.rkapOk);
    // }, 0));
    //
    // console.log('Total RI OK: ', result.reduce((total, obj) => {
    //   return total + parseFloat(obj.realisasiOk);
    // }, 0));
    //
    // console.log('Total Prognosa OK: ', result.reduce((total, obj) => {
    //   return total + parseFloat(obj.prognosaOk);
    // }, 0));
  });
};
