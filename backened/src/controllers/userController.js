const userModel = require("../models/userModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const login = (req, res, next) => {
  console.log("body", req.body);
  userModel
    .findOne({ email: req.body.email })
    .then((onFound) => {
      if (onFound) {
        bcrypt
          .compare(req.body.password, onFound.password)
          .then((ifMatched) => {
            if (ifMatched) {
              console.log(ifMatched);
              // generate jwt token
              let token = jwt.sign(
                { username: onFound._id },
                process.env.SECRET_KEY
              );
              // set the user id to session
              // req.session.uuid = onFound._id;
              // console.log("sessions ", req.session);
              res.send(
                JSON.stringify({ status: "200", data: onFound, token: token })
              );
            } else {
              res.send(
                JSON.stringify({ status: "400", data: "Incorrect password" })
              );
            }
          })
          .catch((ifNotMatched) => {
            res.send(JSON.stringify({ status: "400", data: null }));
            console.log("error " + ifNotMatched);
          });
      }
    })
    .catch((onError) => {
      console.log("onError ", onError);
      res.send(JSON.stringify({ status: "400", data: null }));
    });
};

const register = (req, res, next) => {
  const newUser = new userModel({ ...req.body });
  newUser
    .save()
    .then((onSave) => {
      console.log("saved ", onSave);
    })
    .catch((onError) => {
      console.log("onError " + onError);
    });
  res.send(JSON.stringify({ data: "allOK" }));
};
module.exports = { login, register };
