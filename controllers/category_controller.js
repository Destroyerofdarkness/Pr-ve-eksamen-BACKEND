const Category = require("../models/Category")

const post_category = async(req,res)=>{
    try {
        await Category.new(req.body)
    } catch (err) {
        console.log(err);
        res.status(400).json({err, success: false, message: "Unable to make new category because of errors!!"})
    }
}


module.exports = {post_category}