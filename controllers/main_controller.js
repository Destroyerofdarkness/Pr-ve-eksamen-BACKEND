const Key = require("../models/Key")

const load_Basic_msg = async(req,res)=>{
    try {
        
        res.status(200).json({message: "Succesfully loaded basic message!!"})
    } catch (err) {
        res.status(500).json({err, message: "Unable to load in basic message!"})
    }
}

module.exports = {load_Basic_msg}