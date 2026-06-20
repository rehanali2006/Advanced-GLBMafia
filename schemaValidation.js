const Resource=require("./models/Resource");
const User =require("./models/user");
const Joi=require("joi");

const resourceSchema=Joi.object({
    type:Joi.string().valid("Notes","Assignment","PYQ","Lab Manual","Syllabus").required(),
    year:Joi.number().min(1).max(4).required(),
    branch:Joi.string().valid("CS-AIML","CSE","AI-DS","AI-ML","CS-H","IT","ECE","CS-AI","CS-DS","ME","EEE").required(),
    section: Joi.string()
    .pattern(/^[A-Z]$/)
    .allow("", null),
    subject:Joi.string().valid("Mathematics I",
            "Mathematics II",
            "Physics",
            "Chemistry",
            "Programming for Problem Solving",
            "Electrical Engineering",
            "Engineering Mechanics",
            "Basic Electronics",
            "Environmental Science",
            "Workshop / Graphics",
            "Data Structures",
            "Computer Organization",
            "Discrete Mathematics",
            "OOPs",
            "Digital Logic",
            "DBMS",
            "Operating Systems",
            "Theory of Computation",
            "Software Engineering",
            "Web Technology",
            "Computer Networks",
            "Compiler Design",
            "Machine Learning",
            "Artificial Intelligence",
            "Data Mining",
            "Cloud Computing",
            "Big Data",
            "Cyber Security",
            "Mobile Computing",
            "Distributed Systems",
            "Blockchain",
            "IoT",
            "Deep Learning",
            "Project Phase 1",
            "Elective I",
            "Project Phase 2",
            "Internship",
            "Elective II",
            "Seminar",
            "Industry Training",
        ).required(),
        views:Joi.number().default(1),
        unit:Joi.number().required(),
        date:Joi.date(),
        // file is handled by multer (multipart upload), not submitted as plain text body
        file:Joi.string().allow("", null).optional(),
        owner: Joi.string().hex().length(24),
})


const loginSchema=Joi.object({
    email:Joi.string().required(),
    password:Joi.string().min(6).required(),
})

const signupSchema=Joi.object({
    username:Joi.string().required(),
    email:Joi.string().required(),
    password:Joi.string().min(6).required(),
    role:Joi.string().valid("user","admin"),
})

module.exports={resourceSchema,loginSchema,signupSchema};
