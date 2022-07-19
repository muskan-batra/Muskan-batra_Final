const userModel = require("../models/userModels");
const jwt = require("jsonwebtoken");
const isAuthenticatedWithToken = (req, res, next) => {
  const headersArray = req.headers.authorization.split(" ");
  console.log("headers", headersArray[1]);
  jwt.verify(headersArray[1], process.env.SECRET_KEY, function (err, decoded) {
    if (!err) next();
    else res.send(JSON.stringify({ status: 400, message: "invalid token" }));
  });
};
module.exports = { isAuthenticatedWithToken };
