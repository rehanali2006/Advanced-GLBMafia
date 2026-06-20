const express=require("express");
const router=express.Router({mergeParams:true});

const {renderLoginPage,renderSignUpPage,login,signup,logout}=require("../controllers/user.js");
const {validateLogin,validateSignUp}=require("../middleware.js");

router.route("/login")
            .get(renderLoginPage)
            .post(validateLogin,login);

router.route("/signup")         
            .get(renderSignUpPage)
            .post(validateSignUp,signup);

router.get("/logout",logout);

module.exports=router;