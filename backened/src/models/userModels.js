const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});
userSchema.pre("save", function (next) {
  bcrypt.hash(this.password, 5, (err, hash) => {
    if (!err) {
      this.password = hash;
      next();
    } else console.log(err);
  });
});
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
