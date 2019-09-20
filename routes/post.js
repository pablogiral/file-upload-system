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

router.post('/postcreate', upload.single('photo'), (req, res, next) => {
  const { content, picName } = req.body;
  const { originalname, url } = req.file;
  
  const newPost = new Post({
    content,
    creatorId: req.user._id,
    picName: picName,
    picPath: url,
  });
  newPost.save()
    .then(() => res.redirect('/auth/privateprofile'))
    .catch(error => next(error));
});

router.get('/postcreate', (req, res, next) => {
  Post.find()
  .populate('creatorId')
  .then((posts) => {
    console.log(posts)
    res.json(posts);
  })
});




module.exports = router;