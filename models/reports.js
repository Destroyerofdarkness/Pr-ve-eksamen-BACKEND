const { Schema, model } = require("mongoose");

const reportSchema = new Schema({
    title:{
        unique:true,
        type:String,
        required:[true, "Tittelen må bli skrevet inn!!"]
    },
    description:{
        type:String,
        required:[true, "Beskrivelsen må bli skrevet inn!!"],
        minLength:[100, "Beskrivelsen til avviket er for kort!!"]
    },
    status:{
        type:String,
        default:"Aktiv"
    },
    category:{
        type:String,
        required:[true, "Kategori må velges!!"]
    }
})

reportSchema.statics.publish = async(info)=>{
    const newReport = new Report({
        title:info.title,
        description:info.description,
        category:info.category
    })
    await newReport.save();
}

reportSchema.statics.update = async(info)=>{
    console.log("UPDATE INFO:", info)
    await Report.findByIdAndUpdate(info.id,{
        status:info.status
    });
    return;
}

const Report = model("reports", reportSchema);

module.exports = Report