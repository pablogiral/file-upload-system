const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      // unique: true,
      required: true
    },
    imgName: {
      type: String,
      default: "User"
    },
    imgPath: {
      type: String,
      default:
        "http://www.jdevoto.cl/web/wp-content/uploads/2018/04/default-user-img.jpg"
    },
    token: {
      type: String,
      unique: true
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
