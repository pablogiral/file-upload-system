const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const upload = require("../configs/cloudinary.config");
const check=require("../middlewares/active-mid")
const Post = require("../models/Post");

router.get("/postcreate",check.checkActive ,(req, res, next) => {
  const user=req.user;
  res.render("posts/postcreate",{user});
});

router.post('/add', upload.single('photo'), (req, res, next) => {
  const { content, pickName } = req.body;
  const { originalname, url } = req.file;
  const newMovie = new Movie({
    title,
    description,
    imgName: pickName,
    imgPath: url,
  });
  newMovie.save()
    .then(() => res.redirect('/'))
    .catch(error => next(error));
});



module.exports = router;