const AdminPanelError = require('../error/AdminPanelError');
const ApiError = require('../error/ApiError');

function apiErrorHandler(err, req, res, next) {
  // in prod, don't use console.log or console.err because
  // it is not async
  console.error("err::",err);

  if (err instanceof ApiError) {
    res.status(err.code).json(err.message);
    return;
  }
  if (err instanceof AdminPanelError){
    req.flash(err.status, "Details :", err.message);
    return res.redirect(req.header("Referer"));
  }
  res.status(500).json('something went wrong');
}

module.exports = apiErrorHandler;
