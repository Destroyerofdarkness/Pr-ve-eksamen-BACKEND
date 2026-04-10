const { Schema, model } = require("mongoose");
const argon2 = require("argon2");

const userSchema = new Schema({
    name:{
        unique:true,
        type:String,
        required:[true, "Username must be provided!!"]
    },
    passwd:{
        type:String,
        required: [true,"Password must be provided!!"],
        minLength: [6, "Password must be minimum 6 characters!!"]
    }
})

userSchema.pre("save", async function(){
try {
    this.passwd = await argon2.hash(this.passwd);
} catch (err) {
    console.log("Error when saving User cause: ",err)
}
})

userSchema.statics.signUp = async(info)=>{
    if(info.passwd === info.conPass){
        const newUser = new User({
            name: info.name,
            passwd: info.passwd
        })
       const savedUser = await newUser.save();
       return savedUser._id;
    }else{
        throw Error("Provided passwords doesn't match!!")
    }
}

userSchema.statics.signIn = async(info)=>{
    const user = await User.findOne({name:info.name})
    if(user){
    if(await argon2.verify(user.passwd, info.passwd)){
        return user._id;
    }else{
        throw Error("Provided password is not right!!")
    }
    }else{
        throw Error("Provided user not Found!!");
    }
}

const User = model("Users", userSchema);

module.exports = User