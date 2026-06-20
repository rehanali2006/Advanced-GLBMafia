const express=require("express");
const router=express.Router({mergeParams:true});

const {
    renderUnitPage,
    viewResourcePage,
    viewPage,
    deleteResource
}=require("../controllers/resource.js");

const wrapAsync=require("../utils/wrapAsync.js");

const {
    isAuthenticated,
    isOwner
}=require("../middleware.js");

router.get("/view/:id",wrapAsync(viewPage));

router.get("/:type/:subject",renderUnitPage);

router.get(
    "/:type/:subject/:unit",
    wrapAsync(viewResourcePage)
);

router.delete(
    "/delete/:id",
    isAuthenticated,
    isOwner,
    wrapAsync(deleteResource)
);

module.exports=router;