const { Schema, model } = require("mongoose");
const crypto = require("crypto");

const userSchema = new Schema({
    code:{
        unique:true,
        type:String,
        required:[true, "Code must be provided!!"]
    },
    role:{
        type:String,
        default: "Ansatt"
    }
})

userSchema.pre("save", async function(){
try {
    this.code = await crypto.createHash("sha256").update(this.code).digest('hex');
    console.log("Hashed Code: ", this.code)
} catch (err) {
    console.log("Error when saving User cause: ",err)
}
})

userSchema.statics.signUp = async(info)=>{
        const newUser = new User({
            code: info.code,
        })
        
       const savedUser = await newUser.save();
       return savedUser._id;
    
}

userSchema.statics.signIn = async(info)=>{
    const hashedCode = await crypto.createHash("sha256").update(info.code).digest('hex');
    const user = await User.findOne({code:hashedCode});
    console.log("Code: ", user)
    if(user){
        return user._id
    }else{
        throw Error("Koden er feil..");
    }
}

const User = model("kodene", userSchema);

module.exports = User