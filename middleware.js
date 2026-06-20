const {resourceSchema,loginSchema,signupSchema}=require("./schemaValidation.js");
const jwt = require("jsonwebtoken");
const Resource = require("./models/Resource");
const User = require("./models/user");

module.exports.validateResource=(req,res,next)=>{
    const {error}=resourceSchema.validate(req.body);

    if(error){
        console.log(error);
        req.flash("error","The resource you provided is not valid");
        return res.redirect("/home/new");
    }

    next();
}

module.exports.isAuthenticated = (req,res,next) => {
    const token = req.cookies?.token;

    if(!token){
        req.flash("error","You must be logged in");
        return res.redirect("/auth/login");
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.userId = decoded.id;
        req.userRole = decoded.role;

        next();
    } catch(err){
        res.clearCookie("token");

        console.log(err.message);

        req.flash("error","Wrong credentials, Try again!");
        return res.redirect("/auth/login");
    }
};

module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;

    const resource = await Resource.findById(id);

    if(!resource){
        req.flash("error","Resource not found");
        return res.redirect("/");
    }

    if(resource.owner.toString() !== req.userId){
        req.flash("error","You are not the owner");
        return res.redirect("/");
    }

    next();
};

module.exports.validateLogin = (req, res, next) => {
    const {error}=loginSchema.validate(req.body);

    if(error){
        req.flash("error","Login failed, Try again");
        return res.redirect("/auth/login");
    }
    next();
};

module.exports.validateSignUp=(req,res,next)=>{
    const {error}=signupSchema.validate(req.body);

    if(error){
        req.flash("error","Incorrect credentials, Try again");
        return res.redirect("/auth/signup");
    }

    next();
}

module.exports.loadUser = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            res.locals.currentUser = null;
            return next();
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(decoded.id).select("-password");

        req.userId = decoded.id;
        req.userRole = decoded.role;
        req.user = user;

        res.locals.currentUser = user || null;
    } catch(err) {
        res.locals.currentUser = null;
    }

    next();
};