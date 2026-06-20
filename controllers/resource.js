const Resource=require("../models/Resource");
const aktuSubjects=require("../utils/aktuSubjects.js");
const { cloudinary } = require("../cloudinary.js");

const client=require("../redis.js");



function constructKey(req){
    const baseUrl=req.path.replace(/^\/+|\/+$/g,'').replace(/\//g,':');
    return baseUrl;
}



module.exports.renderHomePage=(req,res)=>{
    res.render("home.ejs");
}

module.exports.renderBranchPage=(req,res)=>{
    let {year}=req.params;
    res.render("chooseBranch.ejs",{year});
}

module.exports.renderResourceTypePage=(req,res)=>{
    let {year,branch}=req.params;
    res.render("chooseResourceType.ejs",{year,branch});
}

module.exports.renderSubjectPage=(req,res)=>{
    let{year,branch,type}=req.params;
    let currentYearSubjects=aktuSubjects[year];
    res.render("chooseSubject.ejs",{year,branch,type,currentYearSubjects});
}

module.exports.renderUnitPage=(req,res)=>{
    let {type,subject}=req.params;
    subject = decodeURIComponent(subject);
    res.render("chooseUnit.ejs",{type,subject});
}

module.exports.viewResourcePage=async(req,res)=>{
    let{type,subject,unit}=req.params;
    const key=constructKey(req);
    const data = await client.get(key);
    console.log(key);
    if(data){
        console.log("cache hit");
        const resources=JSON.parse(data);
        return res.render("viewResources.ejs",{resources});
    }
    let resources=await Resource.find({
        type:type,
        unit:Number(unit),//this is because unit from params is returned as a string
        subject:subject,
    }).sort({views:-1}).populate("owner","username");
    if(resources.length===0){
        req.flash("error","No resource found");
        return res.redirect("/home");
    }
    console.log("cache miss");

    //save the resources to the redis
    await client.set(key,JSON.stringify(resources),{
      EX:1000,
      NX:true,  
    });

return res.render("viewResources.ejs",{resources});
}

module.exports.viewPage=async (req, res) => {
    let { id } = req.params;
    let resource = await Resource.findByIdAndUpdate(id,{$inc:{views:1}},{returnDocument:"after"});
    if(!resource){
    req.flash("error","Some error occured, Try again!!");
    return res.redirect("/home");
}
    res.render("view.ejs",{resource});
}

module.exports.renderNewResourcePage=(req,res)=>{
    res.render("newResource.ejs",{aktuSubjects});
}


module.exports.createNewResource=async(req,res)=>{
    // req.file is set by multer (cloudinary upload)
    if (!req.file) {
        req.flash("error", "Please upload a PDF file");
        return res.redirect("/home/new");
    }

    const newResource = new Resource(req.body);
    newResource.owner = req.userId;
    // Store the Cloudinary secure URL of the uploaded PDF
    newResource.file = req.file.path;
    // Store cloudinary public_id for future deletion
    newResource.cloudinaryId = req.file.filename;

    await newResource.save();
    await client.flushDb();
    req.flash("success", "Resource uploaded successfully!");
    res.redirect("/");
}

module.exports.deleteResource=async(req,res)=>{
    let {id}=req.params;
    const resource = await Resource.findById(id);
    if (resource && resource.cloudinaryId) {
        // Delete the PDF from Cloudinary
        await cloudinary.uploader.destroy(resource.cloudinaryId, { resource_type: "raw" });
    }
    await Resource.findByIdAndDelete(id);
    await client.flushDb();
    res.redirect("/");
}
