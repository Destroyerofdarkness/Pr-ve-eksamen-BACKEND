const crypto = require("crypto");
const Key = require("../models/Key");

const authorization = async(req,res,next)=>{
    const key = req.headers.authorization
    try {
        const hash = crypto.createHash("sha256").update(key).digest('hex');
        const foundKey = await Key.find({key:hash});
        console.log(foundKey)
        if(!foundKey.key){
            res.status(401).json({message: "Unauthorized access. API KEY NOT FOUND!"})
        }else{
            next()
        }
    } catch (err) {
        res.status(403).json({err, message: "Forbidden access!!"});
    }
}

module.exports = authorization;