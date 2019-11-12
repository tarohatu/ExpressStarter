const authHandler = (...roles) => (req, res, next) => {
  const { loggedIn } = req.session;
  if (loggedIn) {
    if (roles.length === 0) next();
    if (roles.includes(loggedIn.role)) {
      next();
    } else {
      res.status(403).send();
    }
  } else {
    res.status(401).send();
  }
};

module.exports = authHandler;
