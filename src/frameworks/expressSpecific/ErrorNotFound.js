const { Response, ResponseError } = require("../common/Response");

module.exports = (err, req, res) => {
  const error = new ResponseError({
    status: 404,
    msg: "not found",
    reason: "not_found",
    url: req.originalUrl,
    ip: req.ip,
  });
  req.status(err.status);
  res.json(new Response({ status: false, error }));
};
