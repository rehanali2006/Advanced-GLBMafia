const mongoose=require("mongoose");
const bcrypt=require("bcrypt");

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minLength:6,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }
})

userSchema.pre("save", async function () {
    if(!this.isModified("password")){
        return;
    }
    this.password = await bcrypt.hash(
        this.password,
        12
    );
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};


const User=mongoose.model("User",userSchema);
module.exports=User;


