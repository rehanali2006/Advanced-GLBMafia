const mongoose=require("mongoose");
const resourceSchema=new mongoose.Schema({
    type:{
        type:String,
        required:true,
        enum:["Notes","Assignment","PYQ","Syllabus","Lab Manual"]
    },
    year:{
        type:Number,
        min:1,
        max:4,
        required:true,
    },
    branch:{
        type:String,
        enum:["CS-AIML","CSE","CS-H","CS-DS","AI-ML","AI-DS","CS-AI","IT","ECE","ME","EEE"]
    },
    section:{
        type:String,
    },
    subject:{
        type:String
    },
    views:{
        type:Number,
        default:0
    },
    unit:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now
    },
    file:{
        type:String,
        required:true,
        // Stores the Cloudinary secure URL of the PDF
    },
    cloudinaryId:{
        type:String,
        // Stores the Cloudinary public_id for deletion
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
});
resourceSchema.index({
    type: 1,
    subject: 1,
    unit: 1,
    views: -1
});

const Resource=mongoose.model("Resource",resourceSchema);
module.exports=Resource;
