const jwt = require('jsonwebtoken');

const isAuthorizedAsAdmin = function(req, res, next) {
  const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : undefined;
  jwt.verify(token, process.env.JWT_ENV, function(err, decoded) {
    if (decoded && decoded.role === 'ADMIN') {
      next();
    } else {
      res.send('Unauthorized', 403);
    }
  });
};

const isAuthenticated = function(req, res, next) {
  const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : undefined;

  jwt.verify(token, process.env.JWT_ENV, function(err, decoded) {
    if (decoded) {
      next();
    } else {
      res.send('Unauthorized', 403);
    }
  });
};

module.exports = {
  isAuthorizedAsAdmin,
  isAuthenticated,
};
