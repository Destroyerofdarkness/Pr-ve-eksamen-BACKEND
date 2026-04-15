const Category = require("../models/Category")

const post_category = async(req,res)=>{
    try {
        await Category.new(req.body);
        res.status(201).json({ success: true, message: "Succesfully made a new category!!"})
    } catch (err) {
        console.log(err);
        res.status(400).json({err, success: false, message: "Unable to make new category because of errors!!"})
    }
}

const get_categories = async(req,res)=>{
    try {
        const allCategories = await Category.find();
        res.status(200).json({allCategories, success:true, message: "Succesfully got all the categories"})
    } catch (err) {
        console.log(err);
        res.status(500).json({err, success:false, message: "Unable to get the categories!!"})
    }
}


module.exports = {post_category, get_categories}