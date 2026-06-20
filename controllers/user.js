const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
const wrapAsync=require("../utils/wrapAsync.js");

const isProduction = process.env.NODE_ENV === "production";

function setTokenCookie(res, token) {
  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

module.exports.signup = wrapAsync(async (req, res, next) => {
    let { username, email, password } = req.body;
    const user = await User.findOne({ email });
    if(user){
        req.flash("error","User already exists.Please Log in");
        return res.redirect("/auth/login");
    }
    const newUser = new User(req.body);
    await newUser.save();
    const token = jwt.sign(
        {
            id: newUser._id,
            role: newUser.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );
    setTokenCookie(res, token);
    req.flash("success","Account created successfully");
    res.redirect("/");
});

module.exports.login = wrapAsync(async (req, res, next) => {
    let {email, password} = req.body;
    const user = await User.findOne({ email });
    if(!user || !(await user.comparePassword(password))){
        req.flash("error","No such user found");
        return res.redirect("/auth/login");
    }
    const token = jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );
    setTokenCookie(res, token);
    req.flash("success","Welcome back!!");
    res.redirect("/home");
});


module.exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  });
  req.flash("success","Come back again!!");
  res.redirect("/home");
};

module.exports.renderLoginPage=(req,res)=>{
    res.render("./auth/login.ejs");
}

module.exports.renderSignUpPage=(req,res)=>{
    res.render("./auth/signup.ejs");
}



