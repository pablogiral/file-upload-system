module.exports.checkActive = (req, res, next) => {
  if (req.isAuthenticated() && req.user.active) {
    next();
  } else if (req.isAuthenticated()) {
    res.redirect('/auth/checkmail');
  } else {
    res.redirect('/auth/login')
  }
};
