const Resource=require("../models/Resource.js");
const Notification=require("../models/Notification.js");
const aktuSubjects=require("../utils/aktuSubjects.js");
const { cloudinary } = require("../cloudinary.js");
const {getIo,getOnlineUsers}=require("../socket.js");

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
    // decode so the view gets the human-readable subject name
    subject = decodeURIComponent(subject);
    res.render("chooseUnit.ejs",{type,subject});
}

module.exports.viewResourcePage=async(req,res)=>{
    let{type,subject,unit}=req.params;

    // Always decode subject from URL so DB queries and view variables are consistent
    const decodedSubject=decodeURIComponent(subject);

    const key=constructKey(req);
    const data = await client.get(key);
    console.log(key);

    if(data){
        console.log("cache hit");
        const resources=JSON.parse(data);
        // Bug fix: must pass type/decodedSubject/unit even on cache hit
        // so the notify button can render correctly
        return res.render("viewResources.ejs",{resources,type,subject:decodedSubject,unit});
    }

    let resources=await Resource.find({
        type:type,
        unit:Number(unit),
        subject:decodedSubject,
    }).sort({views:-1}).populate("owner","username");

    if(resources.length===0){
        // No resources — render with params so notify button works
        return res.render("viewResources.ejs",{resources,type,subject:decodedSubject,unit});
    }

    console.log("cache miss");

    await client.set(key,JSON.stringify(resources),{
      EX:1000,
      NX:true,
    });

    return res.render("viewResources.ejs",{resources,type,subject:decodedSubject,unit});
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
    if (!req.file) {
        req.flash("error", "Please upload a PDF file");
        return res.redirect("/home/new");
    }

    const newResource = new Resource(req.body);
    newResource.owner = req.userId;
    newResource.file = req.file.path;
    newResource.cloudinaryId = req.file.filename;

    await newResource.save();
    await client.flushDb();

    // --- Notify subscribers ---
    const pendingNotifications=await Notification.find({
        type:newResource.type,
        subject:newResource.subject,
        unit:newResource.unit,
        notified:false,
    });

    if(pendingNotifications.length>0){
        const io=getIo();
        const onlineUsers=getOnlineUsers();

        for(const notif of pendingNotifications){
            const userId=notif.user.toString();
            const socketId=onlineUsers.get(userId);

            if(socketId){
                io.to(socketId).emit("resourceUploaded",{
                    message:`A new ${newResource.type} for ${newResource.subject} Unit ${newResource.unit} has been uploaded!`,
                    type:newResource.type,
                    subject:newResource.subject,
                    unit:newResource.unit,
                });
            }

            notif.notified=true;
            await notif.save();
        }
    }
    // --- End notify ---

    req.flash("success", "Resource uploaded successfully!");
    res.redirect("/");
}

module.exports.deleteResource=async(req,res)=>{
    let {id}=req.params;
    const resource = await Resource.findById(id);
    if (resource && resource.cloudinaryId) {
        await cloudinary.uploader.destroy(resource.cloudinaryId, { resource_type: "raw" });
    }
    await Resource.findByIdAndDelete(id);
    await client.flushDb();
    res.redirect("/");
}

// Subscribe to get notified when a resource matching type+subject+unit is uploaded
module.exports.subscribeNotification=async(req,res)=>{
    const {type,unit}=req.params;

    // Bug fix: decode subject from URL params — it arrives encoded from the form action
    const subject=decodeURIComponent(req.params.subject);

    const {year,branch}=req.body;

    // Prevent duplicate subscriptions for same user + resource combo
    const existing=await Notification.findOne({
        type,
        subject,
        unit:Number(unit),
        user:req.userId,
        notified:false,
    });

    if(existing){
        req.flash("error","You are already subscribed for this resource");
        return res.redirect("back");
    }

    const newNotification=new Notification({
        type,
        subject,
        unit:Number(unit),
        year:Number(year)||1,
        branch:branch||"CSE",
        user:req.userId,
    });

    await newNotification.save();
    req.flash("success","You will be notified when this resource is uploaded!");
    res.redirect("back");
}
