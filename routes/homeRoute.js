const express=require("express");
const router=express.Router({mergeParams:true});

const {
    renderBranchPage,
    renderHomePage,
    renderNewResourcePage,
    renderResourceTypePage,
    renderSubjectPage,
    createNewResource
}=require("../controllers/resource.js");

const {
    isAuthenticated,
    validateResource
}=require("../middleware.js");

const { upload } = require("../cloudinary.js");

const wrapAsync=require("../utils/wrapAsync.js");

router.route("/new")
.get(isAuthenticated,renderNewResourcePage)
.post(
    isAuthenticated,
    upload.single("file"),   // multer processes the file upload before validation
    validateResource,
    wrapAsync(createNewResource)
);

router.get("/",renderHomePage);

router.get("/:year",renderBranchPage);

router.get("/:year/:branch",renderResourceTypePage);

router.get("/:year/:branch/:type",renderSubjectPage);

module.exports=router;
