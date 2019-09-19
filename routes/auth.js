const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const upload = require("../configs/cloudinary.config");
const transporter = require("../configs/nodemailer.config");
// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const randToken = require("rand-token");
const check=require("../middlewares/active-mid")

router.get("/login", (req, res, next) => {
  res.render("auth/login", { message: req.flash("error") });
});

router.get("/checkmail", (req, res, next) => {
  res.render("auth/checkmail", { message: req.flash("error") });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/auth/privateprofile",
    failureRedirect: "/auth/login",
    failureFlash: true,
    passReqToCallback: true
  })
);
router.get("/privateprofile",check.checkActive ,(req, res, next) => {
  const user=req.user;
  res.render("auth/privateProfile",{user});
});
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", upload.single("photo"), (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  
  
  
  // const { originalname, url } = req.file;
  if (username === "" || password === "" || email === "") {
    res.render("auth/signup", { message: "Indicate all fields" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }
    
    // User.findOne({ email }, "email", (err, user) => {
    //   if (user !== null) {
    //     res.render("auth/signup", { message: "The email already exists" });
    //     return;
    //   }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    const token = randToken.generate(25);
    const newUser = new User({
      username,
      password: hashPass,
      email,
      token
    });
    
    newUser
      .save()
      .then(() => {
        transporter.sendMail({
          from: `'Equipo A' <${process.env.GMAIL_USER}>`,
          to: email,
          subject: `Welcome ${username}` ,
          html: `<a href="http://localhost:3000/auth/confirm/${newUser.token}">Confirmate please 🗣</a>`
        })
        .then(() => {
          res.redirect("/");
        })
        
      })
      .catch(err => {
        res.render("auth/signup", { message: "Something went wrong" });
      });
  });
});
// });


router.get("/confirm/:token", (req, res) => {
  User.findOneAndUpdate({token:req.params.token},{$set:{active: true}},{new: true})
  .then((user)=>{
    res.render("auth/activationSuccess",{user})
  }).catch(()=>{  
    console.log("Error de activacion")
  })
})



router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
