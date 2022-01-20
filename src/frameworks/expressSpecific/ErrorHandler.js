const { Response, ResponseError } = require("../common/Response");

module.exports = (err, req, res) => {
  const error = new ResponseError({
    status: err.status || 500,
    msg: err.msg || err.message || "",
    reason: err.reason,
    url: req.originalUrl,
    ip: req.ip,
  });
  req.status(err.status);
  res.json(new Response({ status: false, error }));
};