//express
const express=require("express");
const app=express();
const port =8000;
require("dotenv").config();
const ExpressError=require("./utils/ExpressError.js");
const cookieParser = require("cookie-parser");
const flash=require("connect-flash");
const {loadUser}=require("./middleware.js");
const User=require("./models/user");
const session=require("express-session");


//router
const homeRoute = require("./routes/homeRoute.js");
const resourceRoute = require("./routes/resourceRoute.js");
const authRoute = require("./routes/authRoute.js");


const rateLimit=require("express-rate-limit");
const limit=rateLimit({
    max:1000,
    windowMs:60*60*1000,
    message:"Too many request from this IP,Try after one hour",
})
app.use(limit);
app.use(cookieParser());


//serving static files
const path =require("path");
app.use(express.static(path.join(__dirname,"public")));

//allow server to listen to requests like post
app.use(express.urlencoded({extended:true}));


//ejs
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);

//schema or models



//method override
const methodOverride=require("method-override");
app.use(methodOverride("_method"));



//db
const mongoose=require("mongoose");
async function main(){
    await mongoose.connect(process.env.MONGO_URL);
}
main()
.then(()=>{
    console.log("MongoDB connected successfully");
})
.catch((err)=>{
    console.log("DB not connected ");
})


const mongoUrl=process.env.MONGO_URL;
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "mysupersecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
};

app.use(session(sessionOptions));

app.use(flash());
app.use(loadUser);

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    next();
})


//home page
app.get("/",(req,res)=>{
    res.redirect("/home");
})


app.use("/home",homeRoute);
app.use("/resource",resourceRoute)
app.use("/auth",authRoute);


app.use((req,res,next)=>{
    next(new ExpressError(404,"Page Not Found"));
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).send(message);
});


app.listen(8000,()=>{
    console.log("app listening to port 8000");
})