//mongo connection
const mongoose=require("mongoose");

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/revision');
}
main()
.then(()=>{
    console.log("MongoDB connected successfully");
})
.catch((err)=>{
    console.log("DB not connected ");
})

//obtaining models
const Resource=require("../models/Resource.js");

//obtain seed data
const seedData=require("./seed.js");


const initData=async ()=>{

    await Resource.deleteMany({});
    
    await Resource.insertMany(seedData);
}
initData()
.then(()=>{
    console.log("Data inserted successfully");
})

.catch((err)=>{
    console.log("Data not inserted",err);
})