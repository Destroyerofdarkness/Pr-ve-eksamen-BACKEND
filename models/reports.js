const { Schema, model } = require("mongoose");

const reportSchema = new Schema({
    title:{
        unique:true,
        type:String,
        required:[true, "Tittelen må blis skrevet inn!!"]
    },
    description:{
        type:String,
        required:[true, "Beskrivelsen må blis skrevet inn!!"],
        minLength:[100, "Beskrivelsen til avviket er for kort!!"]
    },
    status:{
        type:String,
        default:"Aktiv"
    }
})

reportSchema.statics.publish = async(info)=>{
    const newReport = new Report({
        title:info.title,
        description:info.description
    })
    await newReport.save();
}

const Report = model("reports", reportSchema);

module.exports = Report