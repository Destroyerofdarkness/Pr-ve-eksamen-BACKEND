const { Schema, model } = require("mongoose");


const categorySchema = new Schema({
    name:{
        unique:true,
        type:String,
        required:true,
    }
})

categorySchema.statics.new = async(info)=>{
    const newCategory = new Category({
        name:info.name
    })
    await newCategory.save();
    return;
}


const Category = model("categories", categorySchema);

module.exports = Category